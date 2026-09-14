// 1. Redirect if already logged in (using relative path)
if (Auth.getToken()) {
  window.location.href = './index.html';
}

const form = document.getElementById('login-form');
const errorEl = document.getElementById('error');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevents page reload
  
  errorEl.classList.remove('show');
  submitBtn.textContent = 'Signing in…';
  submitBtn.disabled = true;

  try {
    // Make sure 'email' and 'password' match the id="" tags in your login.html
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const data = await apiRequest('/auth/login', { 
      method: 'POST', 
      body: { email, password } 
    });

    Auth.setSession(data.token, data.admin);
    
    // Redirect relative to current directory (Front-End/admin/)
    window.location.href = './index.html';
  } catch (err) {
    errorEl.textContent = err.message || 'Request failed.';
    errorEl.classList.add('show');
  } finally {
    submitBtn.textContent = 'Sign in';
    submitBtn.disabled = false;
  }
});