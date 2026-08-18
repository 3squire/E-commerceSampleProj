import { useState } from 'react'
import './Payment.css'
import { getVatBreakdown } from './vat.js'
import { getDeliveryQuote } from './delivery.js'

export const defaultPayment = {
  paymentMethod: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  paypalEmail: '',
  paypalPassword: '',
}

function Payment({ payment: providedPayment, onChange, onSubmit, onBack, address = { fullName: '' }, total = 0, itemCount = 0, cart = [], isSubmitting = false, error = '' }) {
  const [formPayment, setFormPayment] = useState(defaultPayment)
  const isControlled = providedPayment !== undefined && typeof onChange === 'function'
  const payment = isControlled ? providedPayment : formPayment

  const effectiveTotal = total || 0
  const effectiveItemCount = itemCount || 0
  const { subtotal, vat } = getVatBreakdown(effectiveTotal)
  const delivery = getDeliveryQuote(cart)
  const grandTotal = effectiveTotal + delivery.fee

  const sanitizeValue = (name, value) => {
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16)
      const part1 = digits.slice(0, 4)
      const part2 = digits.slice(4, 8)
      const part3 = digits.slice(8, 12)
      const part4 = digits.slice(12, 16)

      return [part1, part2, part3, part4].filter(Boolean).join(' ')
    }

    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4)
      if (digits.length <= 2) return digits
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }

    if (name === 'cvc') {
      return value.replace(/\D/g, '').slice(0, 3)
    }

    return value
  }

  let effectiveAddress = address
  if (!effectiveAddress || !effectiveAddress.fullName) {
    try {
      const stored = localStorage.getItem('address')
      if (stored) effectiveAddress = JSON.parse(stored)
    } catch {
      // ignore
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValue = sanitizeValue(name, value)

    if (isControlled) {
      onChange({ target: { name, value: nextValue } })
      return
    }

    setFormPayment((currentPayment) => ({
      ...currentPayment,
      [name]: nextValue,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (onSubmit) {
      onSubmit(event)
      return
    }
  }

  return (
    <form className="checkout-card address-form" onSubmit={handleSubmit}>
      <div className="checkout-card__header">
        <div>
          <p className="address-form__step">Step 2 of 2</p>
          <h3>Payment</h3>
        </div>
        <button type="button" className="text-btn" onClick={onBack ?? (() => {})}>
          Back
        </button>
      </div>

      <div className="payment-summary">
        <p>Delivering to {effectiveAddress?.fullName || 'your address'}</p>
        <p>{effectiveItemCount} cart {effectiveItemCount === 1 ? 'item' : 'items'}</p>
        <div className="order-totals">
          <div>
            <span>Subtotal (excl. VAT)</span>
            <span>R{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div>
            <span>VAT (15%)</span>
            <span>R{vat.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div>
            <span>Delivery - The Courier Guy ({delivery.label})</span>
            <span>R{delivery.fee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="order-totals__grand">
            <span>Total</span>
            <span>R{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Payment method
          <select name="paymentMethod" value={payment.paymentMethod} onChange={handleChange} required>
            <option value="" disabled>
              Select a payment method
            </option>
            <option value="Mastercard">Mastercard</option>
            <option value="PayPal">PayPal</option>
            <option value="EFT">EFT</option>
          </select>
        </label>

        {payment.paymentMethod === 'Mastercard' && (
          <>
            <label>
              Cardholder name
              <input name="cardName" value={payment.cardName} onChange={handleChange} required />
            </label>
            <label>
              Card number
              <input
                name="cardNumber"
                value={payment.cardNumber}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                required
              />
            </label>
            <label>
              Expiry date
              <input
                name="expiry"
                value={payment.expiry}
                onChange={handleChange}
                inputMode="numeric"
                pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                maxLength={5}
                placeholder="MM/YY"
                required
              />
            </label>
            <label>
              CVC
              <input
                name="cvc"
                value={payment.cvc}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]{3}"
                maxLength={3}
                required
              />
            </label>
          </>
        )}

        {payment.paymentMethod === 'PayPal' && (
          <>
            <label>
              PayPal email
              <input name="paypalEmail" value={payment.paypalEmail} onChange={handleChange} required />
            </label>
            <label>
              PayPal password
              <input name="paypalPassword" type="password" value={payment.paypalPassword} onChange={handleChange} required />
            </label>
          </>
        )}
      </div>

      {error && <p className="payment-error">{error}</p>}

      <div className="address-form__footer payment-form__footer">
        <span className="payment-form__hint">Secure checkout</span>
        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Processing…' : 'Pay now'}
        </button>
      </div>
    </form>
  )
}

export default Payment
