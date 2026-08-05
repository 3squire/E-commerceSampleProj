import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">

      <div className="contact-header">
       
       
        <h1>Contact NerdyTech</h1>
        <p>We're here to help with your questions, orders, and technical support.</p>
      </div>

      <div className="contact-content">

        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p><strong>Address</strong></p>
          <p>13 Esdoring Street</p>
          <p>Centurion, Gauteng</p>
          <p>South Africa</p>

          <br />

          <p><strong>Phone</strong></p>
          <p>069 304 2748</p>

          <br />

          <p><strong>Email</strong></p>
          <p>neani@dugsonconsulting.co.za</p>
          <p>lloyd@dugsonconsulting.co.za</p>
          <p>bongania@dugsonconsulting.co.za</p>

          <br />

          <p><strong>Business Hours</strong></p>
          <p>Monday - Friday</p>
          <p>08:00 - 17:00</p>

          <br />

          <p><strong>Follow Us</strong></p>
          <p>Facebook | Instagram | X | LinkedIn</p>
        </div>

        <form className="contact-form">

          <h2>Send us a Message</h2>

          <input
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="text"
            placeholder="Subject"
            required
          />

          <textarea
            rows="6"
            placeholder="Type your message..."
            required
          ></textarea>

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

      <div className="back-home">
        <Link to="/home">
          <button>← Back to Home</button>
        </Link>
      </div>

    </div>
  );
}

export default Contact;