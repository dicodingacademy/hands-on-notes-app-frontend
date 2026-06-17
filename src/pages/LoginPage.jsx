import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext.jsx';
import { login as apiLogin } from '../utils/api.js';
import { validateLogin } from '../utils/validation.js';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateLogin({ username, password });
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = await apiLogin({ username: username.trim(), password });
      login(data.accessToken);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page">
      <h1>Masuk</h1>
      <form onSubmit={handleSubmit} className="form">
        {error && (
          <p className="error" data-cy="form-error">
            {error}
          </p>
        )}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            data-cy="username-input"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            data-cy="password-input"
          />
        </label>
        <button type="submit" data-cy="login-button">
          Masuk
        </button>
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </main>
  );
}

export default LoginPage;
