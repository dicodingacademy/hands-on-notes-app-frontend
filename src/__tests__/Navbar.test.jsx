import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Navbar from '../components/Navbar.jsx';
import { AuthProvider } from '../contexts/AuthContext.jsx';

describe('Navbar', () => {
  test('menampilkan judul "Aplikasi Catatan"', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Aplikasi Catatan')).toBeInTheDocument();
  });
});
