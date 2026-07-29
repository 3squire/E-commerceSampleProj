import { useState } from 'react'
import './Address.css'

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

const defaultAddress = {
  fullName: '',
  addressLine: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
}

function Address({ address: providedAddress, onChange, onSubmit, onBack }) {
  const [formAddress, setFormAddress] = useState(defaultAddress)
  const isControlled = providedAddress !== undefined && typeof onChange === 'function'
  const address = isControlled ? providedAddress : formAddress

  const handleChange = (event) => {
    if (isControlled) {
      onChange(event)
      return
    }

    const { name, value } = event.target
    setFormAddress((currentAddress) => ({
      ...currentAddress,
      [name]: value,
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
            <input name="postalCode" value={address.postalCode} onChange={handleChange} required />
          </label>
          <label>
            Phone number
            <input name="phone" value={address.phone} onChange={handleChange} required />
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