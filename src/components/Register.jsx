import { useState } from "react";
import { supabase } from "../supabase-client.jsx";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

  
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email: email, password: password }
      ])
      .select()

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    alert("Account created! Now you can login");
    navigate("/");
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button disabled={loading}>{loading ? "Creating..." : "Register"}</button>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </form>
  )
}
export default Register;