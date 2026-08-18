import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/dugson-consulting.jpg";
import { supabase } from "../supabase-client.jsx";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { email: email.trim(), password: password }
        ])
        .select()

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      alert("Account created! Now you can login");
      navigate("/");
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong while registering.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left">
         <img src={logo} alt="DugsonTech logo" className="logo" />
        <h1>DugsonTech</h1>
        <p>Your Favourite Tech Store</p>
      </div>

      <div className="right">
        <div className="register-card">
          <h2>Create Account</h2>
          <p>Register to start shopping.</p>

          {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  )
}
export default Register;