import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export function formatCurrency(value?: number = 0): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatLocaleDate(date: string) {
  const baseDate = new Date(date)
  const formatted = format(baseDate, "d MMMM yyyy HH.mm 'WIB'", { locale: id })
  return formatted
}