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

// ========= TOUR ITINERARY GLOBALS =========
let tourDayCount = 0;
function addTourDayField(day = { title: '', description: '' }) {
  tourDayCount++;
  const container = document.getElementById('tour-itinerary-container');
  if (!container) return;
  const div = document.createElement('div');
  // "tour-day-card" gives the Remove button an unambiguous target — the
  // whole card, not just its inner header row.
  div.className = 'border p-3 rounded bg-gray-50 tour-day-card';
  div.innerHTML = `
    <div class="flex justify-between mb-1">
      <label class="font-semibold">Day ${tourDayCount}</label>
      <button type="button" class="tour-day-remove text-red-500 text-xs">Remove</button>
    </div>
    <input type="text" placeholder="Day Title: e.g. Islamabad to Skardu" value="${escapeHtml(day.title || '')}" class="tour-day-title w-full border rounded p-2 mb-2" required />
    <textarea placeholder="Description" class="tour-day-desc w-full border rounded p-2" rows="3" required>${escapeHtml(day.description || '')}</textarea>
  `;
  div.querySelector('.tour-day-remove').addEventListener('click', () => {
    div.remove();
  });
  container.appendChild(div);
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
      `<div class="row-actions"><button class="btn btn-ghost btn-sm" onclick="editDestination('${d.id}')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteDestination('${d.id}')">Delete</button></div>`,
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
          <input type="text" id="dest-image-url" value="${escapeHtml(d.image_url)}" placeholder="https://..." />
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

function bindDestinationForm(id) {
  document.getElementById('destination-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
      name: document.getElementById('dest-name').value.trim(),
      region: document.getElementById('dest-region').value.trim(),
      slug: document.getElementById('dest-slug').value.trim(),
      tagline: document.getElementById('dest-tagline').value.trim(),
      order: document.getElementById('dest-order').value ? Number(document.getElementById('dest-order').value) : null,
      image_url: document.getElementById('dest-image-url').value.trim(),
      description: document.getElementById('dest-description').value.trim(),
      route: document.getElementById('dest-route').value.trim(),
      history: document.getElementById('dest-history').value.trim(),
      points: document.getElementById('dest-points').value.split(',').map((s) => s.trim()).filter(Boolean),
      todo: document.getElementById('dest-todo').value.split(',').map((s) => s.trim()).filter(Boolean),
      active: document.getElementById('dest-active').checked,
    };
    try {
      await apiRequest(id ? `/admin/destinations/${id}` : '/admin/destinations', { method: id ? 'PUT' : 'POST', body });
      toast(id ? 'Destination updated.' : 'Destination added.');
      closeModal(); loadDestinations();
    } catch (err) { toast(err.message, true); }
  });
}

document.getElementById('add-destination-btn').addEventListener('click', () => {
  openModal(destinationForm({}));
  bindDestinationForm(null);
});

function editDestination(id) {
  const d = destinationsCache.find((x) => x.id === id);
  if (!d) return toast('Destination not found.', true);
  openModal(destinationForm(d));
  bindDestinationForm(id);
}

async function deleteDestination(id) {
  if (!confirm('Delete this destination?')) return;
  try { await apiRequest(`/admin/destinations/${id}`, { method: 'DELETE' }); toast('Destination deleted.'); loadDestinations(); }
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
         <button class="btn btn-ghost btn-sm" onclick="editTour('${t.slug}')">Edit</button>
         <button class="btn btn-danger btn-sm" onclick="deleteTour('${t.slug}')">Delete</button>
       </div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

function tourForm(t = {}) {
  const incStr = Array.isArray(t.includes) ? t.includes.join(', ') : '';
  const excStr = Array.isArray(t.excludes) ? t.excludes.join(', ') : '';
  return `
    ${modalHeader(t.slug ? 'Edit tour' : 'Add tour')}
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
      <div class="field-row">
        <div class="field">
          <label>Length group</label>
          <select id="t-length-group">
            <option value="" ${!t.length_group ? 'selected' : ''}>—</option>
            <option value="short" ${t.length_group === 'short' ? 'selected' : ''}>Short</option>
            <option value="medium" ${t.length_group === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="long" ${t.length_group === 'long' ? 'selected' : ''}>Long</option>
          </select>
        </div>
        <div class="field"><label>Transport</label><input id="t-transport" value="${escapeHtml(t.transport)}" placeholder="e.g. AC Coaster" /></div>
      </div>
      <div class="field"><label>Destination tags (comma separated)</label><input id="t-destination-tags" value="${Array.isArray(t.destination_tags) ? t.destination_tags.join(', ') : ''}" placeholder="hunza, gilgit-baltistan" /></div>
      <div class="field"><label>Includes (comma separated)</label><textarea id="t-includes" rows="2">${escapeHtml(incStr)}</textarea></div>
      <div class="field"><label>Excludes (comma separated)</label><textarea id="t-excludes" rows="2">${escapeHtml(excStr)}</textarea></div>
      <div class="field"><label>Cost breakdown (JSON, optional)</label><textarea id="t-cost" rows="3" placeholder='{"advance": "30%", "balance": "on arrival"}'>${t.cost ? escapeHtml(JSON.stringify(t.cost)) : ''}</textarea></div>
      <div class="field"><label>Payment plan (JSON, optional)</label><textarea id="t-payment" rows="3" placeholder='{"method": "bank transfer", "notes": "..."}'>${t.payment ? escapeHtml(JSON.stringify(t.payment)) : ''}</textarea></div>
      <div class="field">
        <label>Cost Breakdown (free text, shown on tour page)</label>
        <textarea id="t-cost-breakdown" rows="8" placeholder="TRIP COST FROM KARACHI:&#10;Economy Train: Single 49,000/- Couple 110,000/-&#10;AC Standard Train: Single 61,000/- Couple 133,000/-&#10;...">${escapeHtml(t.costBreakdown || '')}</textarea>
      </div>

      <div class="field">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <label style="margin:0;"><strong>Itinerary Schedule</strong></label>
          <button type="button" class="btn btn-ghost btn-sm" id="add-tour-day-btn">+ Add Day</button>
        </div>
        <div id="tour-itinerary-container" style="display:flex; flex-direction:column; gap:8px;"></div>
      </div>

      <div class="field"><label>Image URL</label><input id="t-image" value="${escapeHtml(t.image)}" /></div>
      <div class="field-row">
        <label><input type="checkbox" id="t-featured" ${t.featured ? 'checked' : ''} style="width:auto; margin-right:6px;" />Featured</label>
        <label><input type="checkbox" id="t-active" ${t.active !== false ? 'checked' : ''} style="width:auto; margin-right:6px;" />Visible on site</label>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button type="submit" class="btn">${t.slug ? 'Save changes' : 'Add tour'}</button>
      </div>
    </form>`;
}

document.getElementById('add-tour-btn').addEventListener('click', () => {
  openModal(tourForm({}));
  bindTourForm(null);
  tourDayCount = 0;
  addTourDayField();
});

function editTour(slug) {
  const t = toursCache.find((x) => x.slug === slug);
  if (!t) return toast('Tour not found.', true);
  openModal(tourForm(t));
  bindTourForm(slug);
  // Just reset the counter — addTourDayField() already increments it per
  // card. Pre-setting it to the itinerary length here (as before) caused
  // the day numbers to double-count and start from the wrong value.
  tourDayCount = 0;
  (t.itinerary || []).forEach((d) => addTourDayField(d));
}

function bindTourForm(slug) {
  document.getElementById('add-tour-day-btn').addEventListener('click', () => addTourDayField());

  document.getElementById('tour-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const itinerary = [];
    document.querySelectorAll('#tour-itinerary-container > div').forEach((div) => {
      itinerary.push({
        title: div.querySelector('.tour-day-title').value,
        description: div.querySelector('.tour-day-desc').value,
      });
    });

    // Cost / payment are free-form JSON since the DB column has no fixed
    // shape — validate before building the body so a typo doesn't silently
    // send a bad value or crash JSON.stringify downstream.
    const costRaw = document.getElementById('t-cost').value.trim();
    const paymentRaw = document.getElementById('t-payment').value.trim();
    let cost = null, payment = null;
    try {
      cost = costRaw ? JSON.parse(costRaw) : null;
      payment = paymentRaw ? JSON.parse(paymentRaw) : null;
    } catch (err) {
      return toast('Cost / Payment plan must be valid JSON (or left empty).', true);
    }

    const body = {
      title: document.getElementById('t-title').value.trim(),
      days: Number(document.getElementById('t-days').value),
      nights: Number(document.getElementById('t-nights').value),
      route: document.getElementById('t-route').value.trim(),
      priceHead: Number(document.getElementById('t-price-head').value),
      priceCouple: document.getElementById('t-price-couple').value ? Number(document.getElementById('t-price-couple').value) : null,
      departure: document.getElementById('t-departure').value.trim(),
      length_group: document.getElementById('t-length-group').value || null,
      transport: document.getElementById('t-transport').value.trim(),
      destination_tags: document.getElementById('t-destination-tags').value.split(',').map((s) => s.trim()).filter(Boolean),
      includes: document.getElementById('t-includes').value.split(',').map((s) => s.trim()).filter(Boolean),
      excludes: document.getElementById('t-excludes').value.split(',').map((s) => s.trim()).filter(Boolean),
      cost,
      payment,
      costBreakdown: document.getElementById('t-cost-breakdown').value.trim(),
      itinerary: itinerary,
      image: document.getElementById('t-image').value.trim(),
      featured: document.getElementById('t-featured').checked,
      active: document.getElementById('t-active').checked,
    };
    try {
      await apiRequest(slug ? `/admin/tours/${slug}` : '/admin/tours', { method: slug ? 'PUT' : 'POST', body });
      toast(slug ? 'Tour updated.' : 'Tour added.');
      closeModal(); loadTours();
    } catch (err) { toast(err.message, true); }
  });
}

async function deleteTour(slug) {
  if (!confirm('Delete this tour?')) return;
  try { await apiRequest(`/admin/tours/${slug}`, { method: 'DELETE' }); toast('Tour deleted.'); loadTours(); }
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
        ${g.image ? `<p style="margin-top:6px; font-size:12px; color:#666;">Current photo is set — choose a file only to replace it.</p>` : ''}
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
        image,
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
  bindGalleryForm(id, g.image);
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
    const container = document.getElementById('contact-table');
    if (!messages.length) return (container.innerHTML = emptyState('No messages yet.'));
    container.innerHTML = renderTable(['Name', 'Email', 'Subject', 'Message'], messages.map((m) => [
      escapeHtml(m.name), escapeHtml(m.email), escapeHtml(m.subject), escapeHtml(m.message),
    ]));
  } catch (err) { toast(err.message, true); }
}

// ============================================================
const loaders = {
  overview: loadOverview, destinations: loadDestinations,
  feedback: loadFeedback, contact: loadContact,
  tours: loadTours, gallery: loadGallery,
};
loadOverview();