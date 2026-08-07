import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/dugson-consulting.jpg";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Later this will validate the user
    navigate("/home");
  };

  const googleLogin = () => {
    window.open("https://accounts.google.com/", "_blank");
  };


  return (
    <div className="container">
      <div className="left">
         <img
      src={logo}
      alt="DugsonTech logo"
      className="logo"
    />
        <h1>DugsonTech</h1>
        <p>Your Favourite Tech Store</p>
      </div>

      <div className="right">
        <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to continue shopping.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

          <button type="submit">
            Login
          </button>
        </form>

        <div className="divider">
          OR
        </div>

        <button
          className="google"
          onClick={googleLogin}
        >
          Continue with Google
        </button>


        <p className="register">
          Don't have an account?
          <Link to="/register">
            Register
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
