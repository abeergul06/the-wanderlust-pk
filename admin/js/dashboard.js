// ---------- guard ----------
if (!Auth.getToken()) window.location.href = '/admin/login.html';
const admin = Auth.getAdmin();
document.getElementById('who').textContent = admin ? (admin.name || admin.email) : '';
document.getElementById('logout-btn').addEventListener('click', () => {
  Auth.clearSession();
  window.location.href = '/admin/login.html';
});

// ---------- nav ----------
const views = ['overview', 'packages', 'destinations', 'bookings', 'feedback', 'contact', 'tours', 'gallery'];
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
function openModal(html) {
  modalContent.innerHTML = html;
  overlay.classList.add('show');
}
function closeModal() {
  overlay.classList.remove('show');
  modalContent.innerHTML = '';
}
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

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

// ========= TOUR ITINERARY GLOBALS =========
let tourDayCount = 0;
function addTourDayField(day = {title: '', description: ''}) {
  tourDayCount++;
  const container = document.getElementById('tour-itinerary-container');
  if(!container) return;
  const div = document.createElement('div');
  div.className = "border p-3 rounded bg-gray-50";
  div.innerHTML = `
    <div class="flex justify-between mb-1">
      <label class="font-semibold">Day ${tourDayCount}</label>
      <button type="button" onclick="this.closest('div').remove(); tourDayCount--;" class="text-red-500 text-xs">Remove</button>
    </div>
    <input type="text" placeholder="Day Title: e.g. Islamabad to Skardu" value="${day.title || ''}" class="tour-day-title w-full border rounded p-2 mb-2" required />
    <textarea placeholder="Description" class="tour-day-desc w-full border rounded p-2" rows="3" required>${day.description || ''}</textarea>
  `;
  container.appendChild(div);
}

// ============================================================
// OVERVIEW
// ============================================================
async function loadOverview() {
  try {
    const stats = await apiRequest('/admin/stats');
    document.getElementById('stat-grid').innerHTML = [
      ['Packages', stats.packages], ['Destinations', stats.destinations],
      ['Tours', stats.tours], ['Gallery photos', stats.gallery],
      ['Total bookings', stats.bookings], ['Pending bookings', stats.pendingBookings],
      ['Feedback received', stats.feedback], ['Unread messages', stats.unreadContact],
    ].map(([label, num]) => `<div class="stat-card"><div class="num">${num}</div><div class="label">${label}</div></div>`).join('');

    const { bookings } = await apiRequest('/admin/bookings');
    const recent = bookings.slice(0, 5);
    document.getElementById('overview-recent-bookings').innerHTML = recent.length
      ? renderTable(['Name', 'Trip', 'Status', 'Date'], recent.map((b) => [
          escapeHtml(b.name), escapeHtml(b.packages?.title || b.destination || '—'),
          statusBadge(b.status), fmtDate(b.createdAt),
        ]))
      : emptyState('No bookings yet.');
  } catch (err) { toast(err.message, true); }
}

// ============================================================
// PACKAGES
// ============================================================
let packagesCache = [];
let destinationsCache = [];

async function loadPackages() {
  try {
    if (!destinationsCache.length) await apiRequest('/admin/destinations').then((r) => (destinationsCache = r.destinations));
    const { packages } = await apiRequest('/admin/packages');
    packagesCache = packages;
    const container = document.getElementById('packages-table');
    if (!packages.length) return (container.innerHTML = emptyState('No packages yet.'));
    container.innerHTML = renderTable(['Title', 'Category', 'Departure', 'Days', 'Cost', 'Active', ''], packages.map((p) => [
      escapeHtml(p.title), escapeHtml(p.category || '—'), escapeHtml(p.departure || '—'), p.durationDays,
      fmtMoney(p.cost),
      p.isActive ? '<span class="badge badge-approved">Active</span>' : '<span class="badge badge-cancelled">Hidden</span>',
      `<div class="row-actions"><button class="btn btn-ghost btn-sm" onclick="editPackage('${p.id}')">Edit</button><button class="btn btn-danger btn-sm" onclick="deletePackage('${p.id}')">Delete</button></div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}
function editPackage(id){} // add your package form logic here if needed
async function deletePackage(id){ if(confirm('Delete?')){ await apiRequest(`/admin/packages/${id}`, { method: 'DELETE' }); loadPackages(); }}

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
      d.active ? '<span class="badge badge-approved">Active</span>' : '<span class="badge badge-cancelled">Hidden</span>',
      `<div class="row-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-danger btn-sm">Delete</button></div>`,
    ]));
  } catch (err) { toast(err.message, true); }
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
      t.active ? '<span class="badge badge-approved">Active</span>' : '<span class="badge badge-cancelled">Hidden</span>',
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
    <h3>${t.slug ? 'Edit tour' : 'Add tour'}</h3>
    <form id="tour-form">
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
      <div class="field"><label>Includes (comma separated)</label><textarea id="t-includes" rows="2">${escapeHtml(incStr)}</textarea></div>
      <div class="field"><label>Excludes (comma separated)</label><textarea id="t-excludes" rows="2">${escapeHtml(excStr)}</textarea></div>
      
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
        <button type="button" class="btn btn-ghost" id="modal-cancel-btn-2">Cancel</button>
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
  openModal(tourForm(t));
  bindTourForm(slug);
  tourDayCount = t.itinerary?.length || 0;
  t.itinerary?.forEach(d => addTourDayField(d));
}

function bindTourForm(slug) {
  document.getElementById('add-tour-day-btn').addEventListener('click', () => addTourDayField());
  document.getElementById('modal-cancel-btn-2').addEventListener('click', () => closeModal());

  document.getElementById('tour-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const itinerary = [];
    document.querySelectorAll('#tour-itinerary-container > div').forEach(div => {
      itinerary.push({
        title: div.querySelector('.tour-day-title').value,
        description: div.querySelector('.tour-day-desc').value
      });
    });

    const body = {
      title: document.getElementById('t-title').value.trim(),
      days: Number(document.getElementById('t-days').value),
      nights: Number(document.getElementById('t-nights').value),
      route: document.getElementById('t-route').value.trim(),
      priceHead: Number(document.getElementById('t-price-head').value),
      priceCouple: document.getElementById('t-price-couple').value ? Number(document.getElementById('t-price-couple').value) : null,
      departure: document.getElementById('t-departure').value.trim(),
      includes: document.getElementById('t-includes').value.split(',').map((s) => s.trim()).filter(Boolean),
      excludes: document.getElementById('t-excludes').value.split(',').map((s) => s.trim()).filter(Boolean),
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
async function loadGallery() {
  try {
    const { items } = await apiRequest('/admin/gallery');
    const container = document.getElementById('gallery-table');
    if (!items.length) return (container.innerHTML = emptyState('No photos yet.'));
    container.innerHTML = renderTable(['Destination', 'Order', 'Active', ''], items.map((g) => [
      escapeHtml(g.destinationSlug), g.order,
      g.active ? '<span class="badge badge-approved">Active</span>' : '<span class="badge badge-cancelled">Hidden</span>',
      `<div class="row-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-danger btn-sm">Delete</button></div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

// ============================================================
// BOOKINGS
// ============================================================
async function loadBookings() {
  try {
    const { bookings } = await apiRequest('/admin/bookings');
    const container = document.getElementById('bookings-table');
    if (!bookings.length) return (container.innerHTML = emptyState('No bookings yet.'));
    container.innerHTML = renderTable(['Name', 'Trip', 'Status', 'Date'], bookings.map((b) => [
      escapeHtml(b.name), escapeHtml(b.packages?.title || '—'), statusBadge(b.status), fmtDate(b.createdAt)
    ]));
  } catch (err) { toast(err.message, true); }
}

// ============================================================
// FEEDBACK
// ============================================================
async function loadFeedback() {
  try {
    const { feedback } = await apiRequest('/admin/feedback');
    const container = document.getElementById('feedback-table');
    if (!feedback.length) return (container.innerHTML = emptyState('No feedback yet.'));
    container.innerHTML = renderTable(['Name', 'Rating', 'Message'], feedback.map((f) => [
      escapeHtml(f.name), '★'.repeat(f.rating), escapeHtml(f.message)
    ]));
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
      escapeHtml(m.name), escapeHtml(m.email), escapeHtml(m.subject), escapeHtml(m.message)
    ]));
  } catch (err) { toast(err.message, true); }
}

// ============================================================
const loaders = {
  overview: loadOverview, packages: loadPackages, destinations: loadDestinations,
  bookings: loadBookings, feedback: loadFeedback, contact: loadContact,
  tours: loadTours, gallery: loadGallery,
};
loadOverview();