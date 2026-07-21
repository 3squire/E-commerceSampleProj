import './Address.css'

function Address({
  address = {
    fullName: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
  },
  onChange = () => {},
  onSubmit = (event) => event.preventDefault(),
  onBack = () => {},
}) {
  return (
    <form className="checkout-card" onSubmit={onSubmit}>
      <div className="checkout-card__header">
        <h3>Delivery address</h3>
        <button type="button" className="text-btn" onClick={onBack}>
          Back
        </button>
      </div>

      <div className="form-grid">
        <label>
          Full name
          <input name="fullName" value={address.fullName} onChange={onChange} required />
        </label>
        <label>
          Address line
          <input name="addressLine" value={address.addressLine} onChange={onChange} required />
        </label>
        <label>
          City
          <input name="city" value={address.city} onChange={onChange} required />
        </label>
        <label>
          State
          <input name="state" value={address.state} onChange={onChange} required />
        </label>
        <label>
          Postal code
          <input name="postalCode" value={address.postalCode} onChange={onChange} required />
        </label>
        <label>
          Phone number
          <input name="phone" value={address.phone} onChange={onChange} required />
        </label>
      </div>

      <button type="submit" className="primary-btn">
        Continue to payment
      </button>
    </form>
  )
}

export default Address;