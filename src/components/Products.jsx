import { Link } from "react-router-dom";

function Products() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>

      <Link to="/home">
        <button>← Back to Home</button>
      </Link>

      <div style={{ marginTop: "30px" }}>
        <h2>Gaming Laptop</h2>
        <p>R18 999</p>

        <Link to="/productdetails">
          <button>View Product</button>
        </Link>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>iPhone 15</h2>
        <p>R22 999</p>

        <Link to="/productdetails">
          <button>View Product</button>
        </Link>
      </div>
    </div>
  );
}

export default Products;