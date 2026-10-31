// API helper for the admin frontend.
// Public authentication failures must stay on the login form so the page can
// display an inline message instead of redirecting/reloading on every 401.
const API_BASE = 'https://wanderlust-backend-lyart.vercel.app/api';

const Auth = {
  getToken: () => localStorage.getItem('wanderlust_admin_token'),
  getAdmin: () => JSON.parse(localStorage.getItem('wanderlust_admin_info') || 'null'),
  setSession: (token, admin) => {
    localStorage.setItem('wanderlust_admin_token', token);
    localStorage.setItem('wanderlust_admin_info', JSON.stringify(admin));
  },
  clearSession: () => {
    localStorage.removeItem('wanderlust_admin_token');
    localStorage.removeItem('wanderlust_admin_info');
  },
};

async function apiRequest(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = Auth.getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const publicAuthRequest = path === '/auth/login' || path === '/auth/register';
  if (res.status === 401 && !publicAuthRequest) {
    Auth.clearSession();
    window.location.href = './login.html';
    throw new Error('Session expired. Please sign in again.');
  }

  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || 'Request failed.');
  return data;
}

// Uploads a single image file. Keep multipart Content-Type browser-managed.
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  const headers = {};
  const token = Auth.getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/upload`, { method: 'POST', headers, body: formData });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || 'Upload failed.');
  return data.url;
}
