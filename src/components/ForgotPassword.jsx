import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    alert("Password reset link sent successfully!");
    navigate("/");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">

        <h1>Forgot Password</h1>

        <p>Enter your email address and we'll send you a password reset link.</p>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your Email"
            required
          />

          <button type="submit">
            Send Reset Link
          </button>
        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;