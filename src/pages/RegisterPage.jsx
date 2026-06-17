import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { register as apiRegister } from '../utils/api.js';
import { validateRegister } from '../utils/validation.js';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateRegister({ username, password });
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await apiRegister({ username: username.trim(), password });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page">
      <h1>Daftar</h1>
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
        <button type="submit" data-cy="register-button">
          Daftar
        </button>
      </form>
      <p>
        Sudah punya akun? <Link to="/login">Masuk di sini</Link>
      </p>
    </main>
  );
}

export default RegisterPage;
