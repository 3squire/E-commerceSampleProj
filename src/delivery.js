export const BOX_SIZES = {
  small: { label: 'Small box', fee: 69 },
  medium: { label: 'Medium box', fee: 99 },
  large: { label: 'Large box', fee: 179 },
}

const SIZE_ORDER = ['small', 'medium', 'large']

const DEPARTMENT_BOX_SIZE = {
  Phones: 'small',
  'Smart Watches': 'small',
  Audio: 'small',
  Keyboards: 'small',
  Cameras: 'medium',
  Tablets: 'medium',
  Laptops: 'medium',
  'Desktop PCs': 'large',
}

export function getDeliveryQuote(cart = []) {
  const size = cart.reduce((largest, item) => {
    const itemSize = DEPARTMENT_BOX_SIZE[item.department] ?? 'medium'
    return SIZE_ORDER.indexOf(itemSize) > SIZE_ORDER.indexOf(largest) ? itemSize : largest
  }, 'small')

  return { size, ...BOX_SIZES[size] }
}
