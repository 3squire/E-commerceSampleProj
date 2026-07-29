import { useState } from 'react'
import './App.css'
import Wishlist from './Wishlist.jsx'
import Address from './Address.jsx'
import Payment from './Payment.jsx'
import Cart from './Cart.jsx'

const defaultAddress = {
  fullName: '',
  addressLine: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
}

const defaultPayment = {
  paymentMethod: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  paypalEmail: '',
  paypalPassword: '',
}

function App() {
  const [activeStep, setActiveStep] = useState('wishlist')
  const [address, setAddress] = useState(defaultAddress)
  const [payment, setPayment] = useState(defaultPayment)

  const handleAddressChange = (event) => {
    const { name, value } = event.target
    setAddress((currentAddress) => ({ ...currentAddress, [name]: value }))
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()
    setActiveStep('payment')
  }

  const handlePaymentChange = (event) => {
    const { name, value } = event.target
    setPayment((currentPayment) => ({ ...currentPayment, [name]: value }))
  }

  const handlePaymentSubmit = (event) => {
    event.preventDefault()
    setActiveStep('complete')
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">NerdyTech checkout</p>
          <h1>Shop smart, save happily.</h1>
          <p>Esquire's layout with a smoother wishlist, address, and payment flow.</p>
        </div>
        <div className="hero-badge">Tech gear • ready to go</div>
      </section>

      <div className="section-tabs">
        <button className={`tab-btn ${activeStep === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveStep('wishlist')}>
          Wishlist
        </button>
        <button className={`tab-btn ${activeStep === 'cart' ? 'active' : ''}`} onClick={() => setActiveStep('cart')}>
          Cart
        </button>
        <button className={`tab-btn ${activeStep === 'address' ? 'active' : ''}`} onClick={() => setActiveStep('address')}>
          Address
        </button>
        <button className={`tab-btn ${activeStep === 'payment' ? 'active' : ''}`} onClick={() => setActiveStep('payment')}>
          Payment
        </button>
      </div>

      {activeStep === 'wishlist' && <Wishlist onContinue={() => setActiveStep('address')} />}
      {activeStep === 'cart' && <Cart onCheckout={() => setActiveStep('address')} onContinueShopping={() => setActiveStep('wishlist')} />}
      {activeStep === 'address' && <Address address={address} onChange={handleAddressChange} onSubmit={handleAddressSubmit} onBack={() => setActiveStep('cart')} />}
      {activeStep === 'payment' && <Payment payment={payment} onChange={handlePaymentChange} onSubmit={handlePaymentSubmit} onBack={() => setActiveStep('address')} address={address} total={4398} wishlist={[{ id: 1, name: 'Aurora Headphones', price: 2499 }]} />}
      {activeStep === 'complete' && (
        <section className="checkout-card completion-card">
          <h2>Order review complete</h2>
          <p>Your delivery info and payment details are ready.</p>
          <button className="primary-btn" onClick={() => setActiveStep('wishlist')}>
            Start again
          </button>
        </section>
      )}
    </main>
  )
}

export default App