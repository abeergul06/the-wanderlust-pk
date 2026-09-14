// Point this at your deployed backend URL in production.
const API_BASE = "https://wanderlust-backend-lyart.vercel.app/api";

async function loadUserFeedback() {
  try {
    const res = await fetch(`${API_BASE}/feedback`);
    const data = await res.json();
    return data.feedback || [];
  } catch (e) {
    console.error("Failed to load feedback:", e);
    return [];
  }
}

async function saveUserFeedback(entry) {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to submit feedback.");
  }
}

function initials(name) {
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function renderStars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

const feedbackList = document.getElementById('feedbackList');

async function renderFeedback() {
  feedbackList.innerHTML = `<p style="color:#94a3b8;">Loading feedback...</p>`;
  const all = await loadUserFeedback();

  if (all.length === 0) {
    feedbackList.innerHTML = `<p style="color:#94a3b8;">No feedback yet — be the first to share your experience!</p>`;
    return;
  }

  feedbackList.innerHTML = all.map(f => `
    <div class="feedback-card">
      <div class="fb-head">
        <div class="fb-avatar">${initials(f.name)}</div>
        <div class="fb-meta">
          <strong>${f.name}</strong>
          <span>${f.trip || "The Wanderlust.pk traveler"}</span>
        </div>
      </div>
      <div class="fb-stars">${renderStars(f.rating)}</div>
      <p>${f.text}</p>
    </div>
  `).join("");
}
renderFeedback();

// ---- Rating input ----
let selectedRating = 0;
const ratingButtons = document.querySelectorAll('#ratingInput button');
ratingButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedRating = Number(btn.dataset.star);
    ratingButtons.forEach(b => b.classList.toggle('selected', Number(b.dataset.star) <= selectedRating));
  });
});

// ---- Form submission ----
const feedbackForm = document.getElementById('feedbackForm');
const fbFormMessage = document.getElementById('fbFormMessage');

feedbackForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('fbName').value.trim();
  const trip = document.getElementById('fbTrip').value.trim();
  const text = document.getElementById('fbMessage').value.trim();

  if (!name || !text || selectedRating === 0) {
    fbFormMessage.textContent = "Please add your name, a rating, and a short message.";
    fbFormMessage.style.color = "#ff8a8a";
    return;
  }

  try {
    await saveUserFeedback({ name, trip, rating: selectedRating, text });
    fbFormMessage.textContent = "Thank you! Your feedback has been added below.";
    fbFormMessage.style.color = "var(--cyan)";
    feedbackForm.reset();
    selectedRating = 0;
    ratingButtons.forEach(b => b.classList.remove('selected'));
    await renderFeedback();
  } catch (err) {
    fbFormMessage.textContent = err.message || "Something went wrong. Please try again.";
    fbFormMessage.style.color = "#ff8a8a";
  }
});