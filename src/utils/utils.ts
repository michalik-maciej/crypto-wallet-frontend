export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export function percentChange({
  initial,
  current
}: {
  initial: number
  current: number
}) {
  return `${((current / initial - 1) * 100).toFixed(2)}%`
}

export function compareStrings(strA: string, strB: string) {
  if (strA.toUpperCase() < strB.toUpperCase()) return -1
  if (strA.toUpperCase() > strB.toUpperCase()) return 1
  return 0
}

export function timestampToDate(timestamp: number) {
  const rawDate = new Date(timestamp)
  const date = `${rawDate.getUTCFullYear()}-${String(
    rawDate.getUTCMonth() + 1
  ).padStart(2, '0')}-${String(rawDate.getUTCDate()).padStart(2, '0')}`

  return date
}

export function formatToUSD(num: number) {
  return `$${num.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })}`
}
