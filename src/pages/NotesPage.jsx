import { useEffect, useState } from 'react';

import NoteList from '../components/NoteList.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { deleteNote, getNotes } from '../utils/api.js';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    getNotes(token)
      .then(setNotes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleDelete(id) {
    try {
      await deleteNote(id, token);
      setNotes((current) => current.filter((note) => note.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <main className="page">Memuat...</main>;
  }

  return (
    <main className="page">
      <h1>Catatan Anda</h1>
      {error && <p className="error">{error}</p>}
      <NoteList notes={notes} onDelete={handleDelete} />
    </main>
  );
}

export default NotesPage;
