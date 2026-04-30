// Pace — simple shared mutable state (prototype-level)
// 透過 Proxy 攔截 set，把狀態同步寫進 localStorage，
// 讓 PWA 安裝後重開 app 可以還原上次資料。既有 call site 寫法不變（PaceState.foo = bar）。

const STORAGE_KEY = 'pace.state.v1';

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
    if (raw) return { ...defaults, ...JSON.parse(raw) };
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
