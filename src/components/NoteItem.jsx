import { Link } from 'react-router-dom';

import { formatDate } from '../utils/formatDate.js';

function NoteItem({ note, onDelete }) {
  return (
    <li className="note-item" data-cy="note-item">
      <div>
        <Link to={`/notes/${note.id}`} className="note-title">
          {note.title}
        </Link>
        <p className="note-date">{formatDate(note.created_at)}</p>
      </div>
      <button type="button" onClick={() => onDelete(note.id)} data-cy="delete-note">
        Hapus
      </button>
    </li>
  );
}

export default NoteItem;
