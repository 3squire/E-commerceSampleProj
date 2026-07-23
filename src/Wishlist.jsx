import { useState } from 'react'
import techyImage from './assets/techy.jpeg'
import Address from './Address.jsx'
import Payment from './Payment.jsx'
import './Wishlist.css'

const featuredItems = [
  {
    id: 1,
    name: 'Aurora Lamp',
    tag: 'Lighting',
    price: 'R89',
    blurb: 'A soft-glow desk lamp with a calming ambient mode.',
  },
  {
    id: 2,
    name: 'Nova Headphones',
    tag: 'Audio',
    price: 'R179',
    blurb: 'Immersive sound with noise reduction for focused work.',
  },
  {
    id: 3,
    name: 'Orbit Mouse',
    tag: 'Peripherals',
    price: 'R59',
    blurb: 'An ergonomic gadget designed for comfort all day long.',
  },
]

function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const [step, setStep] = useState('wishlist')
  const [address, setAddress] = useState({
    fullName: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
  })
  const [payment, setPayment] = useState({
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [orderComplete, setOrderComplete] = useState(false)

  const handleSave = (item) => {
    setWishlist((current) => {
      if (current.some((savedItem) => savedItem.id === item.id)) {
        return current
      }

      return [...current, item]
    })
  }

  const handleAddressChange = (event) => {
    const { name, value } = event.target
    setAddress((current) => ({ ...current, [name]: value }))
  }

  const handlePaymentChange = (event) => {
    const { name, value } = event.target
    setPayment((current) => ({ ...current, [name]: value }))
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = (event) => {
    event.preventDefault()
    setOrderComplete(true)
    setStep('complete')
  }

  const total = wishlist.reduce((sum, item) => sum + Number(item.price.replace('R', '')), 0)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <img src={techyImage} alt="Techy icon" className="brand-icon" />
          <div>
            <p className="eyebrow">NerdyTech</p>
            <h1>Curate your next favorite gadget</h1>
          </div>
        </div>
        <div>
          <a
            className="wishlist-btn"
            href="#"
            onClick={(event) => {
              event.preventDefault()
              if (wishlist.length > 0) {
                setStep('cart')
              }
            }}
          >
            Cart
          </a>
          <a className="wishlist-btn" href="/">
            Back to home
          </a>
        </div>
      </header>

      <main className="wishlist-view">
        {step === 'wishlist' && (
          <>
            <div className="view-header">
              <h2>Your wishlist</h2>
              <span className="pill">{wishlist.length} selected</span>
            </div>

            <section className="product-grid">
              {featuredItems.map((item) => (
                <article className="product-card" key={item.id}>
                  <div className="product-card__top">
                    <span className="pill">{item.tag}</span>
                    <button
                      className="heart-btn"
                      onClick={() => handleSave(item)}
                      aria-label={`Save R{item.name} to wishlist`}
                    >
                      ♡
                    </button>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.blurb}</p>
                  <div className="product-card__footer">
                    <span>{item.price}</span>
                    <button className="text-btn" onClick={() => handleSave(item)}>
                      Add
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {wishlist.length === 0 ? (
              <div className="empty-state">
                <h3>No saved items yet</h3>
                <p>Select an item above and it will appear here.</p>
              </div>
            ) : (
              <>
                <ul className="wishlist-list">
                  {wishlist.map((item) => (
                    <li className="wishlist-item" key={item.id}>
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.blurb}</p>
                      </div>
                      <span>{item.price}</span>
                    </li>
                  ))}
                </ul>

                <div className="checkout-actions">
                  <div className="summary-box">
                    <p>Total due</p>
                    <strong>R{total.toFixed(2)}</strong>
                  </div>
                  <button className="primary-btn" onClick={() => setStep('cart')}>
                    Go to cart
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {step === 'cart' && (
          <div className="checkout-card">
            <div className="checkout-card__header">
              <h3>Cart</h3>
              <button type="button" className="text-btn" onClick={() => setStep('wishlist')}>
                Back
              </button>
            </div>

            <p>Your selected items are ready for checkout.</p>
            <ul className="wishlist-list">
              {wishlist.map((item) => (
                <li className="wishlist-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.blurb}</p>
                  </div>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>

            <div className="checkout-actions">
              <div className="summary-box">
                <p>Total due</p>
                <strong>R{total.toFixed(2)}</strong>
              </div>
              <button className="primary-btn" onClick={() => setStep('address')}>
                Continue to address
              </button>
            </div>
          </div>
        )}

        {step === 'address' && (
          <Address
            address={address}
            onChange={handleAddressChange}
            onSubmit={handleAddressSubmit}
            onBack={() => setStep('cart')}
          />
        )}

        {step === 'payment' && (
          <Payment
            payment={payment}
            onChange={handlePaymentChange}
            onSubmit={handlePaymentSubmit}
            onBack={() => setStep('address')}
            address={address}
            total={total}
            wishlist={wishlist}
          />
        )}

        {step === 'complete' && (
          <div className="complete-state">
            <h3>Payment confirmed</h3>
            <p>Your order has been placed and will be delivered to {address.fullName}.</p>
            <button className="primary-btn" onClick={() => setStep('wishlist')}>
              Back to wishlist
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Wishlist