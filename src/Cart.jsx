import { useState } from 'react'
import './Cart.css'

export const starterCart = [
  {
    id: 1,
    name: 'Aurora Headphones',
    brand: 'NerdyTech',
    price: 2499,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Nova Smart Watch',
    brand: 'NerdyTech',
    price: 1899,
    quantity: 1,
  },
]

function Cart({ cart: providedCart, setCart: providedSetCart, onCheckout, onContinueShopping }) {
  const [localCart, setLocalCart] = useState(starterCart)
  const isControlled = providedCart !== undefined && typeof providedSetCart === 'function'
  const cart = isControlled ? providedCart : localCart
  const setCart = isControlled ? providedSetCart : setLocalCart

  const increase = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  const decrease = (id) => {
    setCart((currentCart) =>
      currentCart.flatMap((item) => {
        if (item.id !== id) return [item]
        if (item.quantity <= 1) return []
        return [{ ...item, quantity: item.quantity - 1 }]
      })
    )
  }

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section className="cart-page">
      <div className="cart-header">
        <div>
          <p className="eyebrow">Cart</p>
          <h2>Your selected gadgets</h2>
        </div>
        <span className="cart-pill">{cart.length} items</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Pick a few devices and bring them here for checkout.</p>
          {onContinueShopping ? (
            <button className="primary-btn" onClick={onContinueShopping}>
              Continue shopping
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-thumb" aria-hidden="true">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="cart-item-details">
                  <p className="product-brand">{item.brand}</p>
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">R{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: R{total.toLocaleString()}</h3>
            <div className="checkout-actions">
              {onContinueShopping ? (
                <button className="text-btn" onClick={onContinueShopping}>
                  Continue shopping
                </button>
              ) : null}
              {onCheckout ? (
                <button className="primary-btn" onClick={onCheckout}>
                  Proceed to checkout
                </button>
              ) : null}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
