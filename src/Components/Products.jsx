import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Products.css'
import { departments, products } from '../catalog.js'

function Products({ addToCart, addToWishlist }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const department = searchParams.get('department')
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')

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
              : 'Explore premium gadgets selected by NerdyTech.'}
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
