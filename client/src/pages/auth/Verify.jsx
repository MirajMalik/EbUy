import { useEffect, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import { verifyUser } from "../../api";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // used to redirect to Home

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // auto-fill token if URL has /verify?token=...
  useEffect(() => {
    const t = searchParams.get("token") || "";
    if (t) setToken(t);
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!token.trim()) {
      setErr("Token is required.");
      return;
    }

    try {
      setLoading(true);

      //  expects req.body.token
      const res = await verifyUser({ token: token.trim() });

      const successMsg = res?.message || "User is registered successfully";
      setMsg(successMsg);

      //  store a small flag to show welcome later
      localStorage.setItem("ebuy_registered", "true");

      // redirect to home after short delay
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 800);
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Verify Account</h2>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 700 }}>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token (auto-filled if you came from Register)"
          required
        />

        <button disabled={loading} type="submit" className="btn btnPrimary">
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}
