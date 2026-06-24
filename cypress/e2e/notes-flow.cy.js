// E2E alur utama: register → login → buat catatan.
// Jalankan lokal dengan backend + frontend hidup: npm run cy:run
// Untuk menguji situs produksi: CYPRESS_BASE_URL=https://situs-kalian.netlify.app npm run cy:run

describe('Alur register, login, dan buat catatan', () => {
  // Username dibuat unik (timestamp + angka acak) supaya register tidak bentrok
  // dengan user yang sudah ada. Nilai yang sama dipakai ulang saat login.
  const username = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const password = 'rahasia123';
  const noteTitle = 'Catatan dari Cypress';
  const noteBody = 'Dibuat otomatis oleh E2E test.';

  it('mendaftar user baru, login, lalu membuat catatan', () => {
    // --- Register dengan user unik ---
    cy.visit('/register');
    cy.get('[data-cy=username-input]').type(username);
    cy.get('[data-cy=password-input]').type(password);
    cy.get('[data-cy=register-button]').click();

    // Setelah daftar, diarahkan ke halaman Masuk
    cy.url().should('include', '/login');

    // --- Login dengan user yang sama ---
    cy.get('[data-cy=username-input]').type(username);
    cy.get('[data-cy=password-input]').type(password);
    cy.get('[data-cy=login-button]').click();

    // Masuk ke daftar catatan (masih kosong)
    cy.contains('Catatan Saya');
    cy.get('[data-cy=empty-list]').should('exist');

    // --- Buat catatan ---
    cy.contains('Tambah Catatan').click();
    cy.get('[data-cy=title-input]').type(noteTitle);
    cy.get('[data-cy=body-input]').type(noteBody);
    cy.get('[data-cy=submit-note]').click();

    // Catatan muncul di daftar
    cy.get('[data-cy=note-item]').should('have.length', 1);
    cy.contains(noteTitle);
  });
});
