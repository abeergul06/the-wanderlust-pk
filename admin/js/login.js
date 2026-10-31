
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorElement = document.getElementById("error");
  const submitButton = document.getElementById("submit-btn");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    errorElement.textContent = "";

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!email || !password) {
      errorElement.textContent = "Please enter your email and password.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Signing in...";

    try {
      // Use the API URL configured in api.js
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Incorrect username or password.");
        }

        if (response.status === 429) {
          throw new Error(
            "Too many login attempts. Please try again later."
          );
        }

        throw new Error(
          data.message || "Unable to sign in. Please try again."
        );
      }

      if (!data.token || !data.admin) {
        throw new Error("Invalid server response. Please try again.");
      }

      // Save the authenticated admin session
      Auth.setSession(data.token, data.admin);

      // Redirect to admin dashboard
      window.location.href = "./index.html";

    } catch (error) {
      errorElement.textContent =
        error.message === "Failed to fetch"
          ? "Unable to connect to the server. Please try again."
          : error.message || "Something went wrong. Please try again.";

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Sign in";
    }
  });
});
