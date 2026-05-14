import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Ambil CSRF cookie dari Laravel sebelum POST request
export async function getCsrfCookie() {
  // Gunakan instance axios murni (tanpa prefix /api) agar mengarah ke /sanctum/csrf-cookie melalui proxy
  await axios.get('/sanctum/csrf-cookie', {
    withCredentials: true,
  });
}

export default api;
