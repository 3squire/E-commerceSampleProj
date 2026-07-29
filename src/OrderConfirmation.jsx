import './OrderConfirmation.css'

function OrderConfirmation({ address = { fullName: '' }, onBackHome }) {
  let deliveryAddress = address
  if (!deliveryAddress || !deliveryAddress.fullName) {
    try {
      const stored = localStorage.getItem('address')
      if (stored) deliveryAddress = JSON.parse(stored)
    } catch {
      // ignore storage errors
    }
  }

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

        <button type="button" className="primary-btn" onClick={onBackHome ?? (() => {})}>
          Back to Home
        </button>
      </div>
    </section>
  )
}

export default OrderConfirmation
