// ==========================================================================
// admin.js — The Wanderlust.pk Admin Dashboard
// ==========================================================================

// ---------- guard ----------
if (!Auth.getToken()) {
  window.location.href = './login.html';
  throw new Error('Not authenticated');
}

const admin = Auth.getAdmin();

const whoEl = document.getElementById('who');
if (whoEl) {
  whoEl.textContent = admin ? (admin.name || admin.email) : '';
}

const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    Auth.clearSession();
    window.location.href = './login.html';
  });
}


// ==========================================================================
// NAVIGATION
// ==========================================================================

const views = [
  'overview',
  'destinations',
  'feedback',
  'contact',
  'tours',
  'gallery'
];

document.querySelectorAll('.nav-item[data-view]').forEach((btn) => {
  btn.addEventListener('click', () => {
    showView(btn.dataset.view);
  });
});

function showView(name) {

  views.forEach((view) => {

    const el = document.getElementById(`view-${view}`);

    if (el) {
      el.classList.toggle('hidden', view !== name);
    }

  });

  document.querySelectorAll('.nav-item[data-view]').forEach((btn) => {

    btn.classList.toggle(
      'active',
      btn.dataset.view === name
    );

  });

  if (loaders[name]) {
    loaders[name]();
  }
}


// ==========================================================================
// TOAST
// ==========================================================================

function toast(message, isError = false) {

  const el = document.getElementById('toast');

  if (!el) return;

  el.textContent = message;

  el.classList.toggle('error', isError);

  el.classList.add('show');

  setTimeout(() => {
    el.classList.remove('show');
  }, 2600);
}


// ==========================================================================
// MODAL
// ==========================================================================

const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

function modalHeader(title) {

  return `
    <div class="modal-header">
      <h2 id="modal-title">${escapeHtml(title)}</h2>

      <button
        type="button"
        class="modal-close"
        id="modal-close-btn"
      >
        &times;
      </button>
    </div>
  `;
}


function openModal(html) {

  if (!overlay || !modalContent) return;

  modalContent.innerHTML = html;

  overlay.classList.remove('hidden');
  overlay.classList.add('show');
}


function closeModal() {

  if (!overlay || !modalContent) return;

  overlay.classList.remove('show');
  overlay.classList.add('hidden');

  modalContent.innerHTML = '';
}


// Close modal by:
// 1. Clicking backdrop
// 2. Clicking X
// 3. Clicking Cancel

if (overlay) {

  overlay.addEventListener('click', (e) => {

    if (
      e.target === overlay ||
      e.target.closest('#modal-close-btn') ||
      e.target.closest('#modal-cancel-btn')
    ) {
      closeModal();
    }

  });

}


document.addEventListener('keydown', (e) => {

  if (
    e.key === 'Escape' &&
    overlay &&
    overlay.classList.contains('show')
  ) {
    closeModal();
  }

});


// ==========================================================================
// HELPERS
// ==========================================================================

function escapeHtml(str) {

  return String(str ?? '').replace(
    /[&<>"']/g,
    (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c])
  );

}


function fmtDate(d) {

  return d
    ? new Date(d).toLocaleDateString(
        undefined,
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      )
    : '—';

}


function fmtMoney(n) {

  return n == null
    ? '—'
    : `Rs. ${Number(n).toLocaleString()}`;

}


function renderTable(headers, rows) {

  return `
    <table>

      <thead>
        <tr>
          ${headers
            .map((h) => `<th>${escapeHtml(h)}</th>`)
            .join('')}
        </tr>
      </thead>

      <tbody>
        ${
          rows.length
            ? rows
                .map(
                  (row) => `
                    <tr>
                      ${row
                        .map((cell) => `<td>${cell}</td>`)
                        .join('')}
                    </tr>
                  `
                )
                .join('')
            : ''
        }
      </tbody>

    </table>
  `;

}


function emptyState(msg) {

  return `
    <div class="empty-state">
      ${escapeHtml(msg)}
    </div>
  `;

}


function statusBadge(status) {

  return `
    <span class="badge badge-${escapeHtml(status)}">
      ${escapeHtml(status)}
    </span>
  `;

}


function activeBadge(isActive) {

  return isActive !== false
    ? '<span class="badge badge-approved">Active</span>'
    : '<span class="badge badge-cancelled">Hidden</span>';

}


// ==========================================================================
// TOUR ITINERARY
// ==========================================================================

let tourDayCount = 0;


function addTourDayField(day = {}) {

  tourDayCount++;

  const container = document.getElementById(
    'tour-itinerary-container'
  );

  if (!container) return;


  const div = document.createElement('div');

  div.className =
    'border p-3 rounded bg-gray-50 tour-day-card';


  div.innerHTML = `

    <div
      style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:8px;
      "
    >

      <label class="font-semibold">
        Day ${tourDayCount}
      </label>

      <button
        type="button"
        class="tour-day-remove text-red-500 text-xs"
      >
        Remove
      </button>

    </div>


    <input
      type="text"
      placeholder="Day Title: e.g. Islamabad to Naran"
      value="${escapeHtml(day.title || '')}"
      class="tour-day-title w-full border rounded p-2 mb-2"
      required
    />


    <textarea
      placeholder="Day description"
      class="tour-day-desc w-full border rounded p-2"
      rows="3"
      required
    >${escapeHtml(day.description || '')}</textarea>

  `;


  const removeBtn =
    div.querySelector('.tour-day-remove');


  if (removeBtn) {

    removeBtn.addEventListener('click', () => {

      div.remove();

      renumberTourDays();

    });

  }


  container.appendChild(div);

}


function renumberTourDays() {

  const cards = document.querySelectorAll(
    '#tour-itinerary-container .tour-day-card'
  );

  cards.forEach((card, index) => {

    const label = card.querySelector('label');

    if (label) {
      label.textContent = `Day ${index + 1}`;
    }

  });

  tourDayCount = cards.length;

}


// ==========================================================================
// OVERVIEW
// ==========================================================================

async function loadOverview() {

  try {

    const stats =
      await apiRequest('/admin/stats');


    const statGrid =
      document.getElementById('stat-grid');


    if (statGrid) {

      statGrid.innerHTML = [

        ['Destinations', stats.destinations],

        ['Tours', stats.tours],

        ['Gallery photos', stats.gallery],

        ['Feedback received', stats.feedback],

        ['Unread messages', stats.unreadContact]

      ]

        .map(
          ([label, num]) => `
            <div class="stat-card">

              <div class="num">
                ${num}
              </div>

              <div class="label">
                ${escapeHtml(label)}
              </div>

            </div>
          `
        )
        .join('');

    }


    const contactCount =
      document.getElementById(
        'nav-count-contact'
      );


    if (contactCount) {

      contactCount.textContent =
        stats.unreadContact || '';

      contactCount.classList.toggle(
        'hidden',
        !stats.unreadContact
      );

    }


  } catch (err) {

    toast(err.message, true);

  }

}


// ==========================================================================
// DESTINATIONS
// ==========================================================================

let destinationsCache = [];


async function loadDestinations() {

  try {

    const { destinations } =
      await apiRequest(
        '/admin/destinations'
      );


    destinationsCache = destinations || [];


    const container =
      document.getElementById(
        'destinations-table'
      );


    if (!container) return;


    if (!destinationsCache.length) {

      container.innerHTML =
        emptyState(
          'No destinations yet.'
        );

      return;

    }


    container.innerHTML = renderTable(

      [
        'Name',
        'Slug',
        'Order',
        'Active',
        ''
      ],

      destinationsCache.map((d) => [

        escapeHtml(d.name),

        escapeHtml(d.slug),

        d.order ?? '—',

        activeBadge(d.active),

        `
          <div class="row-actions">

            <button
              class="btn btn-ghost btn-sm"
              onclick="editDestination('${escapeHtml(d.id)}')"
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick="deleteDestination('${escapeHtml(d.id)}')"
            >
              Delete
            </button>

          </div>
        `

      ])

    );

  } catch (err) {

    toast(err.message, true);

  }

}


// --------------------------------------------------------------------------
// Destination Form
// Fields:
// slug
// name
// tagline
// order
// image_url
// route
// history
// points
// todo
// active
// --------------------------------------------------------------------------

function destinationForm(d = {}) {

  const points =
    Array.isArray(d.points)
      ? d.points.join(', ')
      : '';

  const todo =
    Array.isArray(d.todo)
      ? d.todo.join(', ')
      : '';


  return `

    ${modalHeader(
      d.id
        ? 'Edit destination'
        : 'Add destination'
    )}


    <form
      id="destination-form"
      class="modal-body"
    >

      <!-- SLUG -->

      <div class="form-group">

        <label for="dest-slug">
          Slug
        </label>

        <input
          type="text"
          id="dest-slug"
          value="${escapeHtml(d.slug)}"
          required
          placeholder="e.g. hunza-valley"
        />

      </div>


      <!-- NAME -->

      <div class="form-group">

        <label for="dest-name">
          Name
        </label>

        <input
          type="text"
          id="dest-name"
          value="${escapeHtml(d.name)}"
          required
          placeholder="e.g. Hunza Valley"
        />

      </div>


      <!-- TAGLINE -->

      <div class="form-group">

        <label for="dest-tagline">
          Tagline
        </label>

        <input
          type="text"
          id="dest-tagline"
          value="${escapeHtml(d.tagline)}"
          placeholder="e.g. Switzerland of Pakistan"
        />

      </div>


      <!-- ORDER + IMAGE -->

      <div
        class="form-row"
        style="display:flex; gap:12px;"
      >

        <div
          class="form-group"
          style="flex:1;"
        >

          <label for="dest-order">
            Order
          </label>

          <input
            type="number"
            id="dest-order"
            min="0"
            value="${d.order ?? ''}"
            placeholder="1"
          />

        </div>


        <div
          class="form-group"
          style="flex:2;"
        >

          <label for="dest-image-url">
            Image URL
          </label>

          <input
            type="text"
            id="dest-image-url"
            value="${escapeHtml(d.image_url)}"
            placeholder="https://..."
          />

        </div>

      </div>


      <!-- ROUTE -->

      <div class="form-group">

        <label for="dest-route">
          Route
        </label>

        <input
          type="text"
          id="dest-route"
          value="${escapeHtml(d.route)}"
          placeholder="e.g. Islamabad - Naran - Hunza"
        />

      </div>


      <!-- HISTORY -->

      <div class="form-group">

        <label for="dest-history">
          History
        </label>

        <textarea
          id="dest-history"
          rows="4"
          placeholder="Background / history of the destination"
        >${escapeHtml(d.history)}</textarea>

      </div>


      <!-- POINTS -->

      <div class="form-group">

        <label for="dest-points">
          Key Points
        </label>

        <input
          type="text"
          id="dest-points"
          value="${escapeHtml(points)}"
          placeholder="Scenic lakes, Hiking trails, Local cuisine"
        />

        <small>
          Separate multiple points with commas.
        </small>

      </div>


      <!-- TODO -->

      <div class="form-group">

        <label for="dest-todo">
          Things To Do
        </label>

        <input
          type="text"
          id="dest-todo"
          value="${escapeHtml(todo)}"
          placeholder="Boating, Trekking, Photography"
        />

        <small>
          Separate multiple activities with commas.
        </small>

      </div>


      <!-- ACTIVE -->

      <label
        style="
          display:flex;
          align-items:center;
          gap:6px;
        "
      >

        <input
          type="checkbox"
          id="dest-active"
          style="width:auto;"
          ${d.active !== false ? 'checked' : ''}
        />

        Visible on site

      </label>


      <!-- ACTIONS -->

      <div
        class="modal-actions"
        style="
          display:flex;
          justify-content:flex-end;
          gap:10px;
          margin-top:20px;
        "
      >

        <button
          type="button"
          class="btn btn-ghost"
          id="modal-cancel-btn"
        >
          Cancel
        </button>


        <button
          type="submit"
          class="btn"
        >
          ${d.id ? 'Save changes' : 'Add destination'}
        </button>

      </div>

    </form>

  `;

}


function bindDestinationForm(id) {

  const form =
    document.getElementById(
      'destination-form'
    );


  if (!form) return;


  form.addEventListener(
    'submit',
    async (e) => {

      e.preventDefault();


      const body = {

        slug:
          document
            .getElementById('dest-slug')
            .value
            .trim(),

        name:
          document
            .getElementById('dest-name')
            .value
            .trim(),

        tagline:
          document
            .getElementById('dest-tagline')
            .value
            .trim(),

        order:
          document
            .getElementById('dest-order')
            .value
            ? Number(
                document
                  .getElementById('dest-order')
                  .value
              )
            : null,

        image_url:
          document
            .getElementById('dest-image-url')
            .value
            .trim(),

        route:
          document
            .getElementById('dest-route')
            .value
            .trim(),

        history:
          document
            .getElementById('dest-history')
            .value
            .trim(),

        points:
          document
            .getElementById('dest-points')
            .value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),

        todo:
          document
            .getElementById('dest-todo')
            .value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),

        active:
          document
            .getElementById('dest-active')
            .checked

      };


      try {

        await apiRequest(

          id
            ? `/admin/destinations/${id}`
            : '/admin/destinations',

          {
            method: id
              ? 'PUT'
              : 'POST',

            body
          }

        );


        toast(
          id
            ? 'Destination updated.'
            : 'Destination added.'
        );


        closeModal();

        loadDestinations();


      } catch (err) {

        toast(
          err.message,
          true
        );

      }

    }
  );

}


// Add Destination

const addDestinationBtn =
  document.getElementById(
    'add-destination-btn'
  );


if (addDestinationBtn) {

  addDestinationBtn.addEventListener(
    'click',
    () => {

      openModal(
        destinationForm({})
      );

      bindDestinationForm(null);

    }
  );

}


function editDestination(id) {

  const d =
    destinationsCache.find(
      (x) =>
        String(x.id) ===
        String(id)
    );


  if (!d) {

    toast(
      'Destination not found.',
      true
    );

    return;

  }


  openModal(
    destinationForm(d)
  );

  bindDestinationForm(
    d.id
  );

}


async function deleteDestination(id) {

  if (
    !confirm(
      'Delete this destination?'
    )
  ) {
    return;
  }


  try {

    await apiRequest(
      `/admin/destinations/${id}`,
      {
        method: 'DELETE'
      }
    );


    toast(
      'Destination deleted.'
    );

    loadDestinations();


  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


// ==========================================================================
// TOURS
// ==========================================================================

let toursCache = [];


async function loadTours() {

  try {

    const { tours } =
      await apiRequest(
        '/admin/tours'
      );


    toursCache = tours || [];


    const container =
      document.getElementById(
        'tours-table'
      );


    if (!container) return;


    if (!toursCache.length) {

      container.innerHTML =
        emptyState(
          'No tours yet. Click "Add tour" to create one.'
        );

      return;

    }


    container.innerHTML = renderTable(

      [
        'Title',
        'Days',
        'Route',
        'Price (Head)',
        'Featured',
        'Active',
        ''
      ],

      toursCache.map((t) => [

        escapeHtml(t.title),

        `${t.days || 0}D / ${t.nights || 0}N`,

        escapeHtml(
          t.route || '—'
        ),

        fmtMoney(
          t.priceHead
        ),

        t.featured
          ? '<span class="badge badge-approved">Featured</span>'
          : '<span class="badge badge-pending">No</span>',

        activeBadge(
          t.active
        ),

        `
          <div class="row-actions">

            <button
              class="btn btn-ghost btn-sm"
              onclick="editTour('${escapeHtml(t.slug || t.id)}')"
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick="deleteTour('${escapeHtml(t.slug || t.id)}')"
            >
              Delete
            </button>

          </div>
        `

      ])

    );

  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


// --------------------------------------------------------------------------
// Tour Form
//
// Fields:
// title
// days
// nights
// route
// priceHead
// priceCouple
// departure
// itinerary
// include
// exclude
// payment
// costBreakdown
// featured
// active
// --------------------------------------------------------------------------

function tourForm(t = {}) {

  const includeText =
    Array.isArray(t.include)
      ? t.include.join(', ')
      : Array.isArray(t.includes)
        ? t.includes.join(', ')
        : (t.include || t.includes || '');


  const excludeText =
    Array.isArray(t.exclude)
      ? t.exclude.join(', ')
      : Array.isArray(t.excludes)
        ? t.excludes.join(', ')
        : (t.exclude || t.excludes || '');


  return `

    ${modalHeader(
      t.slug
        ? 'Edit tour'
        : 'Add tour'
    )}


    <form
      id="tour-form"
      class="modal-body"
    >


      <!-- TITLE -->

      <div class="field">

        <label for="t-title">
          Title
        </label>

        <input
          type="text"
          id="t-title"
          value="${escapeHtml(t.title)}"
          required
          placeholder="e.g. 4 Days Special Tour to Naran & Shogran"
        />

      </div>


      <!-- DAYS + NIGHTS -->

      <div
        class="field-row"
        style="display:flex; gap:12px;"
      >

        <div
          class="field"
          style="flex:1;"
        >

          <label for="t-days">
            Days
          </label>

          <input
            type="number"
            min="1"
            id="t-days"
            value="${t.days ?? ''}"
            required
          />

        </div>


        <div
          class="field"
          style="flex:1;"
        >

          <label for="t-nights">
            Nights
          </label>

          <input
            type="number"
            min="0"
            id="t-nights"
            value="${t.nights ?? ''}"
            required
          />

        </div>

      </div>


      <!-- ROUTE -->

      <div class="field">

        <label for="t-route">
          Route
        </label>

        <input
          type="text"
          id="t-route"
          value="${escapeHtml(t.route)}"
          placeholder="Islamabad - Naran - Shogran - Islamabad"
        />

      </div>


      <!-- PRICES -->

      <div
        class="field-row"
        style="display:flex; gap:12px;"
      >

        <div
          class="field"
          style="flex:1;"
        >

          <label for="t-price-head">
            Price Per Head
          </label>

          <input
            type="number"
            min="0"
            id="t-price-head"
            value="${t.priceHead ?? ''}"
            required
            placeholder="26000"
          />

        </div>


        <div
          class="field"
          style="flex:1;"
        >

          <label for="t-price-couple">
            Price Per Couple
          </label>

          <input
            type="number"
            min="0"
            id="t-price-couple"
            value="${t.priceCouple ?? ''}"
            placeholder="54000"
          />

        </div>

      </div>


      <!-- DEPARTURE -->

      <div class="field">

        <label for="t-departure">
          Departure
        </label>

        <input
          type="text"
          id="t-departure"
          value="${escapeHtml(t.departure)}"
          placeholder="Every Wednesday early morning from Islamabad"
        />

      </div>


      <!-- INCLUDE -->

      <div class="field">

        <label for="t-include">
          Include
        </label>

        <textarea
          id="t-include"
          rows="4"
          placeholder="Hotel accommodation, Transport, Breakfast..."
        >${escapeHtml(includeText)}</textarea>

        <small>
          Separate multiple items with commas.
        </small>

      </div>


      <!-- EXCLUDE -->

      <div class="field">

        <label for="t-exclude">
          Exclude
        </label>

        <textarea
          id="t-exclude"
          rows="4"
          placeholder="Personal expenses, Lunch, Entry tickets..."
        >${escapeHtml(excludeText)}</textarea>

        <small>
          Separate multiple items with commas.
        </small>

      </div>


      <!-- PAYMENT -->

      <div class="field">

        <label for="t-payment">
          Payment
        </label>

        <textarea
          id="t-payment"
          rows="4"
          placeholder="Payment instructions, advance amount, bank details, etc."
        >${escapeHtml(
          typeof t.payment === 'string'
            ? t.payment
            : t.payment
              ? JSON.stringify(
                  t.payment,
                  null,
                  2
                )
              : ''
        )}</textarea>

      </div>


      <!-- COST BREAKDOWN -->

      <div class="field">

        <label for="t-cost-breakdown">
          Cost Breakdown
        </label>

        <textarea
          id="t-cost-breakdown"
          rows="8"
          placeholder="TRIP COST FROM KARACHI:
Economy Train: Single 49,000/- Couple 110,000/-
AC Standard Train: Single 61,000/- Couple 133,000/-"
        >${escapeHtml(
          t.costBreakdown || ''
        )}</textarea>

      </div>


      <!-- ITINERARY -->

      <div class="field">

        <div
          style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:8px;
          "
        >

          <label style="margin:0;">
            <strong>
              Itinerary Schedule
            </strong>
          </label>


          <button
            type="button"
            class="btn btn-ghost btn-sm"
            id="add-tour-day-btn"
          >
            + Add Day
          </button>

        </div>


        <div
          id="tour-itinerary-container"
          style="
            display:flex;
            flex-direction:column;
            gap:8px;
          "
        ></div>

      </div>


      <!-- FEATURED + ACTIVE -->

      <div
        class="field-row"
        style="
          display:flex;
          gap:20px;
          margin-top:10px;
        "
      >

        <label
          style="
            display:flex;
            align-items:center;
            gap:6px;
          "
        >

          <input
            type="checkbox"
            id="t-featured"
            style="width:auto;"
            ${t.featured ? 'checked' : ''}
          />

          Featured

        </label>


        <label
          style="
            display:flex;
            align-items:center;
            gap:6px;
          "
        >

          <input
            type="checkbox"
            id="t-active"
            style="width:auto;"
            ${t.active !== false ? 'checked' : ''}
          />

          Visible on site

        </label>

      </div>


      <!-- ACTIONS -->

      <div
        class="modal-actions"
        style="
          display:flex;
          justify-content:flex-end;
          gap:10px;
          margin-top:20px;
        "
      >

        <button
          type="button"
          class="btn btn-ghost"
          id="modal-cancel-btn"
        >
          Cancel
        </button>


        <button
          type="submit"
          class="btn"
        >
          ${t.slug ? 'Save changes' : 'Add tour'}
        </button>

      </div>


    </form>

  `;

}


// --------------------------------------------------------------------------
// Bind Tour Form
// --------------------------------------------------------------------------

function bindTourForm(identifier = null) {

  const form =
    document.getElementById(
      'tour-form'
    );


  const addDayBtn =
    document.getElementById(
      'add-tour-day-btn'
    );


  if (!form) return;


  // Add Day button

  if (addDayBtn) {

    addDayBtn.addEventListener(
      'click',
      () => {

        addTourDayField();

      }
    );

  }


  // Submit

  form.addEventListener(
    'submit',
    async (e) => {

      e.preventDefault();


      // ----------------------------------------------------
      // Collect itinerary
      // ----------------------------------------------------

      const itinerary = [];


      document
        .querySelectorAll(
          '#tour-itinerary-container .tour-day-card'
        )
        .forEach((div) => {

          const title =
            div
              .querySelector(
                '.tour-day-title'
              )
              ?.value
              .trim() || '';


          const description =
            div
              .querySelector(
                '.tour-day-desc'
              )
              ?.value
              .trim() || '';


          if (title || description) {

            itinerary.push({
              title,
              description
            });

          }

        });


      // ----------------------------------------------------
      // Collect form data
      // ----------------------------------------------------

      const body = {

        title:
          document
            .getElementById('t-title')
            .value
            .trim(),


        days:
          Number(
            document
              .getElementById('t-days')
              .value
          ),


        nights:
          Number(
            document
              .getElementById('t-nights')
              .value
          ),


        route:
          document
            .getElementById('t-route')
            .value
            .trim(),


        priceHead:
          Number(
            document
              .getElementById('t-price-head')
              .value
          ),


        priceCouple:
          document
            .getElementById('t-price-couple')
            .value
            ? Number(
                document
                  .getElementById(
                    't-price-couple'
                  )
                  .value
              )
            : null,


        departure:
          document
            .getElementById('t-departure')
            .value
            .trim(),


        // New requested field names

        include:
          document
            .getElementById('t-include')
            .value
            .split(',')
            .map(
              (s) => s.trim()
            )
            .filter(Boolean),


        exclude:
          document
            .getElementById('t-exclude')
            .value
            .split(',')
            .map(
              (s) => s.trim()
            )
            .filter(Boolean),


        payment:
          document
            .getElementById('t-payment')
            .value
            .trim(),


        costBreakdown:
          document
            .getElementById(
              't-cost-breakdown'
            )
            .value
            .trim(),


        itinerary,


        // Keep these

        featured:
          document
            .getElementById(
              't-featured'
            )
            .checked,


        active:
          document
            .getElementById(
              't-active'
            )
            .checked

      };


      // ----------------------------------------------------
      // Basic validation
      // ----------------------------------------------------

      if (!body.title) {

        toast(
          'Tour title is required.',
          true
        );

        return;

      }


      if (!body.days || body.days < 1) {

        toast(
          'Days must be at least 1.',
          true
        );

        return;

      }


      if (
        Number.isNaN(
          body.priceHead
        )
      ) {

        toast(
          'Price per head is required.',
          true
        );

        return;

      }


      // ----------------------------------------------------
      // Save
      // ----------------------------------------------------

      try {

        const isEdit =
          Boolean(identifier);


        await apiRequest(

          isEdit
            ? `/admin/tours/${identifier}`
            : '/admin/tours',

          {
            method:
              isEdit
                ? 'PUT'
                : 'POST',

            body

          }

        );


        toast(
          isEdit
            ? 'Tour updated.'
            : 'Tour added.'
        );


        closeModal();

        loadTours();


      } catch (err) {

        toast(
          err.message,
          true
        );

      }

    }
  );

}


// --------------------------------------------------------------------------
// Add Tour
// --------------------------------------------------------------------------

const addTourBtn =
  document.getElementById(
    'add-tour-btn'
  );


if (addTourBtn) {

  addTourBtn.addEventListener(
    'click',
    () => {

      tourDayCount = 0;


      openModal(
        tourForm({})
      );


      bindTourForm(null);


      // Start with one itinerary day

      addTourDayField();

    }
  );

}


// --------------------------------------------------------------------------
// Edit Tour
// --------------------------------------------------------------------------

function editTour(identifier) {

  const t =
    toursCache.find(
      (x) =>
        String(x.slug) ===
          String(identifier) ||
        String(x.id) ===
          String(identifier)
    );


  if (!t) {

    toast(
      'Tour not found.',
      true
    );

    return;

  }


  tourDayCount = 0;


  openModal(
    tourForm(t)
  );


  bindTourForm(
    t.slug || t.id
  );


  const itinerary =
    Array.isArray(t.itinerary)
      ? t.itinerary
      : [];


  if (itinerary.length) {

    itinerary.forEach(
      (day) => {
        addTourDayField(day);
      }
    );

  } else {

    addTourDayField();

  }

}


// --------------------------------------------------------------------------
// Delete Tour
// --------------------------------------------------------------------------

async function deleteTour(identifier) {

  if (
    !confirm(
      'Delete this tour?'
    )
  ) {
    return;
  }


  try {

    await apiRequest(

      `/admin/tours/${identifier}`,

      {
        method: 'DELETE'
      }

    );


    toast(
      'Tour deleted.'
    );


    loadTours();


  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


// ==========================================================================
// GALLERY
// ==========================================================================

let galleryCache = [];


async function loadGallery() {

  try {

    if (!destinationsCache.length) {

      const result =
        await apiRequest(
          '/admin/destinations'
        );

      destinationsCache =
        result.destinations || [];

    }


    const { items } =
      await apiRequest(
        '/admin/gallery'
      );


    galleryCache =
      items || [];


    const container =
      document.getElementById(
        'gallery-table'
      );


    if (!container) return;


    if (!galleryCache.length) {

      container.innerHTML =
        emptyState(
          'No photos yet.'
        );

      return;

    }


    container.innerHTML = renderTable(

      [
        'Destination',
        'Order',
        'Active',
        ''
      ],

      galleryCache.map((g) => [

        escapeHtml(
          g.destinationSlug
        ),

        g.order ?? 0,

        activeBadge(
          g.active
        ),

        `
          <div class="row-actions">

            <button
              class="btn btn-ghost btn-sm"
              onclick="editGallery('${escapeHtml(g.id)}')"
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick="deleteGallery('${escapeHtml(g.id)}')"
            >
              Delete
            </button>

          </div>
        `

      ])

    );


  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


// --------------------------------------------------------------------------
// Gallery Form
// --------------------------------------------------------------------------

function galleryForm(g = {}) {

  const options =
    destinationsCache
      .map(
        (d) => `
          <option
            value="${escapeHtml(d.slug)}"
            ${
              g.destinationSlug === d.slug
                ? 'selected'
                : ''
            }
          >
            ${escapeHtml(d.name)}
          </option>
        `
      )
      .join('');


  return `

    ${modalHeader(
      g.id
        ? 'Edit photo'
        : 'Add photo'
    )}


    <form
      id="gallery-form"
      class="modal-body"
    >


      <div class="form-group">

        <label for="gal-destination">
          Destination
        </label>

        <select
          id="gal-destination"
          required
        >

          ${
            options ||
            '<option value="">No destinations yet</option>'
          }

        </select>

      </div>


      <div class="form-group">

        <label for="gal-order">
          Order
        </label>

        <input
          type="number"
          id="gal-order"
          min="0"
          value="${g.order ?? ''}"
          placeholder="1"
        />

      </div>


      <div class="form-group">

        <label for="gal-badge">
          Badge
        </label>

        <input
          type="text"
          id="gal-badge"
          value="${escapeHtml(g.badge)}"
          placeholder="e.g. Popular"
        />

      </div>


      <div class="form-group">

        <label for="gal-image">
          Photo
        </label>

        <input
          type="file"
          id="gal-image"
          accept="image/*"
          ${g.id ? '' : 'required'}
        />

        ${
          g.image
            ? `
              <p
                style="
                  margin-top:6px;
                  font-size:12px;
                  color:#666;
                "
              >
                Current photo is set.
                Choose a file only to replace it.
              </p>
            `
            : ''
        }

      </div>


      <label
        style="
          display:flex;
          align-items:center;
          gap:6px;
        "
      >

        <input
          type="checkbox"
          id="gal-tall"
          style="width:auto;"
          ${g.tall ? 'checked' : ''}
        />

        Tall image

      </label>


      <label
        style="
          display:flex;
          align-items:center;
          gap:6px;
          margin-top:8px;
        "
      >

        <input
          type="checkbox"
          id="gal-active"
          style="width:auto;"
          ${g.active !== false ? 'checked' : ''}
        />

        Visible on site

      </label>


      <div
        class="modal-actions"
        style="
          display:flex;
          justify-content:flex-end;
          gap:10px;
          margin-top:20px;
        "
      >

        <button
          type="button"
          class="btn btn-ghost"
          id="modal-cancel-btn"
        >
          Cancel
        </button>


        <button
          type="submit"
          class="btn"
        >
          ${g.id ? 'Save changes' : 'Add photo'}
        </button>

      </div>


    </form>

  `;

}


function bindGalleryForm(
  id,
  currentImage
) {

  const form =
    document.getElementById(
      'gallery-form'
    );


  if (!form) return;


  form.addEventListener(
    'submit',
    async (e) => {

      e.preventDefault();


      const submitBtn =
        form.querySelector(
          'button[type="submit"]'
        );


      if (submitBtn) {

        submitBtn.disabled = true;

        submitBtn.textContent =
          'Saving…';

      }


      try {

        const file =
          document.getElementById(
            'gal-image'
          ).files[0];


        let image =
          currentImage || null;


        if (file) {

          image =
            await uploadImage(
              file
            );

        }


        const body = {

          destinationSlug:
            document
              .getElementById(
                'gal-destination'
              )
              .value,

          order:
            Number(
              document
                .getElementById(
                  'gal-order'
                )
                .value
            ) || 0,

          image,

          badge:
            document
              .getElementById(
                'gal-badge'
              )
              .value
              .trim(),

          tall:
            document
              .getElementById(
                'gal-tall'
              )
              .checked,

          active:
            document
              .getElementById(
                'gal-active'
              )
              .checked

        };


        await apiRequest(

          id
            ? `/admin/gallery/${id}`
            : '/admin/gallery',

          {
            method:
              id
                ? 'PUT'
                : 'POST',

            body

          }

        );


        toast(
          id
            ? 'Photo updated.'
            : 'Photo added.'
        );


        closeModal();

        loadGallery();


      } catch (err) {

        toast(
          err.message,
          true
        );


        if (submitBtn) {

          submitBtn.disabled =
            false;

          submitBtn.textContent =
            id
              ? 'Save changes'
              : 'Add photo';

        }

      }

    }
  );

}


// --------------------------------------------------------------------------
// Add Gallery
// --------------------------------------------------------------------------

const addGalleryBtn =
  document.getElementById(
    'add-gallery-btn'
  );


if (addGalleryBtn) {

  addGalleryBtn.addEventListener(
    'click',
    async () => {

      if (!destinationsCache.length) {

        try {

          const result =
            await apiRequest(
              '/admin/destinations'
            );

          destinationsCache =
            result.destinations || [];

        } catch (err) {

          toast(
            err.message,
            true
          );

          return;

        }

      }


      openModal(
        galleryForm({})
      );


      bindGalleryForm(
        null,
        null
      );

    }
  );

}


// --------------------------------------------------------------------------
// Edit Gallery
// --------------------------------------------------------------------------

function editGallery(id) {

  const g =
    galleryCache.find(
      (x) =>
        String(x.id) ===
        String(id)
    );


  if (!g) {

    toast(
      'Photo not found.',
      true
    );

    return;

  }


  openModal(
    galleryForm(g)
  );


  bindGalleryForm(
    g.id,
    g.image
  );

}


// --------------------------------------------------------------------------
// Delete Gallery
// --------------------------------------------------------------------------

async function deleteGallery(id) {

  if (
    !confirm(
      'Delete this photo?'
    )
  ) {
    return;
  }


  try {

    await apiRequest(
      `/admin/gallery/${id}`,
      {
        method: 'DELETE'
      }
    );


    toast(
      'Photo deleted.'
    );


    loadGallery();


  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


// ==========================================================================
// FEEDBACK
// ==========================================================================

let feedbackCache = [];


async function loadFeedback() {

  try {

    const { feedback } =
      await apiRequest(
        '/admin/feedback'
      );


    feedbackCache =
      feedback || [];


    const container =
      document.getElementById(
        'feedback-table'
      );


    if (!container) return;


    if (!feedbackCache.length) {

      container.innerHTML =
        emptyState(
          'No feedback yet.'
        );

      return;

    }


    container.innerHTML = renderTable(

      [
        'Name',
        'Trip',
        'Rating',
        'Message',
        'Status',
        ''
      ],

      feedbackCache.map((f) => [

        escapeHtml(f.name),

        escapeHtml(
          f.trip || '—'
        ),

        '★'.repeat(
          Number(f.rating) || 0
        ),

        escapeHtml(
          f.text || ''
        ),

        f.approved !== false
          ? '<span class="badge badge-approved">Published</span>'
          : '<span class="badge badge-pending">Pending</span>',

        `
          <div class="row-actions">

            <button
              class="btn btn-ghost btn-sm"
              onclick="toggleFeedbackApproval('${escapeHtml(f.id)}')"
            >
              ${
                f.approved !== false
                  ? 'Unpublish'
                  : 'Publish'
              }
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick="deleteFeedback('${escapeHtml(f.id)}')"
            >
              Delete
            </button>

          </div>
        `

      ])

    );


  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


async function toggleFeedbackApproval(id) {

  const f =
    feedbackCache.find(
      (x) =>
        String(x.id) ===
        String(id)
    );


  if (!f) {

    toast(
      'Feedback not found.',
      true
    );

    return;

  }


  const nextApproved =
    !(f.approved !== false);


  try {

    await apiRequest(

      `/admin/feedback/${id}`,

      {
        method: 'PATCH',

        body: {
          approved:
            nextApproved
        }
      }

    );


    toast(
      nextApproved
        ? 'Feedback published.'
        : 'Feedback unpublished.'
    );


    loadFeedback();


  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


async function deleteFeedback(id) {

  if (
    !confirm(
      'Delete this feedback? This cannot be undone.'
    )
  ) {
    return;
  }


  try {

    await apiRequest(

      `/admin/feedback/${id}`,

      {
        method: 'DELETE'
      }

    );


    toast(
      'Feedback deleted.'
    );


    loadFeedback();


  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


// ==========================================================================
// CONTACT
// ==========================================================================

async function loadContact() {

  try {

    const { messages } =
      await apiRequest(
        '/admin/contact'
      );


    const container =
      document.getElementById(
        'contact-table'
      );


    if (!container) return;


    if (!messages.length) {

      container.innerHTML =
        emptyState(
          'No messages yet.'
        );

      return;

    }


    container.innerHTML = renderTable(

      [
        'Name',
        'Email',
        'Subject',
        'Message'
      ],

      messages.map((m) => [

        escapeHtml(
          m.name
        ),

        escapeHtml(
          m.email
        ),

        escapeHtml(
          m.subject
        ),

        escapeHtml(
          m.message
        )

      ])

    );


  } catch (err) {

    toast(
      err.message,
      true
    );

  }

}


// ==========================================================================
// LOADERS
// ==========================================================================

const loaders = {

  overview:
    loadOverview,

  destinations:
    loadDestinations,

  feedback:
    loadFeedback,

  contact:
    loadContact,

  tours:
    loadTours,

  gallery:
    loadGallery

};


// ==========================================================================
// INITIAL LOAD
// ==========================================================================

loadOverview();