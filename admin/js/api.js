// Point directly to your Express backend port
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

  if (res.status === 401) {
    Auth.clearSession();
    // Relative path — matches login.js's redirect and works regardless of
    // which sub-path the admin panel is deployed under. The old hardcoded
    // '/admin/login.html' broke this redirect on any deployment where the
    // panel isn't served from the site root.
    window.location.href = './login.html';
    throw new Error('Session expired. Please sign in again.');
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || 'Request failed.');
  return data;
}

// Uploads a single image file (from an <input type="file">) and returns its URL.
// Kept separate from apiRequest because file uploads must NOT set
// Content-Type: application/json — the browser sets the correct
// multipart boundary itself when we pass a FormData body.
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const headers = {};
  const token = Auth.getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || 'Upload failed.');
  return data.url;
}