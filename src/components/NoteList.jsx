import NoteItem from './NoteItem.jsx';

function NoteList({ notes, onDelete }) {
  if (notes.length === 0) {
    return <p data-cy="empty-list">Belum ada catatan. Yuk buat catatan pertamamu!</p>;
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default NoteList;
