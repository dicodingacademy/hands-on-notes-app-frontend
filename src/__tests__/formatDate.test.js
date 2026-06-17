import { describe, expect, test } from 'vitest';

import { formatDate } from '../utils/formatDate.js';

describe('formatDate', () => {
  test('mengubah tanggal ISO menjadi format Indonesia', () => {
    expect(formatDate('2026-06-10T07:30:00.000Z')).toBe('10 Juni 2026');
  });

  test('mengembalikan string kosong untuk tanggal tidak valid', () => {
    expect(formatDate('bukan-tanggal')).toBe('');
  });
});
