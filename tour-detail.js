function getPlace(t) {
  const titleStr = t.title || t.name || "";
  return titleStr
    .replace(/^\d+\s*Days?\s*/i, "")
    .replace(/\s*\(.*?\)\s*$/, "")
    .trim();
}

function getDesc(t) {
  if (t.desc) return t.desc;
  if (!t.route) return "Experience the beauty of northern Pakistan with our curated group tour package.";

  const stops = t.route.split("·").map(s => s.trim()).filter(Boolean);
  const preview = stops.slice(0, 4).join(", ");
  return `A ${t.days}-day ${t.transport ? t.transport.toLowerCase() : 'guided'} journey covering ${preview}${
    stops.length > 4 ? " and more" : ""
  }. Perfect for couples, families, students and solo travelers alike.`;
}

function getTags(t) {
  const tags = [];
  const p = t.priceHead || t.price || 0;

  if (p <= 17000) tags.push({ label: "Budget" });
  else if (p <= 25000) tags.push({ label: "Standard" });
  else if (p <= 40000) tags.push({ label: "Deluxe" });
  else tags.push({ label: "Executive", highlight: true });

  if (t.transport === "By Air") tags.push({ label: "Luxury", highlight: true });

  return tags;
}

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // tour ids are slugs (strings), not numbers
}

function safeSetText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function safeSetHTML(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function renderTour(t) {
  const extra = (typeof TOUR_DETAILS !== "undefined" && TOUR_DETAILS[t.id]) ? TOUR_DETAILS[t.id] : null;

  document.title = `${t.title || t.name} | The Wanderlust.pk`;

  safeSetHTML("tdBreadcrumb", `<a href="tours.html">Tours</a> / ${getPlace(t)}`);
  safeSetText("tdTitle", t.title || t.name);
  safeSetText("tdSubtitle", `${t.days} Days / ${t.nights ?? (t.days - 1)} Nights · ${t.transport || 'By Road'}`);

  const image = document.getElementById("tdImage");
  if (image) {
    image.src = tourImage(t);
    image.alt = t.title || t.name;
  }

  safeSetText("tdDaysBadge", `${t.days}D / ${t.nights ?? (t.days - 1)}N`);

  const tags = getTags(t);
  safeSetHTML("tdTags", tags.map(tag => `<span${tag.highlight ? ' class="tag-highlight"' : ""}>${tag.label}</span>`).join(""));
  safeSetText("tdDesc", getDesc(t));
  safeSetText("tdRoute", t.route ? t.route.split("·").map(s => s.trim()).join(", ") : "Islamabad to Destination");
  safeSetText("tdDeparture", extra && extra.departure ? extra.departure : t.departure || "Islamabad / Rawalpindi");
  safeSetText("tdTransport", t.transport || "AC Coaster / Grand Cabin");

  // Prices
  safeSetText("tdPriceHead", `Rs. ${Number(t.priceHead || t.price || 0).toLocaleString()} / person`);
  safeSetText("tdPriceCouple", `Rs. ${Number(t.priceCouple || (t.priceHead ? t.priceHead * 2.3 : 0)).toLocaleString()} for 2 persons`);
  // Prices / Costs — the API returns a flat object like
  // { lahore, islamabad, faisalabad, couplePackage }, one price per
  // departure city plus an optional couple rate.
  const CITY_LABELS = { lahore: "Lahore", islamabad: "Islamabad", faisalabad: "Faisalabad", karachi: "Karachi" };
  if (t.cost) {
    const cityEntries = Object.entries(t.cost).filter(([key, val]) => key !== "couplePackage" && val != null);
    if (cityEntries.length) {
      const priceHeadText = cityEntries
        .map(([city, price]) => `${CITY_LABELS[city] || city}: Rs. ${Number(price).toLocaleString()}`)
        .join(" | ");
      safeSetText("tdPriceHead", `${priceHeadText} / person`);
    }
    if (t.cost.couplePackage) {
      safeSetText("tdPriceCouple", `Rs. ${Number(t.cost.couplePackage).toLocaleString()} for 2 persons`);
    }
  }

  // Payment Procedure
  const paymentSection = document.getElementById("tdPaymentSection");
  if (paymentSection) {
    if (t.payment) {
      paymentSection.style.display = "";
      safeSetText("tdPaymentPolicy", t.payment.policy);
      safeSetHTML("tdPaymentMethods", t.payment.methods.map(m => `
        <div class="td-payment-card">
          <div class="method-label">${m.label}</div>
          <div class="method-name">${m.accountName}</div>
          <div class="method-number">${m.accountNumber}</div>
        </div>
      `).join('') + (t.payment.verificationContact
        ? `<div class="td-payment-verify">Verification contact: ${t.payment.verificationContact}</div>`
        : ''));
    } else {
      paymentSection.style.display = "none";
    }
  }

  // WhatsApp Booking Link
  const bookBtn = document.getElementById("tdBookBtn");
  if (bookBtn) {
    const waNum = typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "923039465839";
    const msg = encodeURIComponent(`Hi! I'm interested in booking the ${t.title || t.name} (${t.days} Days) package.`);
    bookBtn.href = `https://wa.me/${waNum}?text=${msg}`;
  }

  const content = document.getElementById("tdContent");
  if (content) content.style.display = "";
  const notFound = document.getElementById("tdNotFound");
  if (notFound) notFound.style.display = "none";
}

function init() {
  const id = getIdFromUrl();
  const tour = (typeof TOURS !== "undefined" && id !== null) ? TOURS.find(t => t.id === id) : null;

  if (!tour) {
    const content = document.getElementById("tdContent");
    if (content) content.style.display = "none";
    const notFound = document.getElementById("tdNotFound");
    if (notFound) notFound.style.display = "";
    safeSetText("tdTitle", "Tour Not Found");
    return;
  }

  renderTour(tour);
}

document.addEventListener("DOMContentLoaded", init);