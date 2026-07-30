import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/nerdytech.jpeg";
import { departments } from "../catalog.js";

function Home() {
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
          {departments.map((department) => (
            <Link
              key={department.name}
              className="category-card"
              to={`/products?department=${encodeURIComponent(department.name)}`}
            >
              <img src={department.image} alt={department.name} />
              <p>{department.name}</p>
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