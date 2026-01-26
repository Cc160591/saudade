/**
 * Utility per la formattazione di valuta, date e numeri secondo gli standard italiani.
 */

const CURRENCY_FORMATTER = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
})

const NUMBER_FORMATTER = new Intl.NumberFormat('it-IT', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/**
 * Formatta un numero in Euro (€ 1.234,56).
 */
export function formatCurrency(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined) return '€ 0,00'
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return CURRENCY_FORMATTER.format(num || 0)
}

/**
 * Formatta un numero con separatore delle migliaia e virgola decimale (1.234,56).
 */
export function formatNumber(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined) return '0,00'
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return NUMBER_FORMATTER.format(num || 0)
}

/**
 * Formatta una data in formato italiano (DD/MM/YYYY).
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return 'N/D'
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/Rome'
  })
}

/**
 * Parsa un importo inserito dall'utente (es. "1.234,56" o "€ 123,00") in un numero.
 */
export function parseItalianAmount(value: string): number {
  if (!value) return 0
  const cleanValue = value
    .replace('€', '')
    .replace(/\s/g, '')
    .replace(/\./g, '') // Rimuove separatore migliaia
    .replace(',', '.')  // Converte virgola decimale in punto
  return parseFloat(cleanValue) || 0
}
