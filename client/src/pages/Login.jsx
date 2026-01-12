import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to go after login
  const from = location.state?.from || "/";

  function devLogin() {
    // TEMP login just to test protected routes
    login({
      token: "dev-token",
      user: { name: "Dev User", email: "dev@example.com" },
    });

    navigate(from, { replace: true });
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Login</h2>

      <p style={{ color: "var(--muted)" }}>
        Checking
      </p>

      <button className="btn btnPrimary" type="button" onClick={devLogin}>
         Login
      </button>
    </div>
  );
}
