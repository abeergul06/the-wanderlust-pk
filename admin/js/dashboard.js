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

// ============================================================
// Overview
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

    setNavCount('bookings', stats.pendingBookings);
    setNavCount('contact', stats.unreadContact);

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

function setNavCount(view, n) {
  const el = document.getElementById(`nav-count-${view}`);
  if (n > 0) { el.textContent = n; el.classList.remove('hidden'); }
  else { el.classList.add('hidden'); }
}

function renderTable(headers, rows) {
  return `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
function emptyState(msg) { return `<div class="empty-state">${msg}</div>`; }
function statusBadge(status) { return `<span class="badge badge-${status}">${status}</span>`; }

// ============================================================
// Destinations
// ============================================================
let destinationsCache = [];

async function loadDestinations() {
  try {
    const { destinations } = await apiRequest('/admin/destinations');
    destinationsCache = destinations;
    const container = document.getElementById('destinations-table');
    if (!destinations.length) return (container.innerHTML = emptyState('No destinations yet. Add one to populate search filters.'));

    container.innerHTML = renderTable(['Name', 'Region', 'Slug', 'Active', ''], destinations.map((d) => [
      escapeHtml(d.name), escapeHtml(d.region || '—'), escapeHtml(d.slug),
      d.active ? '<span class="badge badge-approved">Active</span>' : '<span class="badge badge-cancelled">Hidden</span>',
      `<div class="row-actions">
         <button class="btn btn-ghost btn-sm" onclick="editDestination('${d.slug}')">Edit</button>
         <button class="btn btn-danger btn-sm" onclick="deleteDestination('${d.slug}')">Delete</button>
       </div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

function destinationForm(d = {}) {
  return `
    <h3>${d.id ? 'Edit destination' : 'Add destination'}</h3>
    <form id="destination-form">
      <div class="field"><label>Name</label><input id="d-name" value="${escapeHtml(d.name)}" required /></div>
      <div class="field-row">
        <div class="field"><label>Region</label><input id="d-region" value="${escapeHtml(d.region)}" /></div>
        <div class="field"><label>Slug</label><input id="d-slug" value="${escapeHtml(d.slug)}" required /></div>
      </div>
      <div class="field"><label>Image URL</label><input id="d-image" value="${escapeHtml(d.imageUrl)}" /></div>
      <div class="field"><label>Description</label><textarea id="d-desc" rows="3">${escapeHtml(d.description)}</textarea></div>
      <div class="field">
        <label><input type="checkbox" id="d-active" ${d.active !== false ? 'checked' : ''} style="width:auto; margin-right:6px;" />Visible on site</label>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn">${d.id ? 'Save changes' : 'Add destination'}</button>
      </div>
    </form>`;
}

document.getElementById('add-destination-btn').addEventListener('click', () => {
  openModal(destinationForm({}));
  bindDestinationForm(null);
});
function editDestination(slug) {
  const d = destinationsCache.find((x) => x.slug === slug);
  openModal(destinationForm(d));
  bindDestinationForm(slug);
}
function bindDestinationForm(slug) {
  document.getElementById('destination-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
      name: document.getElementById('d-name').value.trim(),
      region: document.getElementById('d-region').value.trim(),
      slug: document.getElementById('d-slug').value.trim(),
      imageUrl: document.getElementById('d-image').value.trim(),
      description: document.getElementById('d-desc').value.trim(),
      active: document.getElementById('d-active').checked,
    };
    try {
      // Destination routes are slug-based (see adminRoutes.js), so the
      // ORIGINAL slug (before any edit to the slug field) is what goes in
      // the URL — the new slug value, if changed, travels in the body.
      await apiRequest(slug ? `/admin/destinations/${slug}` : '/admin/destinations', { method: slug ? 'PUT' : 'POST', body });
      toast(slug ? 'Destination updated.' : 'Destination added.');
      closeModal(); loadDestinations();
    } catch (err) { toast(err.message, true); }
  });
}
async function deleteDestination(slug) {
  if (!confirm('Delete this destination? Packages linked to it will keep working but show no destination.')) return;
  try { await apiRequest(`/admin/destinations/${slug}`, { method: 'DELETE' }); toast('Destination deleted.'); loadDestinations(); }
  catch (err) { toast(err.message, true); }
}

// ============================================================
// Packages
// ============================================================
let packagesCache = [];

async function loadPackages() {
  try {
    if (!destinationsCache.length) await apiRequest('/admin/destinations').then((r) => (destinationsCache = r.destinations));
    const { packages } = await apiRequest('/admin/packages');
    packagesCache = packages;
    const container = document.getElementById('packages-table');
    if (!packages.length) return (container.innerHTML = emptyState('No packages yet. Add your first tour plan.'));

    container.innerHTML = renderTable(['Title', 'Category', 'Departure', 'Days', 'Cost', 'Active', ''], packages.map((p) => [
      escapeHtml(p.title), escapeHtml(p.category || '—'), escapeHtml(p.departure || '—'), p.durationDays,
      fmtMoney(p.cost),
      p.isActive ? '<span class="badge badge-approved">Active</span>' : '<span class="badge badge-cancelled">Hidden</span>',
      `<div class="row-actions">
         <button class="btn btn-ghost btn-sm" onclick="editPackage('${p.id}')">Edit</button>
         <button class="btn btn-danger btn-sm" onclick="deletePackage('${p.id}')">Delete</button>
       </div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

function destinationOptions(selectedId) {
  return `<option value="">— none —</option>` + destinationsCache.map((d) =>
    `<option value="${d.id}" ${d.id === selectedId ? 'selected' : ''}>${escapeHtml(d.name)}</option>`).join('');
}

function categoryOptions(selected) {
  return ['Family', 'Couple', 'Group', 'Solo'].map((c) =>
    `<option value="${c}" ${c === selected ? 'selected' : ''}>${c}</option>`).join('');
}

function packageForm(p = {}) {
  const incStr = Array.isArray(p.servicesIncluded) ? p.servicesIncluded.join(', ') : (p.servicesIncluded || '');
  const excStr = Array.isArray(p.servicesNotIncluded) ? p.servicesNotIncluded.join(', ') : (p.servicesNotIncluded || '');

  return `
    <h3>${p.id ? 'Edit package' : 'Add package'}</h3>
    <form id="package-form">
      <div class="field"><label>Title</label><input id="p-title" value="${escapeHtml(p.title)}" required /></div>
      
      <div class="field-row">
        <div class="field"><label>Destination</label><select id="p-destination">${destinationOptions(p.destinationId)}</select></div>
        <div class="field"><label>Category</label><select id="p-category">${categoryOptions(p.category)}</select></div>
      </div>

      <div class="field-row">
        <div class="field"><label>Departure</label><input id="p-departure" value="${escapeHtml(p.departure)}" required placeholder="e.g. Islamabad" /></div>
        <div class="field"><label>Duration (days)</label><input type="number" min="1" id="p-duration" value="${p.durationDays || ''}" required /></div>
      </div>

      <div class="field"><label>Cost (PKR)</label><input type="number" min="0" id="p-price" value="${p.cost || ''}" required /></div>
      <div class="field"><label>Services Included (comma separated)</label><textarea id="p-inc" rows="2" placeholder="Hotel, Transport, Breakfast">${escapeHtml(incStr)}</textarea></div>
      <div class="field"><label>Services Not Included (comma separated)</label><textarea id="p-exc" rows="2" placeholder="Personal expenses, Airfare">${escapeHtml(excStr)}</textarea></div>
      
      <div class="field">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <label style="margin:0;"><strong>Itinerary Schedule</strong></label>
          <button type="button" class="btn btn-ghost btn-sm" id="add-itinerary-btn">+ Add Day</button>
        </div>
        <div id="itinerary-list" style="display:flex; flex-direction:column; gap:8px;"></div>
      </div>

      <div class="field"><label>Image URL</label><input id="p-image" value="${escapeHtml(p.imageUrl)}" /></div>
      <div class="field"><label>Description</label><textarea id="p-desc" rows="3">${escapeHtml(p.description)}</textarea></div>
      <div class="field">
        <label><input type="checkbox" id="p-active" ${p.isActive !== false ? 'checked' : ''} style="width:auto; margin-right:6px;" />Visible on site</label>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn">${p.id ? 'Save changes' : 'Add package'}</button>
      </div>
    </form>`;
}

document.getElementById('add-package-btn').addEventListener('click', () => {
  openModal(packageForm({}));
  bindPackageForm(null, []);
});

function editPackage(id) {
  const p = packagesCache.find((x) => x.id === id);
  openModal(packageForm(p));
  bindPackageForm(id, p.itinerary || []);
}

function renderItineraryItem(container, dayNum, activities = '') {
  const div = document.createElement('div');
  div.className = 'itinerary-row';
  div.style.cssText = 'border:1px solid #ddd; padding:8px; border-radius:4px; background:#f9f9f9;';
  div.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
      <strong class="day-label">Day ${dayNum}</strong>
      <button type="button" style="color:red; background:none; border:none; cursor:pointer;" onclick="this.parentElement.parentElement.remove(); reindexItinerary();">Remove</button>
    </div>
    <textarea class="itinerary-activity" rows="2" style="width:100%; font-size:13px;" placeholder="Activities for this day">${escapeHtml(activities)}</textarea>
  `;
  container.appendChild(div);
}

function reindexItinerary() {
  document.querySelectorAll('#itinerary-list .itinerary-row').forEach((row, i) => {
    row.querySelector('.day-label').textContent = `Day ${i + 1}`;
  });
}

function bindPackageForm(id, initialItinerary = []) {
  const itineraryList = document.getElementById('itinerary-list');
  
  if (initialItinerary.length) {
    initialItinerary.forEach((item, index) => {
      renderItineraryItem(itineraryList, index + 1, item.activities || item);
    });
  }

  document.getElementById('add-itinerary-btn').addEventListener('click', () => {
    const currentDays = itineraryList.children.length;
    renderItineraryItem(itineraryList, currentDays + 1, '');
  });

  document.getElementById('package-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const itinerary = Array.from(itineraryList.children).map((row, i) => ({
      day: i + 1,
      activities: row.querySelector('.itinerary-activity').value.trim()
    })).filter(item => item.activities !== '');

    const body = {
      title: document.getElementById('p-title').value.trim(),
      destinationId: document.getElementById('p-destination').value || null,
      category: document.getElementById('p-category').value,
      departure: document.getElementById('p-departure').value.trim(),
      durationDays: Number(document.getElementById('p-duration').value),
      cost: Number(document.getElementById('p-price').value),
      servicesIncluded: document.getElementById('p-inc').value.split(',').map((s) => s.trim()).filter(Boolean),
      servicesNotIncluded: document.getElementById('p-exc').value.split(',').map((s) => s.trim()).filter(Boolean),
      itinerary: itinerary,
      imageUrl: document.getElementById('p-image').value.trim(),
      description: document.getElementById('p-desc').value.trim(),
      isActive: document.getElementById('p-active').checked,
    };

    try {
      await apiRequest(id ? `/admin/packages/${id}` : '/admin/packages', { method: id ? 'PUT' : 'POST', body });
      toast(id ? 'Package updated.' : 'Package added.');
      closeModal(); loadPackages();
    } catch (err) { toast(err.message, true); }
  });
}

async function deletePackage(id) {
  if (!confirm('Delete this package?')) return;
  try { await apiRequest(`/admin/packages/${id}`, { method: 'DELETE' }); toast('Package deleted.'); loadPackages(); }
  catch (err) { toast(err.message, true); }
}


// ============================================================
// Tours
// ============================================================
let toursCache = [];

async function loadTours() {
  try {
    const { tours } = await apiRequest('/admin/tours');
    toursCache = tours;
    const container = document.getElementById('tours-table');
    if (!tours.length) return (container.innerHTML = emptyState('No tours yet.'));

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
  const tagsStr = Array.isArray(t.destinationTags) ? t.destinationTags.join(', ') : '';

  return `
    <h3>${t.slug ? 'Edit tour' : 'Add tour'}</h3>
    <form id="tour-form">
      <div class="field"><label>Title</label><input id="t-title" value="${escapeHtml(t.title)}" required /></div>
      <div class="field-row">
        <div class="field"><label>Days</label><input type="number" min="1" id="t-days" value="${t.days || ''}" required /></div>
        <div class="field"><label>Nights</label><input type="number" min="0" id="t-nights" value="${t.nights || ''}" required /></div>
      </div>
      <div class="field"><label>Route</label><input id="t-route" value="${escapeHtml(t.route)}" placeholder="e.g. Mingora · Kalam · Ushu Forest" /></div>
      <div class="field-row">
        <div class="field"><label>Price (per head)</label><input type="number" min="0" id="t-price-head" value="${t.priceHead || ''}" required /></div>
        <div class="field"><label>Price (per couple)</label><input type="number" min="0" id="t-price-couple" value="${t.priceCouple || ''}" /></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Length group</label>
          <select id="t-length"><option value="short" ${t.lengthGroup === 'short' ? 'selected' : ''}>Short</option>
          <option value="medium" ${t.lengthGroup === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="long" ${t.lengthGroup === 'long' ? 'selected' : ''}>Long</option></select>
        </div>
        <div class="field"><label>Transport</label><input id="t-transport" value="${escapeHtml(t.transport)}" /></div>
      </div>
      <div class="field"><label>Departure</label><input id="t-departure" value="${escapeHtml(t.departure)}" /></div>
      <div class="field"><label>Includes (comma separated)</label><textarea id="t-includes" rows="2">${escapeHtml(incStr)}</textarea></div>
      <div class="field"><label>Excludes (comma separated)</label><textarea id="t-excludes" rows="2">${escapeHtml(excStr)}</textarea></div>
      <div class="field"><label>Destination tags (comma separated slugs)</label><input id="t-tags" value="${escapeHtml(tagsStr)}" /></div>
      <div class="field"><label>Image URL</label><input id="t-image" value="${escapeHtml(t.image)}" /></div>
      <div class="field-row">
        <label><input type="checkbox" id="t-featured" ${t.featured ? 'checked' : ''} style="width:auto; margin-right:6px;" />Featured</label>
        <label><input type="checkbox" id="t-active" ${t.active !== false ? 'checked' : ''} style="width:auto; margin-right:6px;" />Visible on site</label>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn">${t.slug ? 'Save changes' : 'Add tour'}</button>
      </div>
    </form>`;
}

document.getElementById('add-tour-btn').addEventListener('click', () => {
  openModal(tourForm({}));
  bindTourForm(null);
});
function editTour(slug) {
  const t = toursCache.find((x) => x.slug === slug);
  openModal(tourForm(t));
  bindTourForm(slug);
}
function bindTourForm(slug) {
  document.getElementById('tour-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
      title: document.getElementById('t-title').value.trim(),
      days: Number(document.getElementById('t-days').value),
      nights: Number(document.getElementById('t-nights').value),
      route: document.getElementById('t-route').value.trim(),
      priceHead: Number(document.getElementById('t-price-head').value),
      priceCouple: document.getElementById('t-price-couple').value ? Number(document.getElementById('t-price-couple').value) : null,
      lengthGroup: document.getElementById('t-length').value,
      transport: document.getElementById('t-transport').value.trim(),
      departure: document.getElementById('t-departure').value.trim(),
      includes: document.getElementById('t-includes').value.split(',').map((s) => s.trim()).filter(Boolean),
      excludes: document.getElementById('t-excludes').value.split(',').map((s) => s.trim()).filter(Boolean),
      destinationTags: document.getElementById('t-tags').value.split(',').map((s) => s.trim()).filter(Boolean),
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
// Gallery
// ============================================================
let galleryCache = [];

async function loadGallery() {
  try {
    if (!destinationsCache.length) await apiRequest('/admin/destinations').then((r) => (destinationsCache = r.destinations));
    const { items } = await apiRequest('/admin/gallery');
    galleryCache = items;
    const container = document.getElementById('gallery-table');
    if (!items.length) return (container.innerHTML = emptyState('No photos yet.'));

    container.innerHTML = renderTable(['Destination', 'Badge', 'Tall', 'Order', 'Active', ''], items.map((g) => [
      escapeHtml(g.destinationSlug || g.destination_slug), escapeHtml(g.badge || '—'),
      g.tall ? 'Yes' : 'No', g.order ?? '—',
      g.active ? '<span class="badge badge-approved">Active</span>' : '<span class="badge badge-cancelled">Hidden</span>',
      `<div class="row-actions">
         <button class="btn btn-ghost btn-sm" onclick="editGalleryItem('${g.id}')">Edit</button>
         <button class="btn btn-danger btn-sm" onclick="deleteGalleryItem('${g.id}')">Delete</button>
       </div>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

function galleryForm(g = {}) {
  // Gallery items store a destination SLUG (g.destinationSlug), not an id —
  // look up the matching destination by slug so the dropdown can preselect it.
  const matchedDest = g.destinationSlug
    ? destinationsCache.find((d) => d.slug === g.destinationSlug)
    : null;
  return `
    <h3>${g.id ? 'Edit photo' : 'Add photo'}</h3>
    <form id="gallery-form">
      <div class="field"><label>Destination</label><select id="g-dest">${destinationOptions(matchedDest ? matchedDest.id : null)}</select></div>
      <div class="field">
        <label>Photo</label>
        <input type="file" id="g-image-file" accept="image/*" />
        <input type="hidden" id="g-image" value="${escapeHtml(g.imageUrl)}" />
        <div id="g-image-status" style="font-size:12px;color:var(--muted,#888);margin-top:4px;"></div>
        <div id="g-image-preview" style="margin-top:8px;">
          ${g.imageUrl ? `<img src="${escapeHtml(g.imageUrl)}" style="max-width:140px;border-radius:8px;display:block;" />` : ''}
        </div>
      </div>
      <div class="field"><label>Badge (optional)</label><input id="g-badge" value="${escapeHtml(g.badge)}" /></div>
      <div class="field-row">
        <div class="field"><label>Order</label><input type="number" id="g-order" value="${g.order || 0}" /></div>
        <label style="align-self:center;"><input type="checkbox" id="g-tall" ${g.tall ? 'checked' : ''} style="width:auto; margin-right:6px;" />Tall image</label>
      </div>
      <div class="field">
        <label><input type="checkbox" id="g-active" ${g.active !== false ? 'checked' : ''} style="width:auto; margin-right:6px;" />Visible on site</label>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn">${g.id ? 'Save changes' : 'Add photo'}</button>
      </div>
    </form>`;
}

document.getElementById('add-gallery-btn').addEventListener('click', () => {
  openModal(galleryForm({}));
  bindGalleryForm(null);
});
function editGalleryItem(id) {
  const g = galleryCache.find((x) => x.id === id);
  openModal(galleryForm(g));
  bindGalleryForm(id);
}
function bindGalleryForm(id) {
  const fileInput = document.getElementById('g-image-file');
  const hiddenUrl = document.getElementById('g-image');
  const statusEl = document.getElementById('g-image-status');
  const previewEl = document.getElementById('g-image-preview');

  // As soon as a file is picked, upload it right away and store the
  // returned URL in the hidden field — the form submit below just
  // reads that value, same as when a URL was typed in manually.
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    statusEl.textContent = 'Uploading…';
    try {
      const url = await uploadImage(file);
      hiddenUrl.value = url;
      previewEl.innerHTML = `<img src="${url}" style="max-width:140px;border-radius:8px;display:block;" />`;
      statusEl.textContent = 'Uploaded ✓';
    } catch (err) {
      statusEl.textContent = '';
      toast(err.message, true);
    }
  });

  document.getElementById('gallery-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const destId = document.getElementById('g-dest').value;
    const dest = destinationsCache.find((d) => d.id === destId);
    const imageUrl = hiddenUrl.value.trim();
    if (!imageUrl) return toast('Please choose a photo to upload.', true);
    const body = {
      destinationSlug: dest ? dest.slug : '',
      imageUrl: imageUrl,
      badge: document.getElementById('g-badge').value.trim(),
      order: Number(document.getElementById('g-order').value) || 0,
      tall: document.getElementById('g-tall').checked,
      active: document.getElementById('g-active').checked,
    };
    try {
      await apiRequest(id ? `/admin/gallery/${id}` : '/admin/gallery', { method: id ? 'PUT' : 'POST', body });
      toast(id ? 'Photo updated.' : 'Photo added.');
      closeModal(); loadGallery();
    } catch (err) { toast(err.message, true); }
  });
}
async function deleteGalleryItem(id) {
  if (!confirm('Delete this photo?')) return;
  try { await apiRequest(`/admin/gallery/${id}`, { method: 'DELETE' }); toast('Photo deleted.'); loadGallery(); }
  catch (err) { toast(err.message, true); }
}

// ============================================================
// Bookings
// ============================================================
async function loadBookings() {
  try {
    const { bookings } = await apiRequest('/admin/bookings');
    const container = document.getElementById('bookings-table');
    if (!bookings.length) return (container.innerHTML = emptyState('No trip requests yet.'));

    container.innerHTML = renderTable(['Name', 'Contact', 'Trip', 'Travelers', 'Status', 'Submitted', ''], bookings.map((b) => [
      escapeHtml(b.name),
      `${escapeHtml(b.email)}${b.phone ? '<br>' + escapeHtml(b.phone) : ''}`,
      escapeHtml(b.packages?.title || b.destination || '—'),
      b.numTravelers ?? '—',
      statusSelect('bookings', b.id, b.status, ['pending', 'confirmed', 'cancelled']),
      fmtDate(b.createdAt),
      `<button class="btn btn-danger btn-sm" onclick="deleteRow('bookings', '${b.id}')">Delete</button>`,
    ]));
  } catch (err) { toast(err.message, true); }
}

function statusSelect(resource, id, current, options) {
  const selectId = `status-${resource}-${id}`;
  return `<select id="${selectId}" class="badge" style="border:1px solid var(--line);" onchange="updateStatus('${resource}', '${id}', this.value)">
    ${options.map((o) => `<option value="${o}" ${o === current ? 'selected' : ''}>${o}</option>`).join('')}
  </select>`;
}
async function updateStatus(resource, id, status) {
  try {
    await apiRequest(`/admin/${resource}/${id}`, { method: 'PATCH', body: { status } });
    toast('Status updated.');
    if (resource === 'bookings') loadBookings(); else loadContact();
  } catch (err) { toast(err.message, true); }
}
async function deleteRow(resource, id) {
  if (!confirm('Delete this entry?')) return;
  try {
    await apiRequest(`/admin/${resource}/${id}`, { method: 'DELETE' });
    toast('Deleted.');
    ({ bookings: loadBookings, feedback: loadFeedback, contact: loadContact }[resource])();
  } catch (err) { toast(err.message, true); }
}

// ============================================================
// Feedback
// ============================================================
async function loadFeedback() {
  try {
    const { feedback } = await apiRequest('/admin/feedback');
    const container = document.getElementById('feedback-table');
    if (!feedback.length) return (container.innerHTML = emptyState('No feedback submitted yet.'));

    container.innerHTML = renderTable(['Name', 'Rating', 'Message', 'Published', 'Submitted', ''], feedback.map((f) => [
      escapeHtml(f.name), f.rating ? '★'.repeat(f.rating) : '—',
      `<div style="max-width:320px;">${escapeHtml(f.message)}</div>`,
      `<label><input type="checkbox" ${f.approved ? 'checked' : ''} onchange="toggleApproval('${f.id}', this.checked)" style="width:auto;" /></label>`,
      fmtDate(f.createdAt),
      `<button class="btn btn-danger btn-sm" onclick="deleteRow('feedback', '${f.id}')">Delete</button>`,
    ]));
  } catch (err) { toast(err.message, true); }
}
async function toggleApproval(id, approved) {
  try { await apiRequest(`/admin/feedback/${id}`, { method: 'PATCH', body: { approved } }); toast(approved ? 'Published as testimonial.' : 'Unpublished.'); }
  catch (err) { toast(err.message, true); loadFeedback(); }
}

// ============================================================
// Contact
// ============================================================
async function loadContact() {
  try {
    const { messages } = await apiRequest('/admin/contact');
    const container = document.getElementById('contact-table');
    if (!messages.length) return (container.innerHTML = emptyState('No messages yet.'));

    container.innerHTML = renderTable(['Name', 'Email', 'Subject', 'Message', 'Status', 'Submitted', ''], messages.map((m) => [
      escapeHtml(m.name), escapeHtml(m.email), escapeHtml(m.subject || '—'),
      `<div style="max-width:280px;">${escapeHtml(m.message)}</div>`,
      statusSelect('contact', m.id, m.status, ['new', 'read', 'replied']),
      fmtDate(m.createdAt),
      `<button class="btn btn-danger btn-sm" onclick="deleteRow('contact', '${m.id}')">Delete</button>`,
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