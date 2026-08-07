import './Cart.css'

function Cart({cart, setCart, goBack}) {


const removeItem = (id)=>{

setCart(
cart.filter(item => item.id !== id)
)

}


const total = cart.reduce(
(sum,item)=> 
sum + Number(item.price.replace(/[^\d]/g,'')),
0
)


return (

<div className="cart-container">


<h2>
Your Shopping Cart 🛒
</h2>


{cart.length === 0 ? (

<div className="empty-cart">

<h3>
Your cart is empty
</h3>

<p>
Add some amazing technology from DugsonTech.
</p>

<button onClick={goBack}>
Continue Shopping
</button>

</div>

) : (


<>


<div className="cart-items">


{cart.map(item=>(

<div className="cart-card" key={item.id}>


<div className="cart-icon">
{item.icon}
</div>


<div>

<h3>
{item.name}
</h3>

<p>
{item.category}
</p>

<strong>
{item.price}
</strong>

</div>


<button
onClick={()=>removeItem(item.id)}
>
Remove
</button>


</div>


))}


</div>


<div className="cart-summary">


<h3>
Order Summary
</h3>


<p>
Items: {cart.length}
</p>


<h2>
R{total.toLocaleString()}
</h2>


<button>
Proceed to Checkout
</button>


</div>


</>


)}


</div>

)

}


export default Cart