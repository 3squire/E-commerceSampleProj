// Single source of truth for departments and products.
// Home ("Shop by Department"), the department filter, and the Products grid
// all read from here so their categories always agree.
//
// Every product has its OWN image. The individual photos were sliced out of
// the *-sheet.png contact sheets in assets/products (see slice-sheets.cjs),
// so each item in a department shows a distinct product picture.

// Laptops
import laptop1 from './assets/products/laptop-1.png'
import laptop2 from './assets/products/laptop-2.png'
import laptop3 from './assets/products/laptop-3.png'
import laptop4 from './assets/products/laptop-4.png'

// Phones
import phone1 from './assets/products/phone-1.png'
import phone2 from './assets/products/phone-2.png'
import phone3 from './assets/products/phone-3.png'
import phone4 from './assets/products/phone-4.png'

// Desktop PCs
import pc1 from './assets/products/pc-1.png'
import pc2 from './assets/products/pc-2.png'
import pc3 from './assets/products/pc-3.png'
import pc4 from './assets/products/pc-4.png'

// Audio
import audio1 from './assets/products/audio-1.png'
import audio2 from './assets/products/audio-2.png'
import audio3 from './assets/products/audio-3.png'
import audio4 from './assets/products/audio-4.png'

// Smart Watches
import watch1 from './assets/products/watch-1.png'
import watch2 from './assets/products/watch-2.png'
import watch3 from './assets/products/watch-3.png'
import watch4 from './assets/products/watch-4.png'

// Cameras
import camera1 from './assets/products/camera-1.png'
import camera2 from './assets/products/camera-2.png'
import camera3 from './assets/products/camera-3.png'
import camera4 from './assets/products/camera-4.png'

// Keyboards
import keyboard1 from './assets/products/keyboard-1.png'
import keyboard2 from './assets/products/keyboard-2.png'
import keyboard3 from './assets/products/keyboard-3.png'
import keyboard4 from './assets/products/keyboard-4.png'

// Tablets
import tablet1 from './assets/products/tablet-1.png'
import tablet2 from './assets/products/tablet-2.png'
import tablet3 from './assets/products/tablet-3.png'
import tablet4 from './assets/products/tablet-4.png'

// Department names are the values passed in the ?department= query string.
// The department card uses the first product image in that department.
export const departments = [
  { name: 'Laptops', image: laptop1 },
  { name: 'Phones', image: phone1 },
  { name: 'Desktop PCs', image: pc1 },
  { name: 'Audio', image: audio1 },
  { name: 'Smart Watches', image: watch1 },
  { name: 'Cameras', image: camera1 },
  { name: 'Keyboards', image: keyboard1 },
  { name: 'Tablets', image: tablet1 },
]

export const products = [
  // Laptops
  {
    id: 1,
    name: 'NerdyBook Pro 15',
    brand: 'DugsonTech',
    department: 'Laptops',
    description: 'Intel Core i7, 16GB RAM, 512GB SSD, sleek silver chassis.',
    price: 18999,
    image: laptop1,
  },
  {
    id: 2,
    name: 'NerdyBook Gaming RTX',
    brand: 'DugsonTech',
    department: 'Laptops',
    description: 'Ryzen 9, RTX GPU, 32GB RAM, high-refresh display.',
    price: 24999,
    image: laptop2,
  },
  {
    id: 3,
    name: 'NerdyBook Neon RGB',
    brand: 'DugsonTech',
    department: 'Laptops',
    description: 'RGB backlit keyboard, Core i9, 1TB SSD, 240Hz screen.',
    price: 27999,
    image: laptop3,
  },
  {
    id: 4,
    name: 'NerdyBook Air 13',
    brand: 'DugsonTech',
    department: 'Laptops',
    description: 'Ultra-light white shell, Intel Core i5, 8GB RAM, 256GB SSD.',
    price: 11999,
    image: laptop4,
  },

  // Phones
  {
    id: 5,
    name: 'Galaxy Pro Phone',
    brand: 'DugsonTech',
    department: 'Phones',
    description: '6.7" AMOLED display, 256GB storage, triple camera.',
    price: 12999,
    image: phone1,
  },
  {
    id: 6,
    name: 'Galaxy Edge Phone',
    brand: 'DugsonTech',
    department: 'Phones',
    description: '6.5" curved OLED, 128GB storage, fast 65W charging.',
    price: 10499,
    image: phone2,
  },
  {
    id: 7,
    name: 'Galaxy Nature Phone',
    brand: 'DugsonTech',
    department: 'Phones',
    description: 'Forest-green finish, 6.4" OLED, triple 50MP camera.',
    price: 9999,
    image: phone3,
  },
  {
    id: 8,
    name: 'Galaxy Lite Phone',
    brand: 'DugsonTech',
    department: 'Phones',
    description: '6.1" OLED display, 64GB storage, dual camera.',
    price: 7999,
    image: phone4,
  },

  // Desktop PCs
  {
    id: 9,
    name: 'Gaming Beast RTX',
    brand: 'DugsonTech',
    department: 'Desktop PCs',
    description: 'Ryzen 9, RTX GPU, 32GB RAM, RGB liquid cooled.',
    price: 25999,
    image: pc1,
  },
  {
    id: 10,
    name: 'Compact Mini PC',
    brand: 'DugsonTech',
    department: 'Desktop PCs',
    description: 'Tiny footprint, Core i5, 16GB RAM, 512GB SSD.',
    price: 8999,
    image: pc2,
  },
  {
    id: 11,
    name: 'Creator Tower Silver',
    brand: 'DugsonTech',
    department: 'Desktop PCs',
    description: 'Brushed-aluminium tower, Core i7, 32GB RAM, 1TB SSD.',
    price: 16999,
    image: pc3,
  },
  {
    id: 12,
    name: 'Office Tower Pro',
    brand: 'DugsonTech',
    department: 'Desktop PCs',
    description: 'Intel Core i5, 16GB RAM, 1TB SSD, integrated graphics.',
    price: 13999,
    image: pc4,
  },

  // Audio
  {
    id: 13,
    name: 'Nerdy Audio Max',
    brand: 'DugsonTech',
    department: 'Audio',
    description: 'Over-ear headphones, adaptive noise control, 40-hour battery.',
    price: 2499,
    image: audio1,
  },
  {
    id: 14,
    name: 'Nerdy Buds Pro',
    brand: 'DugsonTech',
    department: 'Audio',
    description: 'Wireless earbuds with active noise cancelling.',
    price: 1499,
    image: audio2,
  },
  {
    id: 15,
    name: 'Nerdy Bookshelf Speakers',
    brand: 'DugsonTech',
    department: 'Audio',
    description: 'Wooden bookshelf pair, rich bass, Bluetooth 5.3.',
    price: 3299,
    image: audio3,
  },
  {
    id: 16,
    name: 'Nerdy Soundbar Slim',
    brand: 'DugsonTech',
    department: 'Audio',
    description: 'Slim TV soundbar with wireless subwoofer support.',
    price: 2799,
    image: audio4,
  },

  // Smart Watches
  {
    id: 17,
    name: 'Smart Watch Pro',
    brand: 'DugsonTech',
    department: 'Smart Watches',
    description: 'Round AMOLED, track workouts, sleep, and notifications.',
    price: 1899,
    image: watch1,
  },
  {
    id: 18,
    name: 'Smart Watch Sport',
    brand: 'DugsonTech',
    department: 'Smart Watches',
    description: 'Woven sport band, GPS, heart-rate, 5ATM water resistant.',
    price: 1699,
    image: watch2,
  },
  {
    id: 19,
    name: 'Smart Watch Classic',
    brand: 'DugsonTech',
    department: 'Smart Watches',
    description: 'Leather strap, chronograph dials, always-on display.',
    price: 2199,
    image: watch3,
  },
  {
    id: 20,
    name: 'Smart Watch Lite',
    brand: 'DugsonTech',
    department: 'Smart Watches',
    description: 'Everyday fitness tracking with a 7-day battery life.',
    price: 1199,
    image: watch4,
  },

  // Cameras
  {
    id: 21,
    name: 'Creator Camera 4K',
    brand: 'DugsonTech',
    department: 'Cameras',
    description: 'DSLR-style 4K shooter with 18-55mm zoom lens.',
    price: 8999,
    image: camera1,
  },
  {
    id: 22,
    name: 'Street Rangefinder',
    brand: 'DugsonTech',
    department: 'Cameras',
    description: 'Retro rangefinder, fixed prime lens, silver-top body.',
    price: 10499,
    image: camera2,
  },
  {
    id: 23,
    name: 'Mirrorless Pro',
    brand: 'DugsonTech',
    department: 'Cameras',
    description: 'Full-frame mirrorless, in-body stabilisation, 4K60.',
    price: 15999,
    image: camera3,
  },
  {
    id: 24,
    name: 'Rugged Adventure Cam',
    brand: 'DugsonTech',
    department: 'Cameras',
    description: 'Waterproof, shockproof compact for the outdoors.',
    price: 4499,
    image: camera4,
  },

  // Keyboards
  {
    id: 25,
    name: 'Nerdy Mechanical RGB',
    brand: 'DugsonTech',
    department: 'Keyboards',
    description: 'Full-size hot-swap mechanical board with per-key RGB.',
    price: 1799,
    image: keyboard1,
  },
  {
    id: 26,
    name: 'Nerdy Retro TKL',
    brand: 'DugsonTech',
    department: 'Keyboards',
    description: 'Tenkeyless retro keycaps, tactile switches, USB-C.',
    price: 1499,
    image: keyboard2,
  },
  {
    id: 27,
    name: 'Nerdy Frost Wireless',
    brand: 'DugsonTech',
    department: 'Keyboards',
    description: 'White wireless board, blue backlight, 3-device Bluetooth.',
    price: 1599,
    image: keyboard3,
  },
  {
    id: 28,
    name: 'Nerdy Gamer Pro',
    brand: 'DugsonTech',
    department: 'Keyboards',
    description: 'Gaming board with orange accents and dedicated macro keys.',
    price: 1999,
    image: keyboard4,
  },

  // Tablets
  {
    id: 29,
    name: 'Nerdy Tab Studio',
    brand: 'DugsonTech',
    department: 'Tablets',
    description: '11" tablet with detachable keyboard folio, 256GB.',
    price: 9499,
    image: tablet1,
  },
  {
    id: 30,
    name: 'Nerdy Tab Air',
    brand: 'DugsonTech',
    department: 'Tablets',
    description: 'Slim 10.9" tablet, 120Hz display, all-day battery.',
    price: 7499,
    image: tablet2,
  },
  {
    id: 31,
    name: 'Nerdy Tab Create',
    brand: 'DugsonTech',
    department: 'Tablets',
    description: '10.2" tablet bundled with a precision stylus pen.',
    price: 6299,
    image: tablet3,
  },
  {
    id: 32,
    name: 'Nerdy Tab Rugged',
    brand: 'DugsonTech',
    department: 'Tablets',
    description: 'Shockproof tablet with built-in kickstand for the field.',
    price: 8299,
    image: tablet4,
  },
]
