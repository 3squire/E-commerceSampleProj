import { useState } from 'react'
import './Wishlist.css'

export const starterWishlist = []

function Wishlist({ wishlist: providedWishlist, setWishlist: providedSetWishlist, onContinue, onMoveToCart }) {
  const [localWishlist, setLocalWishlist] = useState(starterWishlist)
  const isControlled = providedWishlist !== undefined && typeof providedSetWishlist === 'function'
  const wishlist = isControlled ? providedWishlist : localWishlist
  const setWishlist = isControlled ? providedSetWishlist : setLocalWishlist

  const total = wishlist.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0)

  const increase = (id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item
      )
    )
  }

  const decrease = (id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, (item.quantity ?? 1) - 1) } : item
      )
    )
  }

  const removeWishlist = (id) => {
    setWishlist((currentWishlist) => currentWishlist.filter((item) => item.id !== id))
  }

  const moveAllToCart = () => {
    if (wishlist.length === 0) return

    if (onMoveToCart) {
      wishlist.forEach((item) => onMoveToCart(item))
    }
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
                {item.image ? (
                  <img className="wish-thumb" src={item.image} alt={item.name} />
                ) : (
                  <div className="wish-thumb wish-thumb--fallback" aria-hidden="true">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="wish-card-info">
                  <p className="product-brand">{item.brand}</p>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => decrease(item.id)} aria-label="Decrease quantity">
                    -
                  </button>
                  <span>{item.quantity ?? 1}</span>
                  <button onClick={() => increase(item.id)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <strong className="wish-card-price">
                  R{(item.price * (item.quantity ?? 1)).toLocaleString()}
                </strong>
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
    </section>
  )
}

export default Wishlist