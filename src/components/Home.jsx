import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/nerdytech.jpeg";
function Home() {
  ;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="nerdytech.jpeg" />
          <h2>NerdyTech</h2>
         <nav className="navbar">
  

  <div className="nav-links">
    <Link to="/home">Home</Link>
    <Link to="/products">Products</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/wishlist">Wishlist</Link>
    <Link to="/">Login</Link>
  </div>
</nav>
        </div>g
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>Smart Tech. Easy Shopping.</h1>
        <p>
          Find the latest laptops, phones, gaming gear,
          accessories and more.
        </p>

        <Link to="/products">
  <button>Shop Now</button>
</Link>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop by Department</h2>

        <div className="category-grid">

          <a className="category-card" href={"/products?department=" + encodeURIComponent("Computers & Laptops")}>
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"
              alt="Laptops"
            />
            <p>Laptops</p>
          </a>

          <a className="category-card" href={"/products?department=" + encodeURIComponent("Phones & Tablets")}>
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
              alt="Phones"
            />
            <p>Phones</p>
          </a>

          <a className="category-card" href={"/products?department=" + encodeURIComponent("Desktop PCs")}>
            <img
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300"
              alt="Desktop PCs"
            />
            <p>Desktop PCs</p>
          </a>

          <a className="category-card"href={"/products?department=" + encodeURIComponent("Accessories")}>
            <img
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300"
              alt="Accessories"
            />
            <p>Accessories</p>
          </a>

          <a className="category-card" href={"/products?department=" + encodeURIComponent("Gaming")}>
            <img
              src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300"
              alt="Gaming"
            />
            <p>Gaming</p>
          </a>

          <a className="category-card" href={"/products?department=" + encodeURIComponent("Smart Watches")}>
            <img
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300"
              alt="Smart Watches"
            />
            <p>Smart Watches</p>
          </a>

          <a className="category-card" href={"/products?department=" + encodeURIComponent("Camera")}>
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300"
              alt="Camera"
            />
            <p>Cameras</p>
          </a>

          <a className="category-card" href={"/products?department=" + encodeURIComponent("Audio")}>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
              alt="Audio"
            />
            <p>Audio</p>
          </a>

        </div>
      </section>

      {/* Footer */}
      <footer>
        <img
          src={logo}
          alt="nerdytech.jpeg"
          className="footer-logo"
        />

        <h3>NerdyTech</h3>

        <p>Smart Tech. Easy Shopping.</p>

        <p>© 2026 NerdyTech. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;