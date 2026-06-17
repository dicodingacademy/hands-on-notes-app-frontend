import { describe, expect, test } from 'vitest';

import { validateLogin, validateNote, validateRegister } from '../utils/validation.js';

describe('validateNote', () => {
  test('judul kosong ditolak', () => {
    expect(validateNote({ title: '' })).toBe('title wajib diisi');
  });

  test('judul hanya spasi ditolak', () => {
    expect(validateNote({ title: '   ' })).toBe('title wajib diisi');
  });

  test('judul lebih dari 100 karakter ditolak', () => {
    expect(validateNote({ title: 'a'.repeat(101) })).toBe('title maksimal 100 karakter');
  });

  test('judul valid lolos', () => {
    expect(validateNote({ title: 'Belajar deployment' })).toBeNull();
  });
});

describe('validateLogin', () => {
  test('username kosong ditolak', () => {
    expect(validateLogin({ username: '', password: 'rahasia123' })).toBe(
      'username wajib diisi'
    );
  });

  test('password kosong ditolak', () => {
    expect(validateLogin({ username: 'budi', password: '' })).toBe(
      'password wajib diisi'
    );
  });

  test('form valid lolos', () => {
    expect(validateLogin({ username: 'budi', password: 'rahasia123' })).toBeNull();
  });
});

describe('validateRegister', () => {
  test('username terlalu pendek ditolak', () => {
    expect(validateRegister({ username: 'ab', password: 'rahasia123' })).toBe(
      'username harus 3-50 karakter'
    );
  });

  test('password kurang dari 6 karakter ditolak', () => {
    expect(validateRegister({ username: 'budi', password: '12345' })).toBe(
      'password minimal 6 karakter'
    );
  });

  test('form valid lolos', () => {
    expect(validateRegister({ username: 'budi', password: 'rahasia123' })).toBeNull();
  });
});
