import { Link } from "react-router-dom";

function ProductDetails() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Gaming Laptop</h1>

      <img
        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
        alt="Laptop"
        width="350"
      />

      <h2>Price: R18 999</h2>

      <p>
        Intel Core i7<br />
        16GB RAM<br />
        512GB SSD<br />
        RTX Graphics
      </p>

      <Link to="/cart">
        <button>Add to Cart</button>
      </Link>

      <br /><br />

      <Link to="/products">
        <button>Back to Products</button>
      </Link>
    </div>
  );
}

export default ProductDetails;