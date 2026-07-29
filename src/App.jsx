import { useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import logo from './assets/nerdytech.jpeg'
import Address, { defaultAddress } from './Address.jsx'
import Cart, { starterCart } from './Cart.jsx'
import Payment, { defaultPayment } from './Payment.jsx'
import Wishlist, { starterWishlist } from './Wishlist.jsx'
import OrderConfirmation from './OrderConfirmation.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import Products from './components/Products.jsx'
import ProductDetails from './components/ProductDetails.jsx'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const hideNav = ['/', '/register', '/forgot-password'].includes(location.pathname)
  const [address, setAddress] = useState(defaultAddress)
  const [payment, setPayment] = useState(defaultPayment)
  const [cart, setCart] = useState(starterCart)
  const [wishlist, setWishlist] = useState(starterWishlist)

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const wishlistTotal = wishlist.reduce((sum, item) => sum + item.price, 0)
  const combinedTotal = cartTotal + wishlistTotal
  const cartItemCount = cart.length

  const handleAddressChange = (event) => {
    const { name, value } = event.target
    setAddress((currentAddress) => ({ ...currentAddress, [name]: value }))
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()
    navigate('/payment')
  }

  const handlePaymentChange = (event) => {
    const { name, value } = event.target
    setPayment((currentPayment) => ({ ...currentPayment, [name]: value }))
  }

  const handlePaymentSubmit = (event) => {
    event.preventDefault()
    navigate('/order-confirmed')
  }

  return (
    <div className="app-shell">
      {!hideNav && (
      <header className="topbar">
        <NavLink to="/home" className="brand">
          <img src={logo} alt="NerdyTech logo" />
          <div>
            <strong>NerdyTech</strong>
            <span>Smart tech, simple checkout</span>
          </div>
        </NavLink>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>
          <NavLink to="/">Login</NavLink>
        </nav>
      </header>
      )}

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                onCheckout={() => navigate('/address')}
                onContinueShopping={() => navigate('/home')}
              />
            }
          />
          <Route
            path="/address"
            element={
              <Address
                address={address}
                onChange={handleAddressChange}
                onSubmit={handleAddressSubmit}
                onBack={() => navigate('/cart')}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <Payment
                payment={payment}
                onChange={handlePaymentChange}
                onSubmit={handlePaymentSubmit}
                onBack={() => navigate('/address')}
                address={address}
                total={combinedTotal}
                itemCount={cartItemCount}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                setWishlist={setWishlist}
                onContinue={() => navigate('/address')}
              />
            }
          />
          <Route
            path="/order-confirmed"
            element={<OrderConfirmation address={address} onBackHome={() => navigate('/home')} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
