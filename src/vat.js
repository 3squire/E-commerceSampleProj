export const VAT_RATE = 0.15

export function getVatBreakdown(totalInclVat) {
  const subtotal = totalInclVat / (1 + VAT_RATE)
  const vat = totalInclVat - subtotal
  return { subtotal, vat, total: totalInclVat }
}
