export type OpeningHours = readonly { day: number; open: string | null; close: string | null }[];

/** A moment in office-local time: weekday (0 = Sunday … 6 = Saturday) and minutes since midnight. */
export type LocalTime = { day: number; minutes: number };

export type OfficeStatus =
  | { open: true }
  // inDays: 0 = later today, 1 = tomorrow, 2+ = a later weekday
  | { open: false; nextDay: number; inDays: number };

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Current weekday and time in the given time zone, whatever the visitor's own zone. */
export function localTime(timeZone: string, date = new Date()): LocalTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return { day: WEEKDAYS.indexOf(get('weekday')), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function officeStatus(now: LocalTime, hours: OpeningHours): OfficeStatus {
  const today = hours.find((h) => h.day === now.day);
  if (today?.open && today.close && now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close)) {
    return { open: true };
  }
  // Next opening: later today if we're before opening time, otherwise the next open weekday.
  for (let inDays = 0; inDays <= 7; inDays++) {
    const day = (now.day + inDays) % 7;
    const h = hours.find((x) => x.day === day);
    if (!h?.open) continue;
    if (inDays === 0 && now.minutes >= toMinutes(h.open)) continue;
    return { open: false, nextDay: day, inDays };
  }
  return { open: false, nextDay: -1, inDays: -1 };
}
