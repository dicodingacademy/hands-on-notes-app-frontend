import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext.jsx';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Aplikasi Catatan
      </Link>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/add">Tambah Catatan</Link>
            <Link to="/meme-classifier">Cek Meme</Link>
            <button type="button" onClick={handleLogout} data-cy="logout-button">
              Keluar
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Masuk</Link>
            <Link to="/register">Daftar</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
