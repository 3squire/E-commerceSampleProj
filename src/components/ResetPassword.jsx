import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./ForgotPassword.css";
import { resetPassword } from "../api.js";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword({ token, newPassword });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="forgot-page">
        <div className="forgot-container">
          <h1>Invalid link</h1>
          <p>This password reset link is missing its token. Please request a new one.</p>
          <p className="back-link">
            <Link to="/forgot-password">Request a new reset link</Link>
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="forgot-page">
        <div className="forgot-container">
          <h1>Password updated</h1>
          <p>Your password has been changed successfully.</p>
          <button type="button" onClick={() => navigate("/")}>
            Continue to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <h1>Reset Password</h1>
        <p>Enter a new password for your account.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password (min. 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating…" : "Update Password"}
          </button>
        </form>

        <p className="back-link">
          <Link to="/">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
