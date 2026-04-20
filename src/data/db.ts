// Pace — Google Sheets prototype DB (via Apps Script Web App)
//
// 部署步驟見 plan。拿到 Web app URL 後，貼到下面的 DB_URL 常數。
// URL 格式：https://script.google.com/macros/s/AKfy.../exec
//
// 說明：寫入用 POST、讀取用 GET。為避開 CORS preflight，POST 用 text/plain。
// Prototype 用：fire-and-forget、沒做 error handling、沒做 loading state。

const DB_URL = 'https://script.google.com/macros/s/AKfycbwX2ydUSVZKRaWCMfvtbrjWQQQApSjcUr-yjXV4ABAqeFzfaJg_EXWRWNGj-jc6bkWP3w/exec';

export type SleepRow = {
  timestamp: string; // ISO 8601
  date: string;      // YYYY-MM-DD
  hours: number;
  feel: number;      // 0–4
  note: string;
};

export type ExerciseRow = {
  timestamp: string;
  date: string;
  type: string;       // walk / run / yoga ...
  duration: number;   // 分鐘
  intensity: number;  // 0–4
  mood: number;       // 0–4
};

type SheetName = 'sleep' | 'exercise';

export async function fetchRows<T = unknown>(sheet: SheetName): Promise<T[]> {
  try {
    const r = await fetch(`${DB_URL}?sheet=${sheet}`);
    return (await r.json()) as T[];
  } catch (e) {
    console.warn('[db] fetchRows failed', e);
    return [];
  }
}

export function appendRow(sheet: SheetName, record: SleepRow | ExerciseRow): void {
  // Fire-and-forget：不 await、不擋 UI
  fetch(DB_URL, {
    method: 'POST',
    // 用 text/plain 避開 CORS preflight（Apps Script 不支援 OPTIONS）
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ sheet, record }),
  }).catch((e) => console.warn('[db] appendRow failed', e));
}

// Helper：產生 timestamp / date 欄位
export function nowFields() {
  const now = new Date();
  return {
    timestamp: now.toISOString(),
    date: now.toISOString().slice(0, 10),
  };
}
