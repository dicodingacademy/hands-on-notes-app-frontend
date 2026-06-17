// Mengubah string tanggal ISO dari backend menjadi format Indonesia,
// contoh: "2026-06-10T07:30:00.000Z" → "10 Juni 2026".
export function formatDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
