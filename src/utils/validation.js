// Validasi form di sisi klien — pesannya sama dengan validasi backend
// supaya perilaku aplikasi konsisten.

export function validateNote({ title }) {
  if (!title || title.trim().length === 0) {
    return 'title wajib diisi';
  }
  if (title.trim().length > 100) {
    return 'title maksimal 100 karakter';
  }
  return null;
}

export function validateLogin({ username, password }) {
  if (!username || username.trim().length === 0) {
    return 'username wajib diisi';
  }
  if (!password || password.length === 0) {
    return 'password wajib diisi';
  }
  return null;
}

export function validateRegister({ username, password }) {
  if (!username || username.trim().length === 0) {
    return 'username wajib diisi';
  }
  if (username.trim().length < 3 || username.trim().length > 50) {
    return 'username harus 3-50 karakter';
  }
  if (!password || password.length < 6) {
    return 'password minimal 6 karakter';
  }
  return null;
}
