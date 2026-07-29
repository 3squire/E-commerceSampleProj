import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/nerdytech.jpeg";

function Home() {
  const categories = [
    { title: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300", query: "Computers & Laptops" },
    { title: "Phones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300", query: "Phones & Tablets" },
    { title: "Desktop PCs", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300", query: "Desktop PCs" },
    { title: "Accessories", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300", query: "Accessories" },
    { title: "Gaming", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300", query: "Gaming" },
    { title: "Smart Watches", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300", query: "Smart Watches" },
    { title: "Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300", query: "Camera" },
    { title: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", query: "Audio" },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Smart Tech. Easy Shopping.</h1>
        <p>
          Find the latest laptops, phones, gaming gear, accessories and more.
        </p>

        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </section>

      <section className="categories">
        <h2>Shop by Department</h2>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.title}
              className="category-card"
              to={`/products?department=${encodeURIComponent(category.query)}`}
            >
              <img src={category.image} alt={category.title} />
              <p>{category.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer>
        <img src={logo} alt="NerdyTech logo" className="footer-logo" />
        <h3>NerdyTech</h3>
        <p>Smart Tech. Easy Shopping.</p>
        <p>© 2026 NerdyTech. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;