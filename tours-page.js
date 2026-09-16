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

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById('tourListingGrid');
  if (!grid) return;

  if (typeof TOURS === "undefined") {
    grid.innerHTML = "<h2 style='color:red'>Error: tours-data.js not loaded properly</h2>";
    return;
  }// ==========================================================================
// tours-page.js — The Wanderlust.pk
// Tour listing: search, filters, sort, pagination and tour modal.
//
// Requires tours-data.js to be loaded first.
// Expected globals:
// TOURS
// tourImage()
// WHATSAPP_NUMBER
// PAGE_SIZE
// ==========================================================================


let state = {
  search: "",
  maxPrice: 70000,
  length: new Set(),
  dests: new Set(),
  sort: "latest",
  page: 1
};


// ==========================================================================
// HELPERS
// ==========================================================================

function formatPKR(n) {

  const amount = Number(n) || 0;

  return (
    "Rs " +
    amount.toLocaleString("en-PK")
  );

}


function escapeHtml(str) {

  return String(str ?? "").replace(
    /[&<>"']/g,
    (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char])
  );

}


function normalizeList(value) {

  if (Array.isArray(value)) {

    return value
      .map(item => String(item).trim())
      .filter(Boolean);

  }


  if (typeof value === "string") {

    return value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);

  }


  return [];

}


// ==========================================================================
// GET TOUR PRICE
// ==========================================================================

function getTourPrice(t) {

  // New structure

  if (
    t.priceHead !== undefined &&
    t.priceHead !== null
  ) {

    return Number(t.priceHead) || 0;

  }


  // Backward compatibility

  if (
    t.price !== undefined &&
    t.price !== null
  ) {

    return Number(t.price) || 0;

  }


  // Old nested cost structure

  if (t.cost) {

    if (
      t.cost.fromKarachi &&
      t.cost.fromKarachi.economyTrain &&
      t.cost.fromKarachi.economyTrain.perHead
    ) {

      return Number(
        t.cost
          .fromKarachi
          .economyTrain
          .perHead
      ) || 0;

    }


    if (
      t.cost.fromIslamabad &&
      t.cost.fromIslamabad.withoutStay &&
      t.cost.fromIslamabad.withoutStay.perHead
    ) {

      return Number(
        t.cost
          .fromIslamabad
          .withoutStay
          .perHead
      ) || 0;

    }

  }


  return 0;

}


// ==========================================================================
// TOUR DESTINATION / PLACE
// ==========================================================================

function getPlace(t) {

  const titleStr =
    t.title ||
    t.name ||
    "";


  return titleStr
    .replace(
      /^\d+\s*Days?\s*/i,
      ""
    )
    .replace(
      /\s*\(.*?\)\s*$/,
      ""
    )
    .trim();

}


// ==========================================================================
// TOUR DESCRIPTION
// ==========================================================================

function getDesc(t) {

  if (t.desc) {
    return t.desc;
  }


  if (t.description) {
    return t.description;
  }


  if (!t.route) {

    return (
      "Experience the beauty of northern Pakistan " +
      "with our curated group tour package."
    );

  }


  const stops =
    String(t.route)
      .split("·")
      .map(s => s.trim())
      .filter(Boolean);


  const preview =
    stops
      .slice(0, 4)
      .join(", ");


  return (
    `A ${t.days || ""}-day guided journey ` +
    `covering ${preview}` +
    (
      stops.length > 4
        ? " and more"
        : ""
    ) +
    ". Perfect for couples, families, " +
    "students and solo travelers alike."
  );

}


// ==========================================================================
// TOUR TAGS
// ==========================================================================

function getTags(t) {

  const tags = [];

  const price =
    getTourPrice(t);


  // Price category

  if (price <= 17000) {

    tags.push({
      label: "Budget"
    });

  } else if (price <= 25000) {

    tags.push({
      label: "Standard"
    });

  } else if (price <= 40000) {

    tags.push({
      label: "Deluxe"
    });

  } else {

    tags.push({
      label: "Executive",
      highlight: true
    });

  }


  // Featured

  if (t.featured) {

    tags.push({
      label: "Featured",
      highlight: true
    });

  }


  return tags;

}


// ==========================================================================
// DURATION GROUP
// ==========================================================================

function getDurationGroup(t) {

  const days =
    Number(t.days) || 0;


  if (days <= 4) {
    return "short";
  }


  if (days <= 7) {
    return "medium";
  }


  return "long";

}


// ==========================================================================
// INITIALIZE
// ==========================================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const grid =
      document.getElementById(
        "tourListingGrid"
      );


    if (!grid) {
      return;
    }


    // ----------------------------------------------------
    // Check TOURS
    // ----------------------------------------------------

    if (
      typeof TOURS ===
      "undefined"
    ) {

      grid.innerHTML =
        "<h2 style='color:red'>" +
        "Error: tours-data.js not loaded properly" +
        "</h2>";

      return;

    }


    // ----------------------------------------------------
    // DOM elements
    // ----------------------------------------------------

    const count =
      document.getElementById(
        "resultsCount"
      );


    const search =
      document.getElementById(
        "tourSearch"
      );


    const sort =
      document.getElementById(
        "tourSort"
      );


    const priceRange =
      document.getElementById(
        "priceRange"
      );


    const priceLabel =
      document.getElementById(
        "priceRangeLabel"
      );


    const durationList =
      document.getElementById(
        "durationFilterList"
      );


    const destList =
      document.getElementById(
        "destFilterList"
      );


    const clearBtn =
      document.getElementById(
        "clearFilters"
      );


    const pagination =
      document.getElementById(
        "pagination"
      );


    // ======================================================================
    // BUILD FILTERS
    // ======================================================================

    function buildFilters() {

      // --------------------------------------------------
      // Duration filters
      // --------------------------------------------------

      const durations = [
        ...new Set(
          TOURS
            .filter(t => t.active !== false)
            .map(t => getDurationGroup(t))
        )
      ];


      if (durationList) {

        durationList.innerHTML =
          durations
            .map(
              d => `

                <label>

                  <input
                    type="checkbox"
                    class="lengthCheck"
                    value="${escapeHtml(d)}"
                  >

                  ${
                    d === "short"
                      ? "Short 1-4 Days"
                      : d === "medium"
                        ? "Medium 5-7 Days"
                        : "Long 8+ Days"
                  }

                </label>

              `
            )
            .join("");

      }


      // --------------------------------------------------
      // Destinations
      // --------------------------------------------------

      const destinations = [
        "Swat",
        "Kashmir",
        "Naran",
        "Shogran",
        "Skardu",
        "Hunza",
        "Kumrat",
        "Astore",
        "Neelam",
        "Gilgit",
        "Murree",
        "Fairy Meadows"
      ];


      if (destList) {

        destList.innerHTML =
          destinations
            .map(
              d => `

                <label>

                  <input
                    type="checkbox"
                    class="destCheck"
                    value="${escapeHtml(d)}"
                  >

                  ${escapeHtml(d)}

                </label>

              `
            )
            .join("");

      }

    }


    // ======================================================================
    // RENDER TOURS
    // ======================================================================

    function render() {

      // --------------------------------------------------
      // Price
      // --------------------------------------------------

      if (priceRange) {

        state.maxPrice =
          Number(
            priceRange.value
          );

      }


      if (priceLabel) {

        priceLabel.textContent =
          formatPKR(
            state.maxPrice
          );

      }


      // --------------------------------------------------
      // Filter
      // --------------------------------------------------

      let filtered =
        TOURS.filter(
          (t) => {

            // IMPORTANT:
            // Inactive tours are not shown.

            if (
              t.active === false
            ) {
              return false;
            }


            const title =
              String(
                t.title ||
                t.name ||
                ""
              ).toLowerCase();


            const route =
              String(
                t.route ||
                ""
              ).toLowerCase();


            const searchTerm =
              state.search
                .toLowerCase()
                .trim();


            // Search

            const matchesSearch =
              !searchTerm ||
              title.includes(
                searchTerm
              ) ||
              route.includes(
                searchTerm
              );


            // Price

            const price =
              getTourPrice(t);


            const matchesPrice =
              price <=
              state.maxPrice;


            // Duration

            const matchesLength =
              state.length.size === 0 ||
              state.length.has(
                getDurationGroup(t)
              );


            // Destination

            const matchesDest =
              state.dests.size === 0 ||
              [
                ...state.dests
              ].some(
                dest => {

                  const d =
                    dest.toLowerCase();


                  return (
                    title.includes(d) ||
                    route.includes(d)
                  );

                }
              );


            return (
              matchesSearch &&
              matchesPrice &&
              matchesLength &&
              matchesDest
            );

          }
        );


      // ======================================================================
      // SORT
      // ======================================================================

      if (
        state.sort ===
        "price-asc"
      ) {

        filtered.sort(
          (a, b) =>
            getTourPrice(a) -
            getTourPrice(b)
        );

      }


      if (
        state.sort ===
        "price-desc"
      ) {

        filtered.sort(
          (a, b) =>
            getTourPrice(b) -
            getTourPrice(a)
        );

      }


      if (
        state.sort ===
        "duration-asc"
      ) {

        filtered.sort(
          (a, b) =>
            (Number(a.days) || 0) -
            (Number(b.days) || 0)
        );

      }


      if (
        state.sort ===
        "duration-desc"
      ) {

        filtered.sort(
          (a, b) =>
            (Number(b.days) || 0) -
            (Number(a.days) || 0)
        );

      }


      // Featured first

      if (
        state.sort ===
        "featured"
      ) {

        filtered.sort(
          (a, b) =>
            Number(Boolean(b.featured)) -
            Number(Boolean(a.featured))
        );

      }


      // --------------------------------------------------
      // Pagination
      // --------------------------------------------------

      const pageSize =
        typeof PAGE_SIZE !==
        "undefined"
          ? PAGE_SIZE
          : 6;


      const totalPages =
        Math.max(
          1,
          Math.ceil(
            filtered.length /
            pageSize
          )
        );


      if (
        state.page >
        totalPages
      ) {

        state.page =
          totalPages;

      }


      const start =
        (state.page - 1) *
        pageSize;


      const pageItems =
        filtered.slice(
          start,
          start + pageSize
        );


      // --------------------------------------------------
      // Render cards
      // --------------------------------------------------

      grid.innerHTML = "";


      if (
        pageItems.length === 0
      ) {

        grid.innerHTML = `

          <div
            style="
              grid-column:1/-1;
              text-align:center;
              padding:40px;
              color:#aaa;
            "
          >

            No tours found.
            Click "Clear All Filters"

          </div>

        `;

      } else {

        pageItems.forEach(
          (t, i) => {

            const num =
              String(
                start + i + 1
              ).padStart(
                2,
                "0"
              );


            const days =
              Number(t.days) || 0;


            const nights =
              t.nights != null
                ? Number(t.nights)
                : Math.max(
                    days - 1,
                    0
                  );


            const price =
              getTourPrice(t);


            const route =
              String(
                t.route ||
                "Islamabad to Destination"
              );


            const firstStop =
              route
                .split("·")[0]
                .trim();


            const description =
              getDesc(t);


            const image =
              typeof tourImage ===
              "function"
                ? tourImage(t)
                : (
                    t.image_url ||
                    t.image ||
                    ""
                  );


            const tags =
              getTags(t);


            const tagHTML =
              tags.length
                ? `
                    <div class="tl-card-tags">

                      ${tags
                        .map(
                          tag => `
                            <span${
                              tag.highlight
                                ? ' class="tag-highlight"'
                                : ""
                            }>
                              ${escapeHtml(
                                tag.label
                              )}
                            </span>
                          `
                        )
                        .join("")}

                    </div>
                  `
                : "";


            const identifier =
              t.slug ||
              t.id;


            grid.innerHTML += `

              <div
                class="tl-card"
                data-tour-id="${escapeHtml(identifier)}"
              >

                <div class="tl-photo">

                  <span class="tl-badge">
                    ${days}D ${nights}N
                  </span>


                  ${
                    t.featured
                      ? `
                        <span class="tl-featured-badge">
                          Featured
                        </span>
                      `
                      : ""
                  }


                  <img
                    src="${escapeHtml(image)}"
                    alt="${escapeHtml(
                      t.title ||
                      t.name ||
                      "Tour"
                    )}"
                    loading="lazy"
                  >

                </div>


                <div class="tl-body">

                  <div class="tl-index">
                    Tour ${num}
                  </div>


                  ${tagHTML}


                  <h4>
                    ${escapeHtml(
                      t.title ||
                      t.name ||
                      "Tour"
                    )}
                  </h4>


                  <div class="tl-loc">
                    📍
                    ${escapeHtml(
                      firstStop
                    )}
                  </div>


                  <p class="tl-desc">
                    ${escapeHtml(
                      description
                    )}
                  </p>


                  <div class="tl-footer">

                    <div class="tl-price">

                      ${formatPKR(price)}

                      <span>
                        Per Person
                      </span>

                    </div>


                    <button
                      class="tl-view-btn"
                      onclick="openTourModal('${escapeHtml(identifier)}')"
                    >
                      View Details
                    </button>

                  </div>

                </div>

              </div>

            `;

          }
        );

      }


      // --------------------------------------------------
      // Result count
      // --------------------------------------------------

      const end =
        Math.min(
          start + pageSize,
          filtered.length
        );


      if (count) {

        count.textContent =
          `Showing ${
            filtered.length > 0
              ? start + 1
              : 0
          }-${
            end
          } of ${
            filtered.length
          } tours`;

      }


      renderPagination(
        totalPages
      );

    }


    // ======================================================================
    // PAGINATION
    // ======================================================================

    function renderPagination(
      total
    ) {

      if (!pagination) {
        return;
      }


      pagination.innerHTML =
        "";


      if (total <= 1) {
        return;
      }


      pagination.innerHTML += `

        <button
          class="page-arrow"
          aria-label="Previous page"
          ${
            state.page === 1
              ? "disabled"
              : ""
          }
          onclick="goPage(${state.page - 1})"
        >
          ‹
        </button>

      `;


      for (
        let i = 1;
        i <= total;
        i++
      ) {

        pagination.innerHTML += `

          <button
            class="${
              i === state.page
                ? "active"
                : ""
            }"
            onclick="goPage(${i})"
          >
            ${i}
          </button>

        `;

      }


      pagination.innerHTML += `

        <button
          class="page-arrow"
          aria-label="Next page"
          ${
            state.page === total
              ? "disabled"
              : ""
          }
          onclick="goPage(${state.page + 1})"
        >
          ›
        </button>

      `;

    }


    // ======================================================================
    // PAGE NAVIGATION
    // ======================================================================

    window.goPage =
      (page) => {

        state.page =
          Math.max(
            1,
            Number(page) || 1
          );


        render();


        window.scrollTo({
          top: 400,
          behavior: "smooth"
        });

      };


    // ======================================================================
    // TOUR MODAL
    // ======================================================================

    window.openTourModal =
      (identifier) => {

        const t =
          TOURS.find(
            x =>
              String(x.id) ===
                String(identifier) ||

              String(x.slug) ===
                String(identifier)
          );


        if (!t) {
          return;
        }


        // Do not open inactive tour

        if (
          t.active === false
        ) {
          return;
        }


        const modal =
          document.getElementById(
            "tourModal"
          );


        if (modal) {
          modal.classList.add(
            "show"
          );
        }


        // --------------------------------------------------
        // Image
        // --------------------------------------------------

        const modalImg =
          document.getElementById(
            "tourModalImg"
          );


        if (modalImg) {

          modalImg.src =
            typeof tourImage ===
            "function"
              ? tourImage(t)
              : (
                  t.image_url ||
                  t.image ||
                  ""
                );


          modalImg.alt =
            t.title ||
            t.name ||
            "Tour";

        }


        // --------------------------------------------------
        // Days
        // --------------------------------------------------

        const days =
          Number(t.days) || 0;


        const nights =
          t.nights != null
            ? Number(t.nights)
            : Math.max(
                days - 1,
                0
              );


        const modalDays =
          document.getElementById(
            "tourModalDays"
          );


        if (modalDays) {

          modalDays.textContent =
            `${days} Days / ${nights} Nights`;

        }


        // --------------------------------------------------
        // Title
        // --------------------------------------------------

        const modalTitle =
          document.getElementById(
            "tourModalTitle"
          );


        if (modalTitle) {

          modalTitle.textContent =
            t.title ||
            t.name ||
            "Tour";

        }


        // --------------------------------------------------
        // Description / Route
        // --------------------------------------------------

        const modalDesc =
          document.getElementById(
            "tourModalDesc"
          );


        if (modalDesc) {

          modalDesc.textContent =
            getDesc(t);

        }


        // --------------------------------------------------
        // Route
        // --------------------------------------------------

        const modalRoute =
          document.getElementById(
            "tourModalRoute"
          );


        if (modalRoute) {

          modalRoute.textContent =
            t.route ||
            "Islamabad to Destination";

        }


        // --------------------------------------------------
        // Departure
        // --------------------------------------------------

        const modalDeparture =
          document.getElementById(
            "tourModalDeparture"
          );


        if (modalDeparture) {

          modalDeparture.textContent =
            t.departure ||
            "Islamabad / Rawalpindi";

        }


        // --------------------------------------------------
        // Price
        // --------------------------------------------------

        const price =
          getTourPrice(t);


        const modalPrice =
          document.getElementById(
            "tourModalPrice"
          );


        if (modalPrice) {

          modalPrice.textContent =
            `${formatPKR(price)} / Per Person`;

        }


        // --------------------------------------------------
        // Couple Price
        // --------------------------------------------------

        const modalCouple =
          document.getElementById(
            "tourModalPriceCouple"
          );


        if (modalCouple) {

          const couplePrice =
            Number(
              t.priceCouple || 0
            );


          modalCouple.textContent =
            couplePrice
              ? `${formatPKR(
                  couplePrice
                )} / Couple`
              : "Price on request";

        }


        // --------------------------------------------------
        // Itinerary
        // --------------------------------------------------

        const modalItinerary =
          document.getElementById(
            "modalItinerary"
          );


        if (modalItinerary) {

          const itinerary =
            Array.isArray(
              t.itinerary
            )
              ? t.itinerary
              : [];


          modalItinerary.innerHTML =
            itinerary.length

              ? itinerary
                  .map(
                    (day, index) => {

                      const dayNumber =
                        day.day ||
                        index + 1;


                      const title =
                        day.title ||
                        "";


                      const description =
                        day.description ||
                        day.text ||
                        "";


                      return `

                        <div>

                          <b>
                            Day ${escapeHtml(
                              dayNumber
                            )}:
                          </b>


                          ${
                            title
                              ? `
                                <strong>
                                  ${escapeHtml(
                                    title
                                  )}
                                </strong>
                              `
                              : ""
                          }


                          ${
                            description
                              ? `
                                <div>
                                  ${escapeHtml(
                                    description
                                  )}
                                </div>
                              `
                              : ""
                          }

                        </div>

                      `;

                    }
                  )
                  .join("")

              : "<div>No itinerary available.</div>";

        }


        // --------------------------------------------------
        // Include
        // --------------------------------------------------

        const modalIncludes =
          document.getElementById(
            "modalIncludes"
          );


        if (modalIncludes) {

          const includes =
            normalizeList(
              t.include ??
              t.includes
            );


          modalIncludes.innerHTML =
            includes.length

              ? includes
                  .map(
                    item =>
                      `<li>✓ ${escapeHtml(item)}</li>`
                  )
                  .join("")

              : "<li>—</li>";

        }


        // --------------------------------------------------
        // Exclude
        // --------------------------------------------------

        const modalExcluded =
          document.getElementById(
            "modalExcluded"
          );


        if (modalExcluded) {

          const excludes =
            normalizeList(
              t.exclude ??
              t.excludes
            );


          modalExcluded.innerHTML =
            excludes.length

              ? excludes
                  .map(
                    item =>
                      `<li>✕ ${escapeHtml(item)}</li>`
                  )
                  .join("")

              : "<li>—</li>";

        }


        // --------------------------------------------------
        // Cost Breakdown
        // --------------------------------------------------

        const costSection =
          document.getElementById(
            "modalCostBreakdownSection"
          );


        const costElement =
          document.getElementById(
            "modalCostBreakdown"
          );


        if (costSection) {

          if (
            t.costBreakdown
          ) {

            costSection.style.display =
              "";


            if (costElement) {

              costElement.textContent =
                t.costBreakdown;

            }

          } else {

            costSection.style.display =
              "none";

          }

        }


        // --------------------------------------------------
        // Payment
        // --------------------------------------------------

        const paymentSection =
          document.getElementById(
            "modalPaymentSection"
          );


        const modalPaymentPolicy =
          document.getElementById(
            "modalPaymentPolicy"
          );


        const modalPaymentMethods =
          document.getElementById(
            "modalPaymentMethods"
          );


        if (paymentSection) {

          if (
            t.payment
          ) {

            paymentSection.style.display =
              "";


            // New payment format:
            // plain text

            if (
              typeof t.payment ===
              "string"
            ) {

              if (
                modalPaymentPolicy
              ) {

                modalPaymentPolicy.textContent =
                  t.payment;

              }


              if (
                modalPaymentMethods
              ) {

                modalPaymentMethods.innerHTML =
                  "";

              }

            }


            // Old payment object:
            // kept for compatibility

            else if (
              typeof t.payment ===
              "object"
            ) {

              if (
                modalPaymentPolicy
              ) {

                modalPaymentPolicy.textContent =
                  t.payment.policy ||
                  "";

              }


              if (
                modalPaymentMethods
              ) {

                const methods =
                  Array.isArray(
                    t.payment.methods
                  )
                    ? t.payment.methods
                    : [];


                modalPaymentMethods.innerHTML =
                  methods
                    .map(
                      m => `

                        <div class="modal-payment-card">

                          <div class="method-label">
                            ${escapeHtml(
                              m.label || ""
                            )}
                          </div>

                          <div class="method-name">
                            ${escapeHtml(
                              m.accountName || ""
                            )}
                          </div>

                          <div class="method-number">
                            ${escapeHtml(
                              m.accountNumber || ""
                            )}
                          </div>

                        </div>

                      `
                    )
                    .join("")

                    +

                    (
                      t.payment
                        .verificationContact
                        ? `

                          <div class="modal-payment-verify">

                            Verification contact:
                            ${escapeHtml(
                              t.payment
                                .verificationContact
                            )}

                          </div>

                        `
                        : ""
                    );

              }

            }

          } else {

            paymentSection.style.display =
              "none";

          }

        }


        // --------------------------------------------------
        // WhatsApp
        // --------------------------------------------------

        const bookWA =
          document.getElementById(
            "bookWhatsApp"
          );


        if (bookWA) {

          const waNumber =
            typeof WHATSAPP_NUMBER !==
            "undefined"

              ? WHATSAPP_NUMBER

              : "923039465839";


          const message =
            `Hi, I want to book: ${
              t.title ||
              t.name ||
              "Tour"
            }`;


          bookWA.href =
            `https://wa.me/${waNumber}?text=${
              encodeURIComponent(
                message
              )
            }`;

        }

      };


    // ======================================================================
    // CLOSE MODAL
    // ======================================================================

    const modalCloseBtn =
      document.getElementById(
        "tourModalClose"
      );


    if (modalCloseBtn) {

      modalCloseBtn.onclick =
        () => {

          const modal =
            document.getElementById(
              "tourModal"
            );


          if (modal) {

            modal.classList.remove(
              "show"
            );

          }

        };

    }


    const modal =
      document.getElementById(
        "tourModal"
      );


    if (modal) {

      modal.addEventListener(
        "click",
        (e) => {

          if (
            e.target === modal
          ) {

            modal.classList.remove(
              "show"
            );

          }

        }
      );

    }


    document.addEventListener(
      "keydown",
      (e) => {

        if (
          e.key === "Escape" &&
          modal
        ) {

          modal.classList.remove(
            "show"
          );

        }

      }
    );


    // ======================================================================
    // VIEW TOGGLE
    // ======================================================================

    const viewToggle =
      document.getElementById(
        "viewToggle"
      );


    if (viewToggle) {

      viewToggle.addEventListener(
        "click",
        (e) => {

          const btn =
            e.target.closest(
              "button[data-view]"
            );


          if (!btn) {
            return;
          }


          viewToggle
            .querySelectorAll(
              "button"
            )
            .forEach(
              b =>
                b.classList.remove(
                  "active"
                )
            );


          btn.classList.add(
            "active"
          );


          grid.classList.toggle(
            "list-view",
            btn.dataset.view ===
              "list"
          );

        }
      );

    }


    // ======================================================================
    // SEARCH
    // ======================================================================

    if (search) {

      search.addEventListener(
        "input",
        (e) => {

          state.search =
            e.target.value
              .toLowerCase();


          state.page =
            1;


          render();

        }
      );

    }


    // ======================================================================
    // SORT
    // ======================================================================

    if (sort) {

      sort.addEventListener(
        "change",
        (e) => {

          state.sort =
            e.target.value;


          state.page =
            1;


          render();

        }
      );

    }


    // ======================================================================
    // PRICE FILTER
    // ======================================================================

    if (priceRange) {

      priceRange.addEventListener(
        "input",
        () => {

          state.page =
            1;


          render();

        }
      );

    }


    // ======================================================================
    // CHECKBOX FILTERS
    // ======================================================================

    document.addEventListener(
      "change",
      (e) => {

        // Duration

        if (
          e.target.classList.contains(
            "lengthCheck"
          )
        ) {

          if (
            e.target.checked
          ) {

            state.length.add(
              e.target.value
            );

          } else {

            state.length.delete(
              e.target.value
            );

          }


          state.page =
            1;


          render();

        }


        // Destination

        if (
          e.target.classList.contains(
            "destCheck"
          )
        ) {

          if (
            e.target.checked
          ) {

            state.dests.add(
              e.target.value
            );

          } else {

            state.dests.delete(
              e.target.value
            );

          }


          state.page =
            1;


          render();

        }

      }
    );


    // ======================================================================
    // CLEAR FILTERS
    // ======================================================================

    if (clearBtn) {

      clearBtn.addEventListener(
        "click",
        () => {

          state = {

            search: "",

            maxPrice: 70000,

            length:
              new Set(),

            dests:
              new Set(),

            sort:
              "latest",

            page:
              1

          };


          if (search) {
            search.value = "";
          }


          if (sort) {
            sort.value = "latest";
          }


          if (priceRange) {
            priceRange.value = 70000;
          }


          document
            .querySelectorAll(
              ".lengthCheck, .destCheck"
            )
            .forEach(
              cb =>
                cb.checked = false
            );


          render();

        }
      );

    }


    // ======================================================================
    // START
    // ======================================================================

    buildFilters();

    render();

  }
);s

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
    const durations = [...new Set(TOURS.map(t => t.lengthGroup))];
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
      const matchesPrice = t.priceHead <= state.maxPrice;
      const matchesLength = state.length.size === 0 || state.length.has(t.lengthGroup);
      const matchesDest = state.dests.size === 0 || [...state.dests].some(dest =>
        t.title.toLowerCase().includes(dest.toLowerCase()) ||
        t.route.toLowerCase().includes(dest.toLowerCase())
      );
      return matchesSearch && matchesPrice && matchesLength && matchesDest;
    });

    if (state.sort === "price-asc") filtered.sort((a, b) => a.priceHead - b.priceHead);
    if (state.sort === "price-desc") filtered.sort((a, b) => b.priceHead - a.priceHead);
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
                <div class="tl-price">${formatPKR(t.priceHead)}<span>Per Person</span></div>
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

    const modalPrice = document.getElementById('tourModalPrice');
    if (modalPrice) modalPrice.textContent = `${formatPKR(t.priceHead)} / Per Person`;

    const modalcouple = document.getElementById('tourModalPrice');
    if (modalcouple) modalPrice.textContent = `${formatPKR(t.priceCouple)} / Couple`;

    const modalItinerary = document.getElementById('modalItinerary');
    if (modalItinerary) modalItinerary.innerHTML = t.itinerary.map(d => `<div><b>Day ${d.day}:</b> ${d.text}</div>`).join('');

    const modalIncludes = document.getElementById('modalIncludes');
    if (modalIncludes) modalIncludes.innerHTML = (t.includes || []).map(i => `<li>✓ ${i}</li>`).join('');

    const modalExcluded = document.getElementById('modalExcluded');
    if (modalExcluded) modalExcluded.innerHTML = (t.excludes || []).map(i => `<li>✕ ${i}</li>`).join('');

    const paymentSection = document.getElementById('modalPaymentSection');
    const modalPaymentPolicy = document.getElementById('modalPaymentPolicy');
    const modalPaymentMethods = document.getElementById('modalPaymentMethods');
    if (paymentSection) {
      if (t.payment) {
        paymentSection.style.display = '';
        if (modalPaymentPolicy) modalPaymentPolicy.textContent = t.payment.policy;
        if (modalPaymentMethods) {
          modalPaymentMethods.innerHTML = t.payment.methods.map(m => `
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

  function getTourPrice(t) {
  // 1. Check direct properties
  if (t.priceHead) return t.priceHead;
  if (t.price) return t.price;

  // 2. Check nested cost structure
  if (t.cost) {
    if (t.cost.fromKarachi?.economyTrain?.perHead) {
      return t.cost.fromKarachi.economyTrain.perHead;
    }
    if (t.cost.fromIslamabad?.withoutStay?.perHead) {
      return t.cost.fromIslamabad.withoutStay.perHead;
    }
  }

  return 0; // Fallback
}


  buildFilters();
  render();
});