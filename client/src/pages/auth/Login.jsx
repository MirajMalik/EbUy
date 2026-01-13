import "../../styles/login.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // If user was redirected here from /cart, we store where they came from
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!email.trim() || !password.trim()) {
      setErr("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      // save a token so cart/checkout becomes accessible
      localStorage.setItem("ebuy_token", "dev-token");
      localStorage.setItem("ebuy_user", JSON.stringify({ email }));

      setMsg("Signed in successfully!");

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (e2) {
      setErr("Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="autcontainer">
      <div className="authCard">
      <h2 style={{ marginTop: 0 , marginBottom:5}}>Sign in to <b>EbUy</b></h2>

      <p className="helper">
        Sign in to continue shopping, manage cart, and checkout.
      </p>

      {msg && <p className="successText">{msg}</p>}
      {err && <p className="errorText">{err}</p>}

      <form onSubmit={onSubmit} className="authGrid">
        <div>
          <label className="label">Email</label>
          <input
            className="input2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="label">Password</label>

          <div className="pwdRow">
            <input
              className="input2"
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />

            <button
              type="button"
              className="btn"
              onClick={() => setShowPwd((s) => !s)}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

        </div>

        <button className="btn btnPrimary" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="helper" style={{ margin: 0 }}>
          New to EbUy? <Link to="/register">Create an account</Link>
        </p>
      </form>

      <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link to="/">
          <button className="btn" type="button">
            Back to Home
          </button>
        </Link>

        <Link to="/login?role=admin">
          <button className="btn" type="button">
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
}
