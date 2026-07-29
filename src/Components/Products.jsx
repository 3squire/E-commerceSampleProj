import './Products.css'

const products = [
  {
    id:1,
    name:'NerdyBook Pro 15',
    category:'Laptops',
    price:'R18 999',
    icon:'💻'
  },

  {
    id:2,
    name:'Galaxy Smart Phone',
    category:'Smartphones',
    price:'R12 999',
    icon:'📱'
  },

  {
    id:3,
    name:'Gaming Beast RTX',
    category:'Gaming PC',
    price:'R25 999',
    icon:'🖥️'
  },

  {
    id:4,
    name:'Nerdy Audio Max',
    category:'Audio',
    price:'R2 499',
    icon:'🎧'
  },

  {
    id:5,
    name:'Smart Watch Pro',
    category:'Wearables',
    price:'R1 899',
    icon:'⌚'
  },

  {
    id:6,
    name:'Creator Camera 4K',
    category:'Cameras',
    price:'R8 999',
    icon:'📷'
  }
]


function Products({addToCart}){

return(

<div className="products-container">


<h2>
Latest Technology
</h2>


<p className="products-description">
Explore premium gadgets selected by NerdyTech.
</p>



<div className="products-grid">


{products.map(product=>(

<div 
className="tech-card"
key={product.id}
>


<div className="product-icon">
{product.icon}
</div>


<h3>
{product.name}
</h3>


<p>
{product.category}
</p>


<strong>
{product.price}
</strong>


<button
onClick={() => {
  console.log("Button clicked")
  addToCart(product)
}}
>
Add to Cart
</button>


</div>

))}


</div>


</div>

)

}


export default Products