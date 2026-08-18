import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/dugson-consulting.jpg";
import { supabase } from "../supabase-client.jsx";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!supabase) {
      setError("Login is unavailable because Supabase is not configured.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.trim())
        .eq('password', password)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        setError('Invalid email or password');
        return;
      }

      localStorage.setItem('dugsontech-user', JSON.stringify(data));
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong while logging in.');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    window.open("https://accounts.google.com/", "_blank");
  };

  return (
    <div className="container">
      <div className="left">
         <img src={logo} alt="DugsonTech logo" className="logo" />
        <h1>DugsonTech</h1>
        <p>Your Favourite Tech Store</p>
      </div>

      <div className="right">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Login to continue shopping.</p>

          {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>} {/* 5. show error */}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email} // 6. connect to state
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password} // 7. connect to state
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Link to="/forgot-password">Forgot Password?</Link>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"} {/* 8. loading text */}
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="google" onClick={googleLogin}>
            Continue with Google
          </button>

          <p className="register">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
