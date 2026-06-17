import { createContext, useContext, useState } from 'react';

// Token disimpan di localStorage agar tetap login setelah refresh halaman.
// Trade-off: localStorage bisa dibaca skrip lain di halaman (risiko XSS),
// tapi cukup untuk lingkup kelas ini — tanpa mekanisme refresh token.
const TOKEN_KEY = 'accessToken';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  function login(newToken) {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: Boolean(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
