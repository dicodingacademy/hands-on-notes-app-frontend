import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext.jsx';
import { deleteNote, getNote } from '../utils/api.js';
import { formatDate } from '../utils/formatDate.js';

function NoteDetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getNote(id, token)
      .then(setNote)
      .catch((err) => setError(err.message));
  }, [id, token]);

  async function handleDelete() {
    try {
      await deleteNote(id, token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return (
      <main className="page">
        <p className="error">{error}</p>
        <Link to="/">Kembali ke daftar</Link>
      </main>
    );
  }

  if (!note) {
    return <main className="page">Memuat...</main>;
  }

  return (
    <main className="page">
      <h1 data-cy="note-detail-title">{note.title}</h1>
      <p className="note-date">{formatDate(note.created_at)}</p>
      <p className="note-body">{note.body}</p>
      <div className="actions">
        <Link to="/">Kembali ke daftar</Link>
        <button type="button" onClick={handleDelete} data-cy="delete-note">
          Hapus
        </button>
      </div>
    </main>
  );
}

export default NoteDetailPage;
