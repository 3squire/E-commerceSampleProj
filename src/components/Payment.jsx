import './Payment.css'

function Payment({
  payment = { paymentMethod: '', cardName: '', cardNumber: '', expiry: '', cvc: '' },
  onChange = () => {},
  onSubmit = (event) => event.preventDefault(),
  onBack = () => {},
  address = { fullName: '' },
  total = 0,
  wishlist = [],
}) {
  const itemCount = wishlist.length || 0

  return (
    <form className="checkout-card" onSubmit={onSubmit}>
      <div className="checkout-card__header">
        <h3>Payment</h3>
        <button type="button" className="text-btn" onClick={onBack}>
          Back
        </button>
      </div>

      <div className="payment-summary">
        <p>Delivering to {address.fullName || 'your address'}</p>
        <p>{itemCount} items • Total R{total.toFixed(2)}</p>
      </div>

      <div className="form-grid">
        <label>
          Payment method
          <select name="paymentMethod" value={payment.paymentMethod} onChange={onChange} required>
            <option value="" disabled>
              Select a payment method
            </option>
            <option value="Mastercard">Mastercard</option>
            <option value="PayPal">PayPal</option>
          </select>
        </label>

        {payment.paymentMethod === 'Mastercard' && (
          <>
        <label>
          Cardholder name
          <input name="cardName" value={payment.cardName} onChange={onChange} required />
        </label>
        <label>
          Card number
          <input name="cardNumber" value={payment.cardNumber} onChange={onChange} required />
        </label>
        <label>
          Expiry date
          <input name="expiry" value={payment.expiry} onChange={onChange} required />
        </label>
        <label>
          CVC
          <input name="cvc" value={payment.cvc} onChange={onChange} required />
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

export default Payment;