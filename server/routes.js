import { Router } from 'express'
import { db } from './db.js'
import { getVatBreakdown } from '../src/vat.js'
import { getDeliveryQuote } from '../src/delivery.js'

const router = Router()

const insertOrder = db.prepare(`
  INSERT INTO orders (created_at, cart, address, payment_method, subtotal, vat, delivery_fee, delivery_size, total, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
`)
const getOrderById = db.prepare('SELECT * FROM orders WHERE id = ?')
const updateOrderStatus = db.prepare('UPDATE orders SET status = ? WHERE id = ?')

function serializeOrder(row) {
  if (!row) return null
  return {
    orderId: row.id,
    status: row.status,
    subtotal: row.subtotal,
    vat: row.vat,
    deliveryFee: row.delivery_fee,
    deliverySize: row.delivery_size,
    total: row.total,
    paymentMethod: row.payment_method,
  }
}

router.get('/health', (req, res) => {
  res.json({ ok: true })
})

// Server recomputes VAT and the delivery quote from the cart itself, rather
// than trusting whatever totals the client displayed, so the charged amount
// can't be tampered with client-side.
router.post('/orders', (req, res) => {
  const { cart, address, paymentMethod } = req.body ?? {}

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' })
  }
  if (!address?.fullName) {
    return res.status(400).json({ error: 'Delivery address is required.' })
  }
  if (!paymentMethod) {
    return res.status(400).json({ error: 'Payment method is required.' })
  }

  const merchandiseTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0)
  const { subtotal, vat } = getVatBreakdown(merchandiseTotal)
  const delivery = getDeliveryQuote(cart)
  const total = merchandiseTotal + delivery.fee

  const result = insertOrder.run(
    new Date().toISOString(),
    JSON.stringify(cart),
    JSON.stringify(address),
    paymentMethod,
    subtotal,
    vat,
    delivery.fee,
    delivery.size,
    total
  )

  const orderId = Number(result.lastInsertRowid)
  res.status(201).json(serializeOrder(getOrderById.get(orderId)))
})

// There's no real payment gateway behind Mastercard/PayPal/EFT in this demo —
// this just marks the order as paid.
router.post('/orders/:id/confirm', (req, res) => {
  const order = getOrderById.get(Number(req.params.id))
  if (!order) return res.status(404).json({ error: 'Order not found.' })

  updateOrderStatus.run('paid', order.id)
  res.json(serializeOrder(getOrderById.get(order.id)))
})

router.get('/orders/:id', (req, res) => {
  const order = getOrderById.get(Number(req.params.id))
  if (!order) return res.status(404).json({ error: 'Order not found.' })
  res.json(serializeOrder(order))
})

export default router
