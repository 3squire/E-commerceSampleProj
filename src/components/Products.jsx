import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Products.css'
import { products } from '../catalog.js'

function Products({ addToCart, addToWishlist }) {
  const [searchParams] = useSearchParams()
  const department = searchParams.get('department')

  // Show only the selected department's products, or everything when no filter.
  const visibleProducts = department
    ? products.filter((product) => product.department === department)
    : products

  // Tracks the most recent action per product id so we can show a brief note.
  const [notes, setNotes] = useState({})

  const flashNote = (id, message) => {
    setNotes((current) => ({ ...current, [id]: message }))
  }

  const handleAddToCart = (product) => {
    const added = addToCart?.(product)
    flashNote(product.id, added === false ? 'Already in cart' : 'Added to cart ✓')
  }

  const handleAddToWishlist = (product) => {
    const added = addToWishlist?.(product)
    flashNote(product.id, added === false ? 'Already saved' : 'Added to wishlist ✓')
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <p className="eyebrow">Shop</p>
          <h2>{department || 'Latest Technology'}</h2>
          <p className="products-description">
            {department
              ? `Browse our ${department} range.`
              : 'Explore premium gadgets selected by NerdyTech.'}
          </p>
        </div>
        {department ? (
          <Link className="ghost-btn products-reset" to="/products">
            ← All products
          </Link>
        ) : null}
      </div>

      {visibleProducts.length === 0 ? (
        <p className="products-empty">
          No products in this department yet.{' '}
          <Link to="/products">View all products</Link>
        </p>
      ) : (
        <div className="products-grid">
          {visibleProducts.map((product) => (
            <div className="tech-card" key={product.id}>
              <img className="tech-card__img" src={product.image} alt={product.name} />
              <p className="product-brand">{product.department}</p>
              <h3>{product.name}</h3>
              <p className="tech-card__desc">{product.description}</p>
              <strong>R{product.price.toLocaleString()}</strong>

              <div className="tech-card__actions">
                <button className="primary-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
                <button className="ghost-btn" onClick={() => handleAddToWishlist(product)}>
                  Add to Wishlist
                </button>
              </div>

              {notes[product.id] ? <p className="tech-card__note">{notes[product.id]}</p> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
