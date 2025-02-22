export function formatLocalDateTime(date: Date, time: string) {
  return `${date.toISOString().split("T")[0]}T${time}`;
}
