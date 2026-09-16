// ==========================================================================
// tour-detail.js — The Wanderlust.pk
// ==========================================================================

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

function getPlace(t) {
  const titleStr = t.title || t.name || "";

  return titleStr
    .replace(/^\d+\s*Days?\s*/i, "")
    .replace(/\s*\(.*?\)\s*$/, "")
    .trim();
}


// --------------------------------------------------------------------------
// Description
// --------------------------------------------------------------------------

function getDesc(t) {

  if (t.desc) {
    return t.desc;
  }

  if (t.description) {
    return t.description;
  }

  if (!t.route) {
    return "Experience the beauty of northern Pakistan with our curated group tour package.";
  }

  const stops = t.route
    .split("·")
    .map(s => s.trim())
    .filter(Boolean);

  const preview =
    stops
      .slice(0, 4)
      .join(", ");

  return `
    A ${t.days || ""}-day guided journey
    covering ${preview}${stops.length > 4
      ? " and more"
      : ""
    }.
    Perfect for couples, families, students
    and solo travelers alike.
  `.replace(/\s+/g, " ").trim();
}


// --------------------------------------------------------------------------
// Tags
// --------------------------------------------------------------------------

function getTags(t) {

  const tags = [];

  const price =
    Number(
      t.priceHead ||
      t.price ||
      0
    );


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


  // Keep compatibility with old tours
  // if transport still exists in old data.

  if (t.transport === "By Air") {

    tags.push({
      label: "Luxury",
      highlight: true
    });

  }


  // Featured tours

  if (t.featured) {

    tags.push({
      label: "Featured",
      highlight: true
    });

  }


  return tags;
}


// --------------------------------------------------------------------------
// URL
// --------------------------------------------------------------------------

function getIdFromUrl() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  return params.get("id");

}


// --------------------------------------------------------------------------
// Safe DOM helpers
// --------------------------------------------------------------------------

function safeSetText(id, value) {

  const el =
    document.getElementById(id);

  if (el) {
    el.textContent =
      value ?? "";
  }

}


function safeSetHTML(id, value) {

  const el =
    document.getElementById(id);

  if (el) {
    el.innerHTML =
      value ?? "";
  }

}


function safeSetDisplay(
  id,
  display = ""
) {

  const el =
    document.getElementById(id);

  if (el) {
    el.style.display =
      display;
  }

}


// --------------------------------------------------------------------------
// Escape HTML
// --------------------------------------------------------------------------

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


// --------------------------------------------------------------------------
// Convert comma-separated / array data into array
// --------------------------------------------------------------------------

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


// --------------------------------------------------------------------------
// Render Tour
// --------------------------------------------------------------------------

function renderTour(t) {

  if (!t) return;


  // --------------------------------------------------------
  // Page title
  // --------------------------------------------------------

  document.title =
    `${t.title || t.name || "Tour"} | The Wanderlust.pk`;


  // --------------------------------------------------------
  // Breadcrumb
  // --------------------------------------------------------

  safeSetHTML(
    "tdBreadcrumb",

    `<a href="tours.html">Tours</a> / ${escapeHtml(
      getPlace(t)
    )}`
  );


  // --------------------------------------------------------
  // Main title
  // --------------------------------------------------------

  safeSetText(
    "tdTitle",
    t.title || t.name || "Tour"
  );


  // --------------------------------------------------------
  // Subtitle
  // --------------------------------------------------------

  const days =
    Number(t.days) || 0;

  const nights =
    t.nights != null
      ? Number(t.nights)
      : Math.max(days - 1, 0);


  safeSetText(
    "tdSubtitle",
    `${days} Days / ${nights} Nights`
  );


  // --------------------------------------------------------
  // Image
  // --------------------------------------------------------

  const image =
    document.getElementById(
      "tdImage"
    );


  if (image) {

    if (
      typeof tourImage ===
      "function"
    ) {

      image.src =
        tourImage(t);

    } else if (t.image_url) {

      image.src =
        t.image_url;

    } else if (t.image) {

      image.src =
        t.image;

    }


    image.alt =
      t.title ||
      t.name ||
      "Tour";

  }


  // --------------------------------------------------------
  // Days badge
  // --------------------------------------------------------

  safeSetText(
    "tdDaysBadge",
    `${days}D / ${nights}N`
  );


  // --------------------------------------------------------
  // Tags
  // --------------------------------------------------------

  const tags =
    getTags(t);


  safeSetHTML(
    "tdTags",

    tags
      .map(
        tag => `
          <span${tag.highlight
            ? ' class="tag-highlight"'
            : ""
          }>
            ${escapeHtml(
            tag.label
          )}
          </span>
        `
      )
      .join("")
  );


  // --------------------------------------------------------
  // Description
  // --------------------------------------------------------

  safeSetText(
    "tdDesc",
    getDesc(t)
  );


  // --------------------------------------------------------
  // Route
  // --------------------------------------------------------

  const route =
    t.route
      ? t.route
        .split("·")
        .map(s => s.trim())
        .filter(Boolean)
        .join(", ")
      : "Islamabad to Destination";


  safeSetText(
    "tdRoute",
    route
  );


  // --------------------------------------------------------
  // Departure
  // --------------------------------------------------------

  safeSetText(
    "tdDeparture",
    t.departure ||
    "Islamabad / Rawalpindi"
  );


  // --------------------------------------------------------
  // Transport
  // --------------------------------------------------------
  // Transport was removed from the new admin form.
  // Keep a default value for compatibility with the
  // existing HTML section.

  safeSetText(
    "tdTransport",
    t.transport ||
    "AC Coaster / Grand Cabin"
  );


  // ========================================================================
  // PRICES
  // ========================================================================

  const priceHead =
    Number(
      t.priceHead ||
      t.price ||
      0
    );


  if (priceHead) {

    safeSetText(
      "tdPriceHead",
      `Rs. ${priceHead.toLocaleString()} / person`
    );

  } else {

    safeSetText(
      "tdPriceHead",
      "Price on request"
    );

  }


  const priceCouple =
    Number(
      t.priceCouple ||
      0
    );


  if (priceCouple) {

    safeSetText(
      "tdPriceCouple",
      `Rs. ${priceCouple.toLocaleString()} for 2 persons`
    );

  } else {

    safeSetText(
      "tdPriceCouple",
      "Price on request"
    );

  }


  // ========================================================================
  // ITINERARY
  // ========================================================================

  const itinerarySection =
    document.getElementById(
      "tdItinerarySection"
    );


  const itinerary =
    Array.isArray(t.itinerary)
      ? t.itinerary
      : [];


  if (
    itinerarySection
  ) {

    if (
      itinerary.length
    ) {

      itinerarySection.style.display =
        "";


      safeSetHTML(

        "tdItinerary",

        itinerary
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
                <div class="td-itinerary-day">

                  <b>
                    Day ${escapeHtml(
                dayNumber
              )}:
                  </b>

                  ${title
                  ? `
                        <strong>
                          ${escapeHtml(
                    title
                  )}
                        </strong>
                      `
                  : ""
                }

                  ${description
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

      );

    } else {

      itinerarySection.style.display =
        "none";

    }

  }


  // ========================================================================
  // INCLUDED / EXCLUDED
  // ========================================================================

  const includeExcludeSection =
    document.getElementById(
      "tdIncludeExcludeSection"
    );


  // NEW FIELD NAMES:
  // include
  // exclude

  const includes =
    normalizeList(
      t.include ??
      t.includes
    );


  const excludes =
    normalizeList(
      t.exclude ??
      t.excludes
    );


  if (
    includeExcludeSection
  ) {

    if (
      includes.length ||
      excludes.length
    ) {

      includeExcludeSection.style.display =
        "";


      safeSetHTML(

        "tdIncludes",

        includes.length

          ? includes
            .map(
              item =>
                `<li>✓ ${escapeHtml(item)}</li>`
            )
            .join("")

          : "<li>—</li>"

      );


      safeSetHTML(

        "tdExcluded",

        excludes.length

          ? excludes
            .map(
              item =>
                `<li>✕ ${escapeHtml(item)}</li>`
            )
            .join("")

          : "<li>—</li>"

      );

    } else {

      includeExcludeSection.style.display =
        "none";

    }

  }


  // ========================================================================
  // COST BREAKDOWN
  // ========================================================================

  const costBreakdownSection =
    document.getElementById(
      "tdCostBreakdownSection"
    );


  if (
    costBreakdownSection
  ) {

    if (
      t.costBreakdown
    ) {

      costBreakdownSection.style.display =
        "";


      safeSetText(
        "tdCostBreakdown",
        t.costBreakdown
      );

    } else {

      costBreakdownSection.style.display =
        "none";

    }

  }


  // ========================================================================
  // PAYMENT
  // ========================================================================

  const paymentSection =
    document.getElementById(
      "tdPaymentSection"
    );


  if (
    paymentSection
  ) {

    if (
      t.payment
    ) {

      paymentSection.style.display =
        "";


      // ----------------------------------------------------
      // New admin form stores payment as text.
      // ----------------------------------------------------

      if (
        typeof t.payment ===
        "string"
      ) {

        safeSetText(
          "tdPaymentPolicy",
          t.payment
        );


        safeSetHTML(
          "tdPaymentMethods",
          ""
        );

      }


      // ----------------------------------------------------
      // Backward compatibility if old payment object exists
      // ----------------------------------------------------

      else if (
        typeof t.payment ===
        "object"
      ) {

        safeSetText(

          "tdPaymentPolicy",

          t.payment.policy ||
          ""

        );


        const methods =
          Array.isArray(
            t.payment.methods
          )
            ? t.payment.methods
            : [];


        safeSetHTML(

          "tdPaymentMethods",

          methods
            .map(
              m => `
                <div class="td-payment-card">

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
                  <div class="td-payment-verify">
                    Verification contact:
                    ${escapeHtml(
                t.payment
                  .verificationContact
              )}
                  </div>
                `
              : ""
          )

        );

      }

    } else {

      paymentSection.style.display =
        "none";

    }

  }


  // ========================================================================
  // WHATSAPP BOOKING
  // ========================================================================

  const bookBtn =
    document.getElementById(
      "tdBookBtn"
    );


  if (bookBtn) {

    const waNum =
      typeof WHATSAPP_NUMBER !==
        "undefined"

        ? WHATSAPP_NUMBER

        : "923039465839";


    const tourTitle =
      t.title ||
      t.name ||
      "tour";


    const message =
      `Hi! I'm interested in booking the ${tourTitle} (${days} Days) package.`;


    bookBtn.href =
      `https://wa.me/${waNum}?text=${encodeURIComponent(
        message
      )}`;

  }


  // ========================================================================
  // ACTIVE STATUS
  // ========================================================================
  // If a tour is inactive, don't display it.
  // This is normally handled on the tours listing page,
  // but this also protects direct URLs.

  if (t.active === false) {

    const content =
      document.getElementById(
        "tdContent"
      );

    if (content) {
      content.style.display =
        "none";
    }


    const notFound =
      document.getElementById(
        "tdNotFound"
      );

    if (notFound) {
      notFound.style.display =
        "";
    }


    safeSetText(
      "tdTitle",
      "Tour Not Available"
    );

    return;

  }


  // ========================================================================
  // SHOW CONTENT
  // ========================================================================

  const content =
    document.getElementById(
      "tdContent"
    );


  if (content) {
    content.style.display =
      "";
  }


  const notFound =
    document.getElementById(
      "tdNotFound"
    );


  if (notFound) {
    notFound.style.display =
      "none";
  }

}


// ==========================================================================
// INIT
// ==========================================================================

function init() {

  const id =
    getIdFromUrl();


  if (
    typeof TOURS ===
    "undefined"
  ) {

    console.error(
      "TOURS data is not loaded."
    );

    return;

  }


  if (id === null) {

    showTourNotFound();

    return;

  }


  // Support both slug and id

  const tour =
    TOURS.find(
      t =>
        String(t.id) ===
        String(id) ||

        String(t.slug) ===
        String(id)
    );


  if (!tour) {

    showTourNotFound();

    return;

  }


  renderTour(
    tour
  );

}


// ==========================================================================
// NOT FOUND
// ==========================================================================

function showTourNotFound() {

  safeSetDisplay(
    "tdContent",
    "none"
  );


  safeSetDisplay(
    "tdNotFound",
    ""
  );


  safeSetText(
    "tdTitle",
    "Tour Not Found"
  );

}


// ==========================================================================
// START
// ==========================================================================

document.addEventListener(
  "DOMContentLoaded",
  init
);