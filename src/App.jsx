import Wishlist from "./Wishlist.jsx";

function App() {
  const [activeStep, setActiveStep] = useState('wishlist')
  const [address, setAddress] = useState(defaultAddress)
  const [payment, setPayment] = useState(defaultPayment)

  const handleAddressChange = (event) => {
    const { name, value } = event.target
    setAddress((currentAddress) => ({ ...currentAddress, [name]: value }))
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()
    setActiveStep('payment')
  }

  const handlePaymentChange = (event) => {
    const { name, value } = event.target
    setPayment((currentPayment) => ({ ...currentPayment, [name]: value }))
  }

  const handlePaymentSubmit = (event) => {
    event.preventDefault()
    setActiveStep('complete')
  }

  return (
    <div>
      <Wishlist />
    </div>
  );
}
function Empty({title,copy,onClick,button}){return <div className="empty"><div>♡</div><h2>{title}</h2><p>{copy}</p><button className="primary-btn" onClick={onClick}>{button}</button></div>}
function Collection({title,items,remove,action,actionText,back,checkout}){const total=items.reduce((s,p)=>s+p.price,0);return <main className="collection"><button className="back" onClick={back}>← Continue shopping</button><h1>{title}</h1>{items.length?<div className="collection-layout"><div>{items.map(p=><article className="line-item" key={p.id}><span>{p.icon}</span><div><p className="category">{p.department}</p><h3>{p.name}</h3><p>{p.specs}</p></div><strong>{price(p.price)}</strong><button className="remove" onClick={()=>remove(p.id)}>Remove</button>{action&&<button className="add-btn" onClick={()=>action(p)}>{actionText}</button>}</article>)}</div><aside><p>ORDER SUMMARY</p><div><span>Items ({items.length})</span><span>{price(total)}</span></div><div><span>Delivery</span><span>At checkout</span></div><hr/><strong>Total <span>{price(total)}</span></strong><button className="primary-btn" onClick={()=>checkout&&alert('Checkout is ready to connect to your payment provider.')}>{checkout?'Checkout':'Keep shopping'}</button></aside></div>:<Empty title={title==='Your cart'?'Your cart is empty':'Your wishlist is waiting'} copy="Explore our collection and save the tech you love." onClick={back} button="Browse products"/>}</main>}
function Info({title,intro,sections,contact}){return <main className="info"><p className="eyebrow">NERDYTECH</p><h1>{title}</h1><p className="intro">{intro}</p>{contact&&<form className="contact-form" onSubmit={e=>e.preventDefault()}><input placeholder="Your name"/><input placeholder="Email address"/><textarea placeholder="How can we help?"/><button className="primary-btn">Send message</button></form>}<div>{sections.map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}</div></main>}
export default App
