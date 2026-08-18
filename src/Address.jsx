import { useState } from 'react'
import './Address.css'
import { getDeliveryQuote } from './delivery.js'

const southAfricanProvinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
]

export const defaultAddress = {
  fullName: '',
  addressLine: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
}

function Address({ address: providedAddress, onChange, onSubmit, onBack, cart = [] }) {
  const [formAddress, setFormAddress] = useState(defaultAddress)
  const isControlled = providedAddress !== undefined && typeof onChange === 'function'
  const address = isControlled ? providedAddress : formAddress
  const delivery = getDeliveryQuote(cart)

  const sanitizeValue = (name, value) => {
    if (name === 'postalCode') {
      return value.replace(/\D/g, '').slice(0, 4)
    }

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').replace(/^27/, '').slice(0, 9)
      const part1 = digits.slice(0, 2)
      const part2 = digits.slice(2, 5)
      const part3 = digits.slice(5, 9)

      if (!digits) return ''
      if (part1 && part2 && part3) return `(+27) ${part1} ${part2} ${part3}`
      if (part1 && part2) return `(+27) ${part1} ${part2}`
      if (part1) return `(+27) ${part1}`
      return '(+27)'
    }

    return value
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValue = sanitizeValue(name, value)

    if (isControlled) {
      onChange({ target: { name, value: nextValue } })
      return
    }

    setFormAddress((currentAddress) => ({
      ...currentAddress,
      [name]: nextValue,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (onSubmit) {
      onSubmit(event)
      return
    }

    try {
      const toSave = isControlled ? providedAddress : formAddress
      localStorage.setItem('address', JSON.stringify(toSave))
    } catch {
      // ignore storage errors
    }
  }

  return (
    <section className="address-page">
      <div className="address-page__intro">
        <p className="eyebrow">Checkout</p>
        <h2>Where should we deliver your order?</h2>
        <p>Enter your delivery details to continue with your purchase.</p>
      </div>

      <form className="checkout-card address-form" onSubmit={handleSubmit}>
        <div className="checkout-card__header">
          <div>
            <p className="address-form__step">Step 1 of 2</p>
            <h3>Delivery address</h3>
          </div>
          <button type="button" className="text-btn" onClick={onBack ?? (() => {})}>
            Back
          </button>
        </div>

        <div className="courier-notice">
          <span className="courier-badge">The Courier Guy</span>
          <p>R{delivery.fee.toLocaleString()} delivery fee ({delivery.label}), 2 - 4 business days nationwide.</p>
        </div>

        <div className="form-grid">
          <label>
            Full name
            <input name="fullName" value={address.fullName} onChange={handleChange} required />
          </label>
          <label>
            Address line
            <input name="addressLine" value={address.addressLine} onChange={handleChange} required />
          </label>
          <label>
            City
            <input name="city" value={address.city} onChange={handleChange} required />
          </label>
          <label>
            Province
            <select name="state" value={address.state} onChange={handleChange} required>
              <option value="" disabled>
                Select a province
              </option>
              {southAfricanProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </label>
          <label>
            Postal code
            <input
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              required
            />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              value={address.phone}
              onChange={handleChange}
              inputMode="tel"
              pattern="\(\+27\) [0-9]{2} [0-9]{3} [0-9]{4}"
              placeholder="(+27) 12 345 6789"
              maxLength={18}
              required
            />
          </label>
        </div>

        <div className="address-form__footer">
          <p>Your information is used only to deliver this order.</p>
          <button type="submit" className="primary-btn">
            Continue to payment
          </button>
        </div>
      </form>
    </section>
  )
}

export default Address