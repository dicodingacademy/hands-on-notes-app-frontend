import { useState } from 'react';

import { validateNote } from '../utils/validation.js';

function NoteForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateNote({ title });
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await onSubmit({ title: title.trim(), body });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && (
        <p className="error" data-cy="form-error">
          {error}
        </p>
      )}
      <label>
        Judul
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          data-cy="title-input"
        />
      </label>
      <label>
        Isi
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={6}
          data-cy="body-input"
        />
      </label>
      <button type="submit" data-cy="submit-note">
        Simpan
      </button>
    </form>
  );
}

export default NoteForm;
