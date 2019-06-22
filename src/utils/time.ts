export const second = 1000;
export const minute = 60 * second;
export const hour = 60 * minute;
export const day = 24 * hour;
export const year = 365 * day;

export function addLeadingZero(input: number) {
  return String(input).padStart(2, "0");
}

export function timestampToDateInputValue(timestamp: number): string {
  const date = new Date(timestamp);

  const value =
    date.getUTCFullYear() +
    "-" +
    addLeadingZero(date.getUTCMonth() + 1) +
    "-" +
    addLeadingZero(date.getUTCDate());

  return value;
}
