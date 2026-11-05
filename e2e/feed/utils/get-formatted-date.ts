export const getFormattedDate = (date: Date) => {
  const parts = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(date)

  const p = Object.fromEntries(parts.map((item) => [item.type, item.value]))

  return `${p.day}.${p.month}.${p.year} в ${p.hour}:${p.minute}`
}
