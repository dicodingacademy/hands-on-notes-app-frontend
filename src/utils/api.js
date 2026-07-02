// Satu-satunya tempat alamat backend dibaca: env VITE_API_URL.
// Saat deployment, nilai ini diatur di dashboard Netlify — tanpa hardcode.
const BASE_URL = import.meta.env.VITE_API_URL;
const AI_URL = import.meta.env.VITE_AI_SERVICE_URL;

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await response.json();
  if (!response.ok) {
    // Backend selalu mengirim bentuk { "error": "<pesan>" } saat gagal
    throw new Error(json.error || 'terjadi kesalahan pada server');
  }
  return json.data;
}

export function register({ username, password }) {
  return request('/api/auth/register', {
    method: 'POST',
    body: { username, password },
  });
}

export function login({ username, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: { username, password },
  });
}

export function getNotes(token) {
  return request('/api/notes', { token });
}

export function getNote(id, token) {
  return request(`/api/notes/${id}`, { token });
}

export function createNote({ title, body }, token) {
  return request('/api/notes', { method: 'POST', body: { title, body }, token });
}

export function deleteNote(id, token) {
  return request(`/api/notes/${id}`, { method: 'DELETE', token });
}

export async function classifyMeme({ file, token }) {
  const formData = new FormData();
  formData.append('file', file); // nama field wajib "file" sesuai kontrak

  // Gambar dikirim ke backend kita (bukan langsung ke layanan AI) agar tetap terproteksi
  // dengan token. Backend Express yang meneruskannya ke layanan AI.
  // Catatan: JANGAN set Content-Type manual — browser mengisi sendiri
  // multipart/form-data beserta boundary-nya; menyetelnya membuat body gagal di-parse.
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/predict`, {
    method: 'POST',
    headers,
    body: formData,
  });

  const json = await response.json();
  if (!response.ok) {
    // Backend selalu mengirim bentuk { "error": "<pesan>" } saat gagal
    throw new Error(json.error || 'terjadi kesalahan pada server');
  }
  return json.data.predictions; // [{ label, confidence }, ...]
}

