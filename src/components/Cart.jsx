import { Link } from "react-router-dom";

function Cart() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Cart</h1>

      <p>No items added yet.</p>

      <Link to="/products">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}

export default Cart;