import { Link } from "react-router-dom";
import "./Policy.css";

function Policy() {
  return (
    <div className="policy-container">

      <div className="policy-header">
        <h1>NerdyTech Store Policy</h1>
        <p>Your trusted technology shopping destination.</p>
      </div>

      <section className="policy-section">
        <h2>1. Orders</h2>
        <p>
          All orders are subject to product availability. Once your order has
          been placed, you will receive an order confirmation. NerdyTech
          reserves the right to cancel any order due to pricing errors, stock
          shortages or suspected fraudulent activity.
        </p>
      </section>

      <section className="policy-section">
        <h2>2. Payments</h2>
        <p>
          We accept secure online payments through approved payment methods.
          Prices are displayed in South African Rand (ZAR) and include VAT where
          applicable.
        </p>
      </section>

      <section className="policy-section">
        <h2>3. Shipping & Delivery</h2>
        <ul>
          <li>Orders are processed within 1–3 business days.</li>
          <li>Delivery usually takes 2–7 business days.</li>
          <li>Tracking information will be sent once your order ships.</li>
          <li>Delivery times may vary during holidays.</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>4. Returns & Refunds</h2>
        <p>
          Products may be returned within 14 days provided they are unused,
          undamaged and returned in their original packaging with proof of
          purchase.
        </p>
      </section>

      <section className="policy-section">
        <h2>5. Warranty</h2>
        <p>
          Selected products include a manufacturer's warranty. Warranty does not
          cover accidental damage, misuse or unauthorized repairs.
        </p>
      </section>

      <section className="policy-section">
        <h2>6. Privacy Policy</h2>
        <p>
          NerdyTech values your privacy. Customer information is used only for
          processing orders, deliveries, customer support and improving your
          shopping experience. We never sell your personal information.
        </p>
      </section>

      <section className="policy-section">
        <h2>7. Product Information</h2>
        <p>
          We strive to ensure all product descriptions, specifications, images
          and prices are accurate. Errors may occasionally occur and will be
          corrected without prior notice.
        </p>
      </section>

      <section className="policy-section">
        <h2>8. Customer Responsibilities</h2>
        <ul>
          <li>Provide accurate delivery information.</li>
          <li>Keep your account details secure.</li>
          <li>Use the website responsibly.</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>9. Limitation of Liability</h2>
        <p>
          NerdyTech is not responsible for delays caused by courier services,
          incorrect delivery information supplied by customers or temporary
          website outages.
        </p>
      </section>

      <section className="policy-section">
        <h2>10. Contact Us</h2>

        <p><strong>Email:</strong> support@nerdytech.co.za</p>
        <p><strong>Phone:</strong> +27 12 345 6789</p>
        <p><strong>Website:</strong> www.nerdytech.co.za</p>
      </section>

      <section className="policy-section">
        <h2>11. Policy Updates</h2>
        <p>
          NerdyTech reserves the right to update these policies at any time.
          Changes become effective immediately after publication.
        </p>
      </section>

      <div className="policy-footer">
        <Link to="/home">
          <button>← Back to Home</button>
        </Link>
      </div>

    </div>
  );
}

export default Policy;