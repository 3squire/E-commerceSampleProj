import { useState } from 'react'
import './Wishlist.css'

const starterWishlist = [
  {
    id: 1,
    name: 'Aurora Headphones',
    brand: 'NerdyTech',
    description: 'Immersive sound with adaptive noise control and a 40-hour battery life.',
    price: 2499,
  },
  {
    id: 2,
    name: 'Nova Smart Watch',
    brand: 'NerdyTech',
    description: 'Track workouts, sleep, and notifications in one polished companion.',
    price: 1899,
  },
]

function Wishlist({ onContinue }) {
  const [wishlist, setWishlist] = useState(starterWishlist)
  const [cartCount, setCartCount] = useState(0)

  const total = wishlist.reduce((sum, item) => sum + item.price, 0)

  const removeWishlist = (id) => {
    setWishlist((currentWishlist) => currentWishlist.filter((item) => item.id !== id))
  }

  const moveAllToCart = () => {
    if (wishlist.length === 0) return

    setCartCount((count) => count + wishlist.length)
    setWishlist([])
  }

  return (
    <section className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <p className="eyebrow">Saved for later</p>
          <h2>Your wishlist</h2>
          <p>Keep track of the gear you want to come back to.</p>
        </div>
        <span className="wishlist-count">{wishlist.length} saved</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <h3>No saved items yet</h3>
          <p>Your favourites will appear here once you add them.</p>
        </div>
      ) : (
        <>
          <div className="wishlist-list">
            {wishlist.map((item) => (
              <article className="wish-card" key={item.id}>
                <div className="wish-thumb" aria-hidden="true">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="wish-card-info">
                  <p className="product-brand">{item.brand}</p>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <strong className="wish-card-price">R{item.price.toLocaleString()}</strong>
                <button
                  className="remove-wish-button"
                  onClick={() => removeWishlist(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  ✕
                </button>
              </article>
            ))}
          </div>

          <div className="wishlist-summary">
            <div>
              <span>Total for selected items:</span>
              <strong> R{total.toLocaleString()}</strong>
            </div>
            <div className="wishlist-actions">
              <button className="add-cart-button" onClick={moveAllToCart}>
                Add selected to cart
              </button>
              {onContinue ? (
                <button className="primary-btn" onClick={onContinue}>
                  Continue to checkout
                </button>
              ) : null}
            </div>
          </div>
        </>
      )}

      <p className="cart-hint">Cart items moved: {cartCount}</p>
    </section>
  )
}

export default Wishlist