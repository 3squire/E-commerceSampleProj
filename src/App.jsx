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

export default App
