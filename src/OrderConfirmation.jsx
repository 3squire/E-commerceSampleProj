import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './OrderConfirmation.css'
import { getOrder } from './api.js'

function OrderConfirmation({ address = { fullName: '' }, onBackHome, setCart = () => {} }) {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  let deliveryAddress = address
  if (!deliveryAddress || !deliveryAddress.fullName) {
    try {
      const stored = localStorage.getItem('address')
      if (stored) deliveryAddress = JSON.parse(stored)
    } catch {
      // ignore storage errors
    }
  }

  useEffect(() => {
    if (!orderId) return
    let cancelled = false
    let attempts = 0

    const poll = async () => {
      try {
        const fetched = await getOrder(orderId)
        if (cancelled) return
        setOrder(fetched)

        if (fetched.status === 'paid') {
          setCart([])
          return
        }
        if (fetched.status === 'pending' && attempts < 6) {
          attempts += 1
          setTimeout(poll, 1500)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      }
    }

    poll()
    return () => {
      cancelled = true
    }
  }, [orderId, setCart])

  const statusMessage = !orderId
    ? ''
    : order?.status === 'paid'
      ? 'Payment received.'
      : order?.status === 'failed'
        ? 'Payment was not completed — please try again from your cart.'
        : 'Confirming your payment…'

  return (
    <section className="order-confirmation">
      <div className="checkout-card order-confirmation__card">
        <div className="order-confirmation__check" aria-hidden="true">
          ✓
        </div>
        <h2>Thank you for your order!</h2>
        <p>
          Your order has been placed and will be delivered to your address
          {deliveryAddress?.fullName ? `, ${deliveryAddress.fullName}` : ''}!
        </p>
        <p className="order-confirmation__courier">
          Delivered by <strong>The Courier Guy</strong>, 2–4 business days.
        </p>
        {statusMessage && <p className="order-confirmation__status">{statusMessage}</p>}
        {order?.paymentMethod && <p className="order-confirmation__payment-method">Paid via {order.paymentMethod}</p>}
        {error && <p className="order-confirmation__status order-confirmation__status--error">{error}</p>}

        <button type="button" className="primary-btn" onClick={onBackHome ?? (() => {})}>
          Back to Home
        </button>
      </div>
    </section>
  )
}

export default OrderConfirmation
