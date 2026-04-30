// Time helpers for sleep tracking. Times stored as minutes since midnight (0–1439).

export const formatHM = (min: number): string => {
  const m = ((min % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
};

// Duration handles wrap-around: bed=23:00, wake=07:00 → 8h
export const durationHours = (bedMin: number, wakeMin: number): number => {
  const diff = ((wakeMin - bedMin) % 1440 + 1440) % 1440;
  return diff / 60;
};

export const addHours = (bedMin: number, hours: number): number => {
  return ((bedMin + Math.round(hours * 60)) % 1440 + 1440) % 1440;
};

export const roundTo5 = (min: number): number => Math.round(min / 5) * 5;
