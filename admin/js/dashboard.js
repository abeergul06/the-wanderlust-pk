// ---------- guard ----------
if (!Auth.getToken()) {
  window.location.href = './login.html';
  throw new Error('Not authenticated'); // stop the rest of the script from running while the redirect is in flight
}
const admin = Auth.getAdmin();
document.getElementById('who').textContent = admin ? (admin.name || admin.email) : '';
document.getElementById('logout-btn').addEventListener('click', () => {
  Auth.clearSession();
  window.location.href = './login.html';
});

// ---------- nav ----------
const views = ['overview', 'destinations', 'feedback', 'contact', 'tours', 'gallery'];
document.querySelectorAll('.nav-item[data-view]').forEach((btn) => {
  btn.addEventListener('click', () => showView(btn.dataset.view));
});

function showView(name) {
  views.forEach((v) => {
    document.getElementById(`view-${v}`).classList.toggle('hidden', v !== name);
  });
  document.querySelectorAll('.nav-item[data-view]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === name);
  });
  loaders[name]?.();
}

// ---------- toast ----------
function toast(message, isError = false) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.toggle('error', isError);
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2600);
}

// ---------- modal ----------
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

function modalHeader(title) {
  return `<div class="modal-header"><h2 id="modal-title">${title}</h2><button type="button" class="modal-close" id="modal-close-btn">&times;</button></div>`;
}

function openModal(html) {
  modalContent.innerHTML = html;
  // Both classes must be toggled together — 'show' alone was never enough
  // because 'hidden' (display:none) stayed applied and kept winning the
  // cascade, so the modal opened in the DOM but stayed invisible.
  overlay.classList.remove('hidden');
  overlay.classList.add('show');
}
function closeModal() {
  overlay.classList.remove('show');
  overlay.classList.add('hidden');
  modalContent.innerHTML = '';
}

// Single delegated handler closes the modal from: clicking the dark backdrop,
// the "x" close button, or any Cancel button — no matter which form is
// currently rendered inside modal-content. This also fixes the package form's
// close/cancel buttons, which previously had no listeners at all.
overlay.addEventListener('click', (e) => {
  if (e.target === overlay || e.target.closest('#modal-close-btn') || e.target.closest('#modal-cancel-btn')) {
    closeModal();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('show')) closeModal();
});

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function fmtDate(d) { return d ? new Date(d).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : '—'; }
function fmtMoney(n) { return n == null ? '—' : `Rs. ${Number(n).toLocaleString()}`; }
function renderTable(headers, rows) {
  return `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
function emptyState(msg) { return `<div class="empty-state">${msg}</div>`; }
function statusBadge(status) { return `<span class="badge badge-${status}">${status}</span>`; }
function activeBadge(isActive) {
  return isActive !== false ? '<span class="badge badge-approved">Active</span>' : '<span class="badge badge-cancelled">Hidden</span>';
}

// ========= TOUR ITINERARY / COST / PAYMENT TEXT HELPERS =========
// Cost, payment and itinerary are now stored as plain free text. Older
// tours saved before this change may still have the old structured
// shapes (cost as a per-city object, payment as {policy, methods[]},
// itinerary as an array of day objects) — these helpers turn either
// shape into readable text so the admin form always shows something
// editable instead of raw JSON or a blank field.
function costToText(cost) {
  if (!cost) return '';
  if (typeof cost === 'string') return cost;
  const labels = { lahore: 'Lahore', islamabad: 'Islamabad', faisalabad: 'Faisalabad', karachi: 'Karachi' };
  const parts = Object.entries(cost)
    .filter(([key, val]) => key !== 'couplePackage' && val != null)
    .map(([key, val]) => `${labels[key] || key}: Rs. ${Number(val).toLocaleString()}`);
  if (cost.couplePackage) parts.push(`Couple package: Rs. ${Number(cost.couplePackage).toLocaleString()}`);
  return parts.join(' | ');
}

function paymentToText(payment) {
  if (!payment) return '';
  if (typeof payment === 'string') return payment;
  const lines = [];
  if (payment.policy) lines.push(payment.policy);
  (payment.methods || []).forEach((m) => lines.push(`${m.label}: ${m.accountName} - ${m.accountNumber}`));
  if (payment.verificationContact) lines.push(`Verification contact: ${payment.verificationContact}`);
  return lines.join('\n');
}

function itineraryToText(itinerary) {
  if (!itinerary) return '';
  if (typeof itinerary === 'string') return itinerary;
  if (Array.isArray(itinerary)) {
    return itinerary
      .map((d, i) => `Day ${i + 1}${d.title ? ` — ${d.title}` : ''}: ${d.description || d.text || ''}`)
      .join('\n\n');
  }
  return '';
}

// ============================================================
// OVERVIEW
// ============================================================
async function loadOverview() {
  try {
    const stats = await apiRequest('/admin/stats');
    document.getElementById('stat-grid').innerHTML = [
      ['Destinations', stats.destinations],
      ['Tours', stats.tours], ['Gallery photos', stats.gallery],
      ['Feedback received', stats.feedback], ['Unread messages', stats.unreadContact],
    ].map(([label, num]) => `<div class="stat-card"><div class="num">${num}</div><div class="label">${label}</div></div>`).join('');

    const contactCount = document.getElementById('nav-count-contact');
    contactCount.textContent = stats.unreadContact || '';
    contactCount.classList.toggle('hidden', !stats.unreadContact);
  } catch (err) { toast(err.message, true); }
}

let destinationsCache = [];

// ============================================================
// DESTINATIONS
// ============================================================
async function loadDestinations() {
  try {
    const { destinations } = await apiRequest('/admin/destinations');
    destinationsCache = destinations;
    const container = document.getElementById('destinations-table');
    if (!destinations.length) return (container.innerHTML = emptyState('No destinations yet.'));
    container.innerHTML = renderTable(['Name', 'Region', 'Slug', 'Active', ''], destinations.map((d) => [
      escapeHtml(d.name), escapeHtml(d.region || '—'), escapeHtml(d.slug),
      activeBadge(d.active),
      `<div class="row-actions"><button class="btn btn-ghost btn-sm" onclick="editDestination('${d.slug}')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteDestination('${d.slug}')">Delete</button></div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

function destinationForm(d = {}) {
  return `
    ${modalHeader(d.id ? 'Edit destination' : 'Add destination')}
    <form id="destination-form" class="modal-body">
      <div class="form-group">
        <label for="dest-name">Name</label>
        <input type="text" id="dest-name" value="${escapeHtml(d.name)}" required placeholder="e.g. Hunza Valley" />
      </div>
      <div class="form-row" style="display: flex; gap: 12px;">
        <div class="form-group" style="flex: 1;">
          <label for="dest-region">Region</label>
          <input type="text" id="dest-region" value="${escapeHtml(d.region)}" placeholder="e.g. Gilgit-Baltistan" />
        </div>
        <div class="form-group" style="flex: 1;">
          <label for="dest-slug">Slug</label>
          <input type="text" id="dest-slug" value="${escapeHtml(d.slug)}" required placeholder="e.g. hunza-valley" />
        </div>
      </div>
      <div class="form-group">
        <label for="dest-tagline">Tagline</label>
        <input type="text" id="dest-tagline" value="${escapeHtml(d.tagline)}" placeholder="e.g. Switzerland of Pakistan" />
      </div>
      <div class="form-row" style="display: flex; gap: 12px;">
        <div class="form-group" style="flex: 1;">
          <label for="dest-order">Order</label>
          <input type="number" id="dest-order" min="0" value="${d.order ?? ''}" placeholder="e.g. 1" />
        </div>
        <div class="form-group" style="flex: 1;">
          <label for="dest-image-url">Image URL</label>
          <input type="text" id="dest-image-url" value="${escapeHtml(d.imageUrl)}" placeholder="https://..." />
        </div>
      </div>
      <div class="form-group">
        <label for="dest-description">Description</label>
        <textarea id="dest-description" rows="3" placeholder="Short overview shown on the destination page">${escapeHtml(d.description)}</textarea>
      </div>
      <div class="form-group">
        <label for="dest-route">Route</label>
        <input type="text" id="dest-route" value="${escapeHtml(d.route)}" placeholder="e.g. Islamabad - Naran - Hunza" />
      </div>
      <div class="form-group">
        <label for="dest-history">History</label>
        <textarea id="dest-history" rows="3" placeholder="Background / history text">${escapeHtml(d.history)}</textarea>
      </div>
      <div class="form-group">
        <label for="dest-points">Key points (comma separated)</label>
        <input type="text" id="dest-points" value="${Array.isArray(d.points) ? d.points.join(', ') : ''}" placeholder="Scenic lakes, Hiking trails, Local cuisine" />
      </div>
      <div class="form-group">
        <label for="dest-todo">Things to do (comma separated)</label>
        <input type="text" id="dest-todo" value="${Array.isArray(d.todo) ? d.todo.join(', ') : ''}" placeholder="Boating, Trekking, Photography" />
      </div>
      <label style="display:flex; align-items:center; gap:6px;">
        <input type="checkbox" id="dest-active" style="width:auto;" ${d.active !== false ? 'checked' : ''} />Visible on site
      </label>
      <div class="modal-actions" style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
        <button type="button" class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button type="submit" class="btn">${d.id ? 'Save changes' : 'Add destination'}</button>
      </div>
    </form>`;
}

function bindDestinationForm(slug) {
  document.getElementById('destination-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
      name: document.getElementById('dest-name').value.trim(),
      region: document.getElementById('dest-region').value.trim(),
      slug: document.getElementById('dest-slug').value.trim(),
      tagline: document.getElementById('dest-tagline').value.trim(),
      order: document.getElementById('dest-order').value ? Number(document.getElementById('dest-order').value) : null,
      imageUrl: document.getElementById('dest-image-url').value.trim(),
      description: document.getElementById('dest-description').value.trim(),
      route: document.getElementById('dest-route').value.trim(),
      history: document.getElementById('dest-history').value.trim(),
      points: document.getElementById('dest-points').value.split(',').map((s) => s.trim()).filter(Boolean),
      todo: document.getElementById('dest-todo').value.split(',').map((s) => s.trim()).filter(Boolean),
      active: document.getElementById('dest-active').checked,
    };
    try {
      await apiRequest(slug ? `/admin/destinations/${slug}` : '/admin/destinations', { method: slug ? 'PUT' : 'POST', body });
      toast(slug ? 'Destination updated.' : 'Destination added.');
      closeModal(); loadDestinations();
    } catch (err) { toast(err.message, true); }
  });
}

document.getElementById('add-destination-btn').addEventListener('click', () => {
  openModal(destinationForm({}));
  bindDestinationForm(null);
});

function editDestination(slug) {
  const d = destinationsCache.find((x) => x.slug === slug);
  if (!d) return toast('Destination not found.', true);
  openModal(destinationForm(d));
  bindDestinationForm(slug);
}

async function deleteDestination(slug) {
  if (!confirm('Delete this destination?')) return;
  try { await apiRequest(`/admin/destinations/${slug}`, { method: 'DELETE' }); toast('Destination deleted.'); loadDestinations(); }
  catch (err) { toast(err.message, true); }
}

// ============================================================
// TOURS
// ============================================================
let toursCache = [];

async function loadTours() {
  try {
    const { tours } = await apiRequest('/admin/tours');
    toursCache = tours;
    const container = document.getElementById('tours-table');
    if (!tours.length) return (container.innerHTML = emptyState('No tours yet. Click "Add tour" to create one.'));

    container.innerHTML = renderTable(['Title', 'Days', 'Route', 'Price (head)', 'Active', ''], tours.map((t) => [
      escapeHtml(t.title), `${t.days}D/${t.nights}N`, escapeHtml(t.route || '—'),
      fmtMoney(t.priceHead),
      activeBadge(t.active),
      `<div class="row-actions">
         <button class="btn btn-ghost btn-sm" onclick="editTour('${t.id}')">Edit</button>
         <button class="btn btn-danger btn-sm" onclick="deleteTour('${t.id}')">Delete</button>
       </div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

function tourForm(t = {}) {
  const incStr = Array.isArray(t.includes) ? t.includes.join(', ') : '';
  const excStr = Array.isArray(t.excludes) ? t.excludes.join(', ') : '';
  return `
    ${modalHeader(t.id ? 'Edit tour' : 'Add tour')}
    <form id="tour-form" class="modal-body">
      <div class="field"><label>Title</label><input id="t-title" value="${escapeHtml(t.title)}" required /></div>
      <div class="field-row">
        <div class="field"><label>Days</label><input type="number" min="1" id="t-days" value="${t.days || ''}" required /></div>
        <div class="field"><label>Nights</label><input type="number" min="0" id="t-nights" value="${t.nights || ''}" required /></div>
      </div>
      <div class="field"><label>Route</label><input id="t-route" value="${escapeHtml(t.route)}" /></div>
      <div class="field-row">
        <div class="field"><label>Price (per head)</label><input type="number" min="0" id="t-price-head" value="${t.priceHead || ''}" required /></div>
        <div class="field"><label>Price (per couple)</label><input type="number" min="0" id="t-price-couple" value="${t.priceCouple || ''}" /></div>
      </div>
      <div class="field"><label>Departure</label><input id="t-departure" value="${escapeHtml(t.departure)}" /></div>
      <div class="field"><label>Transport</label><input id="t-transport" value="${escapeHtml(t.transport)}" placeholder="e.g. AC Coaster" /></div>
      <div class="field"><label>Includes (comma separated)</label><textarea id="t-includes" rows="2">${escapeHtml(incStr)}</textarea></div>
      <div class="field"><label>Excludes (comma separated)</label><textarea id="t-excludes" rows="2">${escapeHtml(excStr)}</textarea></div>
      <div class="field"><label>Cost breakdown (free text, shown on tour page)</label><textarea id="t-cost" rows="6" placeholder="TRIP COST FROM KARACHI:&#10;Economy Train: Single 49,000/- Couple 110,000/-&#10;AC Standard Train: Single 61,000/- Couple 133,000/-&#10;...">${escapeHtml(costToText(t.cost))}</textarea></div>
      <div class="field"><label>Payment plan (free text, optional)</label><textarea id="t-payment" rows="3" placeholder="50% advance required. JazzCash: Muhammad Azam - 0303-9465839">${escapeHtml(paymentToText(t.payment))}</textarea></div>

      <div class="field">
        <label><strong>Itinerary</strong> (one paragraph, day by day)</label>
        <textarea id="t-itinerary" rows="10" placeholder="Day 1: Pickup from Islamabad, breakfast at Balakot, reach Naran...&#10;&#10;Day 2: Travel to Babusar Top, visit Lulusar Lake...">${escapeHtml(itineraryToText(t.itinerary))}</textarea>
      </div>

      <div class="field"><label>Image URL</label><input id="t-image" value="${escapeHtml(t.image)}" /></div>
      <div class="field-row">
        <label><input type="checkbox" id="t-featured" ${t.featured ? 'checked' : ''} style="width:auto; margin-right:6px;" />Featured</label>
        <label><input type="checkbox" id="t-active" ${t.active !== false ? 'checked' : ''} style="width:auto; margin-right:6px;" />Visible on site</label>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button type="submit" class="btn">${t.id ? 'Save changes' : 'Add tour'}</button>
      </div>
    </form>`;
}

document.getElementById('add-tour-btn').addEventListener('click', () => {
  openModal(tourForm({}));
  bindTourForm(null);
});

function editTour(id) {
  const t = toursCache.find((x) => x.id === id);
  if (!t) return toast('Tour not found.', true);
  openModal(tourForm(t));
  bindTourForm(id);
}

function bindTourForm(id) {
  document.getElementById('tour-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Cost, payment and itinerary are all plain text now — no parsing needed.
    const itinerary = document.getElementById('t-itinerary').value.trim();
    const cost = document.getElementById('t-cost').value.trim() || null;
    const payment = document.getElementById('t-payment').value.trim() || null;

    const body = {
      title: document.getElementById('t-title').value.trim(),
      days: Number(document.getElementById('t-days').value),
      nights: Number(document.getElementById('t-nights').value),
      route: document.getElementById('t-route').value.trim(),
      priceHead: Number(document.getElementById('t-price-head').value),
      priceCouple: document.getElementById('t-price-couple').value ? Number(document.getElementById('t-price-couple').value) : null,
      departure: document.getElementById('t-departure').value.trim(),
      transport: document.getElementById('t-transport').value.trim(),
      includes: document.getElementById('t-includes').value.split(',').map((s) => s.trim()).filter(Boolean),
      excludes: document.getElementById('t-excludes').value.split(',').map((s) => s.trim()).filter(Boolean),
      cost,
      payment,
      itinerary: itinerary,
      image: document.getElementById('t-image').value.trim(),
      featured: document.getElementById('t-featured').checked,
      active: document.getElementById('t-active').checked,
    };
    try {
      await apiRequest(id ? `/admin/tours/${id}` : '/admin/tours', { method: id ? 'PUT' : 'POST', body });
      toast(id ? 'Tour updated.' : 'Tour added.');
      closeModal(); loadTours();
    } catch (err) { toast(err.message, true); }
  });
}

async function deleteTour(id) {
  if (!confirm('Delete this tour?')) return;
  try { await apiRequest(`/admin/tours/${id}`, { method: 'DELETE' }); toast('Tour deleted.'); loadTours(); }
  catch (err) { toast(err.message, true); }
}

// ============================================================
// GALLERY
// ============================================================
let galleryCache = [];

async function loadGallery() {
  try {
    if (!destinationsCache.length) await apiRequest('/admin/destinations').then((r) => (destinationsCache = r.destinations));
    const { items } = await apiRequest('/admin/gallery');
    galleryCache = items;
    const container = document.getElementById('gallery-table');
    if (!items.length) return (container.innerHTML = emptyState('No photos yet.'));
    container.innerHTML = renderTable(['Destination', 'Order', 'Active', ''], items.map((g) => [
      escapeHtml(g.destinationSlug), g.order,
      activeBadge(g.active),
      `<div class="row-actions"><button class="btn btn-ghost btn-sm" onclick="editGallery('${g.id}')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteGallery('${g.id}')">Delete</button></div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

function galleryForm(g = {}) {
  const options = destinationsCache.map((d) => `<option value="${escapeHtml(d.slug)}" ${g.destinationSlug === d.slug ? 'selected' : ''}>${escapeHtml(d.name)}</option>`).join('');
  return `
    ${modalHeader(g.id ? 'Edit photo' : 'Add photo')}
    <form id="gallery-form" class="modal-body">
      <div class="form-group">
        <label for="gal-destination">Destination</label>
        <select id="gal-destination" required>${options || '<option value="">No destinations yet</option>'}</select>
      </div>
      <div class="form-group">
        <label for="gal-order">Order</label>
        <input type="number" id="gal-order" min="0" value="${g.order ?? ''}" placeholder="e.g. 1" />
      </div>
      <div class="form-group">
        <label for="gal-badge">Badge (optional)</label>
        <input type="text" id="gal-badge" value="${escapeHtml(g.badge)}" placeholder="e.g. Popular" />
      </div>
      <div class="form-group">
        <label for="gal-image">Photo</label>
        <input type="file" id="gal-image" accept="image/*" ${g.id ? '' : 'required'} />
        ${g.imageUrl ? `<p style="margin-top:6px; font-size:12px; color:#666;">Current photo is set — choose a file only to replace it.</p>` : ''}
      </div>
      <label style="display:flex; align-items:center; gap:6px;">
        <input type="checkbox" id="gal-tall" style="width:auto;" ${g.tall ? 'checked' : ''} />Tall image (masonry layout)
      </label>
      <label style="display:flex; align-items:center; gap:6px; margin-top:8px;">
        <input type="checkbox" id="gal-active" style="width:auto;" ${g.active !== false ? 'checked' : ''} />Visible on site
      </label>
      <div class="modal-actions" style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
        <button type="button" class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button type="submit" class="btn">${g.id ? 'Save changes' : 'Add photo'}</button>
      </div>
    </form>`;
}

function bindGalleryForm(id, currentImage) {
  const form = document.getElementById('gallery-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving…';
    try {
      const file = document.getElementById('gal-image').files[0];
      let image = currentImage || null;
      if (file) image = await uploadImage(file);
      const body = {
        destinationSlug: document.getElementById('gal-destination').value,
        order: Number(document.getElementById('gal-order').value) || 0,
        imageUrl: image,
        badge: document.getElementById('gal-badge').value.trim(),
        tall: document.getElementById('gal-tall').checked,
        active: document.getElementById('gal-active').checked,
      };
      await apiRequest(id ? `/admin/gallery/${id}` : '/admin/gallery', { method: id ? 'PUT' : 'POST', body });
      toast(id ? 'Photo updated.' : 'Photo added.');
      closeModal(); loadGallery();
    } catch (err) {
      toast(err.message, true);
      submitBtn.disabled = false;
      submitBtn.textContent = id ? 'Save changes' : 'Add photo';
    }
  });
}

document.getElementById('add-gallery-btn').addEventListener('click', async () => {
  if (!destinationsCache.length) {
    try { destinationsCache = (await apiRequest('/admin/destinations')).destinations; }
    catch (err) { return toast(err.message, true); }
  }
  openModal(galleryForm({}));
  bindGalleryForm(null, null);
});

function editGallery(id) {
  const g = galleryCache.find((x) => x.id === id);
  if (!g) return toast('Photo not found.', true);
  openModal(galleryForm(g));
  bindGalleryForm(id, g.imageUrl);
}

async function deleteGallery(id) {
  if (!confirm('Delete this photo?')) return;
  try { await apiRequest(`/admin/gallery/${id}`, { method: 'DELETE' }); toast('Photo deleted.'); loadGallery(); }
  catch (err) { toast(err.message, true); }
}

// ============================================================
// FEEDBACK
// ============================================================
let feedbackCache = [];

async function loadFeedback() {
  try {
    const { feedback } = await apiRequest('/admin/feedback');
    feedbackCache = feedback;
    const container = document.getElementById('feedback-table');
    if (!feedback.length) return (container.innerHTML = emptyState('No feedback yet.'));
    container.innerHTML = renderTable(['Name', 'Trip', 'Rating', 'Message', 'Status', ''], feedback.map((f) => [
      escapeHtml(f.name), escapeHtml(f.trip || '—'), '★'.repeat(f.rating), escapeHtml(f.text),
      f.approved !== false ? '<span class="badge badge-approved">Published</span>' : '<span class="badge badge-pending">Pending</span>',
      `<div class="row-actions">
         <button class="btn btn-ghost btn-sm" onclick="toggleFeedbackApproval('${f.id}')">${f.approved !== false ? 'Unpublish' : 'Publish'}</button>
         <button class="btn btn-danger btn-sm" onclick="deleteFeedback('${f.id}')">Delete</button>
       </div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

async function toggleFeedbackApproval(id) {
  const f = feedbackCache.find((x) => x.id === id);
  if (!f) return toast('Feedback not found.', true);
  const nextApproved = !(f.approved !== false);
  try {
    await apiRequest(`/admin/feedback/${id}`, { method: 'PATCH', body: { approved: nextApproved } });
    toast(nextApproved ? 'Feedback published.' : 'Feedback unpublished.');
    loadFeedback();
  } catch (err) { toast(err.message, true); }
}

async function deleteFeedback(id) {
  if (!confirm('Delete this feedback? This cannot be undone.')) return;
  try {
    await apiRequest(`/admin/feedback/${id}`, { method: 'DELETE' });
    toast('Feedback deleted.');
    loadFeedback();
  } catch (err) { toast(err.message, true); }
}

// ============================================================
// CONTACT
// ============================================================
async function loadContact() {
  try {
    const { messages } = await apiRequest('/admin/contact');
    contactCache = messages;
    const container = document.getElementById('contact-table');
    if (!messages.length) return (container.innerHTML = emptyState('No messages yet.'));
    container.innerHTML = renderTable(['Name', 'Email', 'Subject', 'Message', 'Status', ''], messages.map((m) => [
      escapeHtml(m.name), escapeHtml(m.email), escapeHtml(m.subject), escapeHtml(m.message),
      `<select onchange="updateContactStatus('${m.id}', this.value)" class="status-select">
         <option value="new" ${m.status === 'new' ? 'selected' : ''}>New</option>
         <option value="read" ${m.status === 'read' ? 'selected' : ''}>Read</option>
         <option value="replied" ${m.status === 'replied' ? 'selected' : ''}>Replied</option>
       </select>`,
      `<button class="btn btn-danger btn-sm" onclick="deleteContact('${m.id}')">Delete</button>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

let contactCache = [];

async function updateContactStatus(id, status) {
  try {
    await apiRequest(`/admin/contact/${id}`, { method: 'PATCH', body: { status } });
    toast('Status updated.');
    loadContact();
  } catch (err) { toast(err.message, true); }
}

async function deleteContact(id) {
  if (!confirm('Delete this message?')) return;
  try {
    await apiRequest(`/admin/contact/${id}`, { method: 'DELETE' });
    toast('Message deleted.');
    loadContact();
  } catch (err) { toast(err.message, true); }
}

// ============================================================
const loaders = {
  overview: loadOverview, destinations: loadDestinations,
  feedback: loadFeedback, contact: loadContact,
  tours: loadTours, gallery: loadGallery,
};
loadOverview();