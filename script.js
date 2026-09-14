// ==========================================
// 1. SUPABASE CLIENT & DATA FETCHING
// ==========================================

// Configuration - Replace with your actual Supabase credentials
const SUPABASE_URL = "https://your-supabase-project.supabase.co";
const SUPABASE_ANON_KEY = "your-actual-anon-key";

let supabaseClient = null;

// Dynamically load Supabase SDK if not present
function loadSupabaseSDK() {
  return new Promise((resolve, reject) => {
    if (window.supabase) {
      resolve(window.supabase);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = () => resolve(window.supabase);
    script.onerror = () => reject(new Error("Failed to load Supabase SDK"));
    document.head.appendChild(script);
  });
}

// Initialize Supabase & Build Dynamic Tour Panels
async function initDynamicTours() {
  const panelsHost = document.getElementById("tourPanels");
  if (!panelsHost) return;

  try {
    const supabaseLib = await loadSupabaseSDK();
    if (!supabaseClient) {
      supabaseClient = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    // Fetch active tours from Supabase
    const { data: dbTours, error } = await supabaseClient
      .from("tours")
      .select("*")
      .eq("active", true);

    if (error) {
      console.error("Error loading tours from database:", error);
      return;
    }

    // Use fetched database tours or fallback if empty
    const tours = dbTours && dbTours.length > 0 ? dbTours : [];
    
    // Clear out existing content inside container
    panelsHost.innerHTML = "";

    const dayList = [3, 4, 5, 6, 7, 8];

    dayList.forEach(d => {
      const panel = document.createElement("div");
      panel.className = "tour-panel" + (d === 3 ? " active" : "");
      panel.id = "panel-" + d;

      const grid = document.createElement("div");
      grid.className = "tour-grid";

      // Match tour items to current day tab
      const matchingTours = tours.filter(t => Number(t.days) === d);

      if (matchingTours.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; color: #888; text-align: center; padding: 2rem 0;">No ${d}-day tours currently available.</p>`;
      } else {
        matchingTours.forEach(t => {
          const title = t.title || t.name || "Tour Package";
          const price = Number(t.price || 0);
          const nights = t.days - 1;

          const card = document.createElement("div");
          card.className = "tour-item";
          card.setAttribute("data-days", t.days);
          card.setAttribute("data-name", title.toLowerCase());
          card.setAttribute("data-price", price);

          card.innerHTML = `
            <span class="days-pill">${t.days} Days / ${nights} Nights</span>
            <h4>${title}</h4>
            <div class="price-row">
              <strong>Rs. ${price.toLocaleString()}</strong>
              <span>per person</span>
            </div>
            <a href="tours.html" class="book-link">Book Now →</a>
          `;
          grid.appendChild(card);
        });
      }

      panel.appendChild(grid);
      panelsHost.appendChild(panel);
    });

  } catch (err) {
    console.error("Failed to initialize dynamic tours:", err);
  }
}


// ==========================================
// 2. EVENT LISTENERS & FILTER INTERACTION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Load dynamic tours
  initDynamicTours();

  // Tab switcher listener
  const dayTabs = document.getElementById("dayTabs");
  if (dayTabs) {
    dayTabs.addEventListener("click", e => {
      const btn = e.target.closest(".day-tab");
      if (!btn) return;
      document.querySelectorAll(".day-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const day = btn.getAttribute("data-day");
      document.querySelectorAll(".tour-panel").forEach(p => p.classList.remove("active"));
      
      const targetPanel = document.getElementById("panel-" + day);
      if (targetPanel) targetPanel.classList.add("active");
    });
  }

  // "Plan Your Trip" search/filter button listener
  const planGo = document.getElementById("planGo");
  if (planGo) {
    planGo.addEventListener("click", () => {
      const destInput = document.getElementById("planDest");
      const daysInput = document.getElementById("planDays");
      const budgetInput = document.getElementById("planBudget");

      const dest = destInput ? destInput.value.toLowerCase() : "";
      const days = daysInput ? daysInput.value : "";
      const budget = budgetInput ? budgetInput.value : "";

      const targetDay = days || 3;

      document.querySelectorAll(".day-tab").forEach(b => {
        b.classList.toggle("active", b.dataset.day == targetDay);
      });
      document.querySelectorAll(".tour-panel").forEach(p => {
        p.classList.toggle("active", p.id === "panel-" + targetDay);
      });

      // Filter visible cards inside target panel
      document.querySelectorAll("#panel-" + targetDay + " .tour-item").forEach(card => {
        const nameMatch = !dest || card.dataset.name.includes(dest);
        const priceMatch = !budget || Number(card.dataset.price) <= Number(budget);
        card.style.display = (nameMatch && priceMatch) ? "flex" : "none";
      });

      const toursElem = document.getElementById("tours");
      if (toursElem) toursElem.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Finder scroll button
  const finderGo = document.getElementById("finderGo");
  if (finderGo) {
    finderGo.addEventListener("click", () => {
      const destsElem = document.getElementById("destinations");
      if (destsElem) destsElem.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});