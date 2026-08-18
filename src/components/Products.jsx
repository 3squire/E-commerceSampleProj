import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Products.css'
import { departments, products } from '../catalog.js'
import BackButton from './BackButton' 

function Products({ addToCart, addToWishlist }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const department = searchParams.get('department')
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    if (!selectedProduct) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedProduct(null)
    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.classList.remove('modal-open')
    }
  }, [selectedProduct])

  const visibleProducts = products.filter((product) => {
    const matchesDepartment = !department || product.department === department
    const searchableText = `${product.name} ${product.brand} ${product.department} ${product.description}`.toLowerCase()
    const matchesSearch = !submittedSearch || searchableText.includes(submittedSearch.toLowerCase())
    return matchesDepartment && matchesSearch
  })

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

  const handleSearch = (event) => {
    event.preventDefault()
    setSubmittedSearch(searchTerm.trim())
  }

  const handleDepartmentChange = (event) => {
    const nextDepartment = event.target.value
    setSearchParams(nextDepartment ? { department: nextDepartment } : {})
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSubmittedSearch('')
    setSearchParams({})
  }

  return (
    <div className="products-container">
      <form className="products-search" onSubmit={handleSearch} role="search">
        <label className="products-search__field">
          <span>Search products</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search laptops, cameras, specs..."
          />
        </label>
        <label className="products-search__department">
          <span>Shop by department</span>
          <select value={department || ''} onChange={handleDepartmentChange}>
            <option value="">All departments</option>
            {departments.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button className="primary-btn products-search__button" type="submit">
          Search
        </button>
      </form>

      <div className="products-header">
        <div>
          <p className="eyebrow">Shop</p>
          <h2>{department || 'Latest Technology'}</h2>
          <p className="products-description">
            {department
              ? `Browse our ${department} range.`
              : 'Explore premium gadgets selected by DugsonTech.'}
          </p>
        </div>
        {department ? (
          <Link className="ghost-btn products-reset" to="/products">
            ← All products
          </Link>
        ) : null}
      </div>

      {(department || submittedSearch) && (
        <div className="products-filter-status">
          <span>
            Showing {visibleProducts.length} product{visibleProducts.length === 1 ? '' : 's'}
            {department ? ` in ${department}` : ''}
            {submittedSearch ? ` for “${submittedSearch}”` : ''}
          </span>
          <button type="button" onClick={clearFilters}>Clear filters</button>
        </div>
      )}

      {visibleProducts.length === 0 ? (
        <p className="products-empty">
          No products match your search.{' '}
          <button type="button" className="products-empty__link" onClick={clearFilters}>View all products</button>
        </p>
      ) : (
        <div className="products-grid">
          {visibleProducts.map((product) => (
            <article className="tech-card" key={product.id} tabIndex="0" role="button" aria-label={`View ${product.name}`} onClick={() => setSelectedProduct(product)} onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setSelectedProduct(product)
              }
            }}>
              <img className="tech-card__img" src={product.image} alt={product.name} />
              <p className="product-brand">{product.department}</p>
              <h3>{product.name}</h3>
              <p className="tech-card__desc">{product.description}</p>
              <strong>R{product.price.toLocaleString()}</strong>
              <span className="tech-card__view">View product details →</span>

              <div className="tech-card__actions">
                <button className="primary-btn product-cart-btn" onClick={(event) => { event.stopPropagation(); handleAddToCart(product) }}>
                  Add to Cart
                </button>
                <button className="ghost-btn" onClick={(event) => { event.stopPropagation(); handleAddToWishlist(product) }}>
                  Add to Wishlist
                </button>
              </div>

              {notes[product.id] ? <p className="tech-card__note">{notes[product.id]}</p> : null}
            </article>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="product-modal" role="presentation" onClick={() => setSelectedProduct(null)}>
          <section className="product-modal__card" role="dialog" aria-modal="true" aria-labelledby="selected-product-title" onClick={(event) => event.stopPropagation()}>
            <button className="product-modal__close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close product details">×</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <div className="product-modal__content">
              <p className="product-brand">{selectedProduct.department}</p>
              <h2 id="selected-product-title">{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <strong>R{selectedProduct.price.toLocaleString()}</strong>
              <div className="product-modal__actions">
                <button className="primary-btn product-cart-btn" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
                <button className="ghost-btn" onClick={() => handleAddToWishlist(selectedProduct)}>Add to Wishlist</button>
              </div>
              {notes[selectedProduct.id] ? <p className="tech-card__note">{notes[selectedProduct.id]}</p> : null}
            </div>
          </section>
        </div>
      )}
      
      <BackButton />
    </div>
  )
}

export default Products
