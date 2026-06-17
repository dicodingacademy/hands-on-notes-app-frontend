import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

import NoteItem from '../components/NoteItem.jsx';

const note = {
  id: 1,
  title: 'Belajar deployment',
  body: 'Materi EC2',
  created_at: '2026-06-10T07:30:00.000Z',
};

describe('NoteItem', () => {
  test('menampilkan judul, tanggal, dan tombol hapus', () => {
    render(
      <MemoryRouter>
        <NoteItem note={note} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('Belajar deployment')).toBeInTheDocument();
    expect(screen.getByText('10 Juni 2026')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hapus' })).toBeInTheDocument();
  });

  test('judul menjadi tautan ke halaman detail', () => {
    render(
      <MemoryRouter>
        <NoteItem note={note} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Belajar deployment' })).toHaveAttribute(
      'href',
      '/notes/1'
    );
  });
});
