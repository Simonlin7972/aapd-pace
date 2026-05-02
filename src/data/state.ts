// Pace — simple shared mutable state (prototype-level)
// 透過 Proxy 攔截 set，把狀態同步寫進 localStorage，
// 讓 PWA 安裝後重開 app 可以還原上次資料。既有 call site 寫法不變（PaceState.foo = bar）。

const STORAGE_KEY = 'pace.state.v1';

export type SleepLogEntry = {
  date: string;        // YYYY-MM-DD
  hours: number;
  feel: number;        // 0–4 (MOOD_SCALE index)
  bedtimeMin: number;
  wakeTimeMin: number;
};

// Offsets are days-ago from today; entries dated relative to runtime so the demo
// stays populated regardless of when the app is first opened.
type FixtureOffset = { daysAgo: number; hours: number; feel: number; bedtimeMin: number; wakeTimeMin: number };
const SLEEP_LOG_OFFSETS: FixtureOffset[] = [
  { daysAgo: 0,  hours: 6.5, feel: 2, bedtimeMin: 30,           wakeTimeMin: 7 * 60 },
  { daysAgo: 1,  hours: 7.0, feel: 2, bedtimeMin: 23 * 60 + 30, wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 2,  hours: 6.5, feel: 2, bedtimeMin: 0,            wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 3,  hours: 7.5, feel: 3, bedtimeMin: 23 * 60,      wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 4,  hours: 8.0, feel: 3, bedtimeMin: 22 * 60 + 30, wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 6,  hours: 6.0, feel: 1, bedtimeMin: 30,           wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 7,  hours: 7.0, feel: 2, bedtimeMin: 23 * 60 + 30, wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 8,  hours: 6.5, feel: 2, bedtimeMin: 0,            wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 9,  hours: 7.5, feel: 3, bedtimeMin: 23 * 60,      wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 11, hours: 8.5, feel: 3, bedtimeMin: 22 * 60 + 30, wakeTimeMin: 7 * 60 },
  { daysAgo: 12, hours: 7.0, feel: 2, bedtimeMin: 23 * 60 + 30, wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 13, hours: 5.0, feel: 0, bedtimeMin: 60 + 30,      wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 14, hours: 6.0, feel: 2, bedtimeMin: 30,           wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 16, hours: 8.0, feel: 3, bedtimeMin: 23 * 60,      wakeTimeMin: 7 * 60 },
  { daysAgo: 17, hours: 9.0, feel: 4, bedtimeMin: 22 * 60,      wakeTimeMin: 7 * 60 },
  { daysAgo: 18, hours: 6.0, feel: 1, bedtimeMin: 30,           wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 19, hours: 7.0, feel: 2, bedtimeMin: 23 * 60 + 30, wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 21, hours: 5.5, feel: 1, bedtimeMin: 60,           wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 22, hours: 6.5, feel: 2, bedtimeMin: 0,            wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 23, hours: 8.5, feel: 3, bedtimeMin: 23 * 60,      wakeTimeMin: 7 * 60 + 30 },
  { daysAgo: 24, hours: 8.0, feel: 3, bedtimeMin: 22 * 60 + 30, wakeTimeMin: 6 * 60 + 30 },
  { daysAgo: 26, hours: 6.0, feel: 1, bedtimeMin: 0,            wakeTimeMin: 6 * 60 },
  { daysAgo: 27, hours: 7.0, feel: 2, bedtimeMin: 23 * 60 + 30, wakeTimeMin: 6 * 60 + 30 },
];

const isoDate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const buildSleepLogFixture = (): SleepLogEntry[] => {
  const today = new Date();
  return SLEEP_LOG_OFFSETS.map(({ daysAgo, ...rest }) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return { date: isoDate(d), ...rest };
  });
};

const defaults = {
  mood: 2,
  sleepFeel: 2,
  sleepHours: 6.5,
  bedtimeMin: 30,
  wakeTimeMin: 420,
  sleepRecorded: false,
  moveMinutes: 25,
  moveDone: true,
  foodLogged: 2,
  streak: 3,
  sleepWeekly: [6, 7.5, 5, 6.5, 8, 0, 0] as number[],
  sleepLog: buildSleepLogFixture(),
  // Exercise
  exerciseType: '' as string,
  exerciseDuration: 30,
  exerciseIntensity: 2,
  exerciseMood: 2,
  exerciseRecorded: false,
  exerciseWeekly: [30, 0, 45, 20, 0, 0, 0] as number[],
};

type PaceStateShape = typeof defaults;

const load = (): PaceStateShape => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // sleepLog 屬於 fixture，不從 localStorage 還原（避免日期過期）
    if (raw) return { ...defaults, ...JSON.parse(raw), sleepLog: defaults.sleepLog };
  } catch { /* localStorage 不可用（隱私模式、quota 已滿）時忽略，不中斷 app */ }
  return { ...defaults };
};

const target = load();

// /export 會在載入時塞 fixture 值，不要把它寫回 localStorage 覆蓋使用者真實資料
const isExportPath = typeof window !== 'undefined' && window.location.pathname === '/export';

export const PaceState = new Proxy(target, {
  set(obj, key, value) {
    (obj as Record<string | symbol, unknown>)[key] = value;
    if (!isExportPath) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch { /* localStorage 不可用（隱私模式、quota 已滿）時忽略，不中斷 app */ }
    }
    return true;
  },
});
