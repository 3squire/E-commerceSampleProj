import { useState } from 'react'
import './Payment.css'

export const defaultPayment = {
  paymentMethod: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  paypalEmail: '',
  paypalPassword: '',
}

function Payment({ payment: providedPayment, onChange, onSubmit, onBack, address = { fullName: '' }, total = 0, itemCount = 0 }) {
  const [formPayment, setFormPayment] = useState(defaultPayment)
  const isControlled = providedPayment !== undefined && typeof onChange === 'function'
  const payment = isControlled ? providedPayment : formPayment

  const effectiveTotal = total || 0
  const effectiveItemCount = itemCount || 0

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
    if (isControlled) {
      onChange(event)
      return
    }

    const { name, value } = event.target
    setFormPayment((currentPayment) => ({
      ...currentPayment,
      [name]: value,
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
        <p>{effectiveItemCount} cart {effectiveItemCount === 1 ? 'item' : 'items'} • Total R{effectiveTotal.toLocaleString()}</p>
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
              <input name="cardNumber" value={payment.cardNumber} onChange={handleChange} required />
            </label>
            <label>
              Expiry date
              <input name="expiry" value={payment.expiry} onChange={handleChange} required />
            </label>
            <label>
              CVC
              <input name="cvc" value={payment.cvc} onChange={handleChange} required />
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

      <button type="submit" className="primary-btn">
        Pay now
      </button>
    </form>
  )
}

export default Payment