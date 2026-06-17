import { useNavigate } from 'react-router-dom';

import NoteForm from '../components/NoteForm.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { createNote } from '../utils/api.js';

function AddNotePage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(note) {
    await createNote(note, token);
    navigate('/');
  }

  return (
    <main className="page">
      <h1>Tambah Catatan</h1>
      <NoteForm onSubmit={handleSubmit} />
    </main>
  );
}

export default AddNotePage;
