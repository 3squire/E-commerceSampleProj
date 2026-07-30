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
import Policy from "./components/Policy";
import Contact from "./components/Contact";

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

  // Add a product to the cart. Returns false if it was already there (ignore duplicates).
  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) return false
    setCart((currentCart) => [...currentCart, { ...product, quantity: product.quantity ?? 1 }])
    return true
  }

  // Add a product to the wishlist. Returns false if it was already saved.
  const addToWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) return false
    setWishlist((currentWishlist) => [...currentWishlist, product])
    return true
  }

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
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/policy">Policy</NavLink>
          <NavLink to="/">Login</NavLink>
        </nav>
      </header>
      )}

      <main className="page-shell">
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/products"
            element={<Products addToCart={addToCart} addToWishlist={addToWishlist} />}
          />
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
                onMoveToCart={addToCart}
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
function Empty({title,copy,onClick,button}){return <div className="empty"><div>♡</div><h2>{title}</h2><p>{copy}</p><button className="primary-btn" onClick={onClick}>{button}</button></div>}
function Collection({title,items,remove,action,actionText,back,checkout}){const total=items.reduce((s,p)=>s+p.price,0);return <main className="collection"><button className="back" onClick={back}>← Continue shopping</button><h1>{title}</h1>{items.length?<div className="collection-layout"><div>{items.map(p=><article className="line-item" key={p.id}><span>{p.icon}</span><div><p className="category">{p.department}</p><h3>{p.name}</h3><p>{p.specs}</p></div><strong>{price(p.price)}</strong><button className="remove" onClick={()=>remove(p.id)}>Remove</button>{action&&<button className="add-btn" onClick={()=>action(p)}>{actionText}</button>}</article>)}</div><aside><p>ORDER SUMMARY</p><div><span>Items ({items.length})</span><span>{price(total)}</span></div><div><span>Delivery</span><span>At checkout</span></div><hr/><strong>Total <span>{price(total)}</span></strong><button className="primary-btn" onClick={()=>checkout&&alert('Checkout is ready to connect to your payment provider.')}>{checkout?'Checkout':'Keep shopping'}</button></aside></div>:<Empty title={title==='Your cart'?'Your cart is empty':'Your wishlist is waiting'} copy="Explore our collection and save the tech you love." onClick={back} button="Browse products"/>}</main>}
function Info({title,intro,sections,contact}){return <main className="info"><p className="eyebrow">NERDYTECH</p><h1>{title}</h1><p className="intro">{intro}</p>{contact&&<form className="contact-form" onSubmit={e=>e.preventDefault()}><input placeholder="Your name"/><input placeholder="Email address"/><textarea placeholder="How can we help?"/><button className="primary-btn">Send message</button></form>}<div>{sections.map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}</div></main>}
export default App
