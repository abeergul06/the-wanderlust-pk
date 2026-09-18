// ==========================================================================
// tours-page.js — The Wanderlust.pk
// Listing page: search, filters, sort, pagination and the tour modal.
// Requires tours-data.js to be loaded first (provides TOURS, tourImage,
// WHATSAPP_NUMBER, PAGE_SIZE).
// ==========================================================================

let state = {
  search: "",
  maxPrice: 70000,
  length: new Set(),
  dests: new Set(),
  sort: "latest",
  page: 1
};

function formatPKR(n) { return "Rs " + n.toLocaleString("en-PK"); }

// The tours table has no length_group column, so this is computed here
// instead of trusting a t.lengthGroup field from the API (which is always
// undefined) — that mismatch is why the duration filter checkboxes never
// matched anything.
function lengthGroup(days) {
  if (days <= 4) return 'short';
  if (days <= 7) return 'medium';
  return 'long';
}

// Some tours may have priceHead unset but a nested cost breakdown instead —
// fall back through the shapes so filtering/sorting/display always has a
// usable number instead of silently showing/sorting on 0.
function getTourPrice(t) {
  if (t.priceHead) return t.priceHead;
  if (t.price) return t.price;
  if (t.cost) {
    if (t.cost.fromKarachi?.economyTrain?.perHead) return t.cost.fromKarachi.economyTrain.perHead;
    if (t.cost.fromIslamabad?.withoutStay?.perHead) return t.cost.fromIslamabad.withoutStay.perHead;
  }
  return 0;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById('tourListingGrid');
  if (!grid) return;

  if (typeof TOURS === "undefined") {
    grid.innerHTML = "<h2 style='color:red'>Error: tours-data.js not loaded properly</h2>";
    return;
  }

  const count = document.getElementById('resultsCount');
  const search = document.getElementById('tourSearch');
  const sort = document.getElementById('tourSort');
  const priceRange = document.getElementById('priceRange');
  const priceLabel = document.getElementById('priceRangeLabel');
  const durationList = document.getElementById('durationFilterList');
  const destList = document.getElementById('destFilterList');
  const clearBtn = document.getElementById('clearFilters');
  const pagination = document.getElementById('pagination');

  // Build filters
  function buildFilters() {
    const durations = [...new Set(TOURS.map(t => lengthGroup(t.days)))];
    const destinations = ["Swat", "Kashmir", "Naran", "Skardu", "Hunza", "Kumrat", "Astore", "Neelam"];

    if (durationList) {
      durationList.innerHTML = durations.map(d => `
        <label><input type="checkbox" class="lengthCheck" value="${d}">
        ${d === 'short' ? 'Short 1-4 Days' : d === 'medium' ? 'Medium 5-7 Days' : 'Long 7+ Days'}</label>
      `).join('');
    }

    if (destList) {
      destList.innerHTML = destinations.map(d => `
        <label><input type="checkbox" class="destCheck" value="${d}"> ${d}</label>
      `).join('');
    }
  }

  function render() {
    if (priceRange) state.maxPrice = Number(priceRange.value);
    if (priceLabel) priceLabel.textContent = formatPKR(state.maxPrice);

    let filtered = TOURS.filter(t => {
      const matchesSearch = !state.search ||
        t.title.toLowerCase().includes(state.search) ||
        t.route.toLowerCase().includes(state.search);
      const matchesPrice = getTourPrice(t) <= state.maxPrice;
      const matchesLength = state.length.size === 0 || state.length.has(lengthGroup(t.days));
      const matchesDest = state.dests.size === 0 || [...state.dests].some(dest =>
        t.title.toLowerCase().includes(dest.toLowerCase()) ||
        t.route.toLowerCase().includes(dest.toLowerCase())
      );
      return matchesSearch && matchesPrice && matchesLength && matchesDest;
    });

    if (state.sort === "price-asc") filtered.sort((a, b) => getTourPrice(a) - getTourPrice(b));
    if (state.sort === "price-desc") filtered.sort((a, b) => getTourPrice(b) - getTourPrice(a));
    if (state.sort === "duration-asc") filtered.sort((a, b) => a.days - b.days);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    grid.innerHTML = "";
    if (pageItems.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:#aaa;">No tours found. Click "Clear All Filters"</div>`;
    } else {
      pageItems.forEach((t, i) => {
        const num = String(start + i + 1).padStart(2, '0');
        grid.innerHTML += `
          <div class="tl-card">
            <div class="tl-photo">
              <span class="tl-badge">${t.days}D ${t.nights}N</span>
              <img src="${tourImage(t)}" alt="${t.title}">
            </div>
            <div class="tl-body">
              <div class="tl-index">Tour ${num}</div>
              <h4>${t.title}</h4>
              <div class="tl-loc">📍 ${t.route.split('·')[0].trim()}</div>
              <p class="tl-desc">${t.route.substring(0, 90)}...</p>
              <div class="tl-footer">
                <div class="tl-price">${formatPKR(getTourPrice(t))}<span>Per Person</span></div>
                <button class="tl-view-btn" onclick="openTourModal('${t.id}')">View Details</button>
              </div>
            </div>
          </div>
        `;
      });
    }

    const end = Math.min(start + PAGE_SIZE, filtered.length);
    if (count) count.textContent = `Showing ${filtered.length > 0 ? start + 1 : 0}-${end} of ${filtered.length} tours`;
    renderPagination(totalPages);
  }

  function renderPagination(total) {
    if (!pagination) return;
    pagination.innerHTML = '';
    if (total <= 1) return;

    pagination.innerHTML += `<button class="page-arrow" aria-label="Previous page" ${state.page === 1 ? 'disabled' : ''} onclick="goPage(${state.page - 1})">‹</button>`;

    for (let i = 1; i <= total; i++) {
      pagination.innerHTML += `<button class="${i === state.page ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
    }

    pagination.innerHTML += `<button class="page-arrow" aria-label="Next page" ${state.page === total ? 'disabled' : ''} onclick="goPage(${state.page + 1})">›</button>`;
  }

  

  window.goPage = (p) => {
    state.page = Math.max(p, 1);
    render();
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // MODAL
  window.openTourModal = (id) => {
    const t = TOURS.find(x => x.id === id);
    if (!t) return;

    const modal = document.getElementById('tourModal');
    if (modal) modal.classList.add('show');

    const modalImg = document.getElementById('tourModalImg');
    if (modalImg) modalImg.src = tourImage(t);

    const modalDays = document.getElementById('tourModalDays');
    if (modalDays) modalDays.textContent = `${t.days} Days / ${t.nights} Nights`;

    const modalTitle = document.getElementById('tourModalTitle');
    if (modalTitle) modalTitle.textContent = t.title;

    const modalDesc = document.getElementById('tourModalDesc');
    if (modalDesc) modalDesc.textContent = `Route: ${t.route}`;

    const modalDeparture = document.getElementById('modalDeparture');
    if (modalDeparture) modalDeparture.textContent = t.departure || 'Islamabad / Rawalpindi';

    const modalPrice = document.getElementById('tourModalPrice');
    if (modalPrice) {
      // Both prices share one element — the old code wrote the per-person
      // price here and then immediately overwrote it with the couple price
      // using the same id, so the per-person price never actually showed.
      const headText = `${formatPKR(getTourPrice(t))} / Per Person`;
      const coupleText = t.priceCouple ? ` · ${formatPKR(t.priceCouple)} / Couple` : '';
      modalPrice.textContent = headText + coupleText;
    }

    // Itinerary — stored as one free-text paragraph (the DB column is
    // plain text). Older tours saved before this change may still have
    // the array-of-days shape, so that's still supported here.
    const modalItinerary = document.getElementById('modalItinerary');
    if (modalItinerary) {
      if (typeof t.itinerary === 'string' && t.itinerary.trim()) {
        modalItinerary.style.whiteSpace = 'pre-line';
        modalItinerary.textContent = t.itinerary.trim();
      } else if (Array.isArray(t.itinerary) && t.itinerary.length) {
        modalItinerary.innerHTML = t.itinerary.map(d => `<div><b>Day ${d.day}:</b> ${d.text}</div>`).join('');
      } else {
        modalItinerary.textContent = '';
      }
    }

    const modalIncludes = document.getElementById('modalIncludes');
    if (modalIncludes) modalIncludes.innerHTML = (t.includes || []).map(i => `<li>✓ ${i}</li>`).join('');

    const modalExcluded = document.getElementById('modalExcluded');
    if (modalExcluded) modalExcluded.innerHTML = (t.excludes || []).map(i => `<li>✕ ${i}</li>`).join('');

    // Cost Breakdown — free-text block set in the admin dashboard. The API
    // returns this under the key "cost" (not "costBreakdown"), matching
    // the "Cost breakdown (free text, shown on tour page)" admin field.
    const costBreakdownSection = document.getElementById('modalCostBreakdownSection');
    const modalCostBreakdown = document.getElementById('modalCostBreakdown');
    if (costBreakdownSection) {
      if (typeof t.cost === 'string' && t.cost.trim()) {
        costBreakdownSection.style.display = '';
        if (modalCostBreakdown) modalCostBreakdown.textContent = t.cost.trim();
      } else {
        costBreakdownSection.style.display = 'none';
      }
    }

    const paymentSection = document.getElementById('modalPaymentSection');
    const modalPaymentPolicy = document.getElementById('modalPaymentPolicy');
    const modalPaymentMethods = document.getElementById('modalPaymentMethods');
    if (paymentSection) {
      if (typeof t.payment === 'string' && t.payment.trim()) {
        paymentSection.style.display = '';
        if (modalPaymentPolicy) {
          modalPaymentPolicy.style.whiteSpace = 'pre-line';
          modalPaymentPolicy.textContent = t.payment.trim();
        }
        if (modalPaymentMethods) modalPaymentMethods.innerHTML = '';
      } else if (t.payment && typeof t.payment === 'object') {
        paymentSection.style.display = '';
        if (modalPaymentPolicy) modalPaymentPolicy.textContent = t.payment.policy || '';
        if (modalPaymentMethods) {
          modalPaymentMethods.innerHTML = (t.payment.methods || []).map(m => `
            <div class="modal-payment-card">
              <div class="method-label">${m.label}</div>
              <div class="method-name">${m.accountName}</div>
              <div class="method-number">${m.accountNumber}</div>
            </div>
          `).join('') + (t.payment.verificationContact
            ? `<div class="modal-payment-verify">Verification contact: ${t.payment.verificationContact}</div>`
            : '');
        }
      } else {
        paymentSection.style.display = 'none';
      }
    }

    const bookWA = document.getElementById('bookWhatsApp');
    if (bookWA) bookWA.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I want to book: ' + t.title)}`;
  };

  const modalCloseBtn = document.getElementById('tourModalClose');
  if (modalCloseBtn) {
    modalCloseBtn.onclick = () => {
      const modal = document.getElementById('tourModal');
      if (modal) modal.classList.remove('show');
    };
  }

  const modal = document.getElementById('tourModal');
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal) modal.classList.remove('show');
  });

  // VIEW TOGGLE (grid / list)
  const viewToggle = document.getElementById('viewToggle');
  if (viewToggle) {
    viewToggle.addEventListener('click', e => {
      const btn = e.target.closest('button[data-view]');
      if (!btn) return;
      viewToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      grid.classList.toggle('list-view', btn.dataset.view === 'list');
    });
  }

  // EVENTS
  if (search) search.addEventListener('input', e => { state.search = e.target.value.toLowerCase(); state.page = 1; render(); });
  if (sort) sort.addEventListener('change', e => { state.sort = e.target.value; render(); });
  if (priceRange) priceRange.addEventListener('input', () => { state.page = 1; render(); });

  document.addEventListener('change', e => {
    if (e.target.classList.contains('lengthCheck')) {
      e.target.checked ? state.length.add(e.target.value) : state.length.delete(e.target.value);
      state.page = 1; render();
    }
    if (e.target.classList.contains('destCheck')) {
      e.target.checked ? state.dests.add(e.target.value) : state.dests.delete(e.target.value);
      state.page = 1; render();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state = { search: "", maxPrice: 70000, length: new Set(), dests: new Set(), sort: "latest", page: 1 };
      if (search) search.value = "";
      if (sort) sort.value = "latest";
      if (priceRange) priceRange.value = 70000;
      document.querySelectorAll('.lengthCheck, .destCheck').forEach(cb => cb.checked = false);
      render();
    });
  }

  buildFilters();
  render();
});