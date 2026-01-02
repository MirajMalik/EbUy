import { useState } from "react";
import { processRegister } from "../../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [image, setImage] = useState(null);
  const [token, setToken] = useState("");

  // For UI messages
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // When user types in input, update state
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault(); // stops page refresh 
    setMsg("");
    setErr("");

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("password", form.password);
      fd.append("phone", form.phone);
      fd.append("address", form.address);

      if (image) fd.append("image", image);

      const res = await processRegister(fd);

    // message from backend
    setMsg(res?.message || "Registration process started. Check your email!");

    // backend returns token in payload
    const t = res?.payload?.token || res?.payload || res?.token || "";
    setToken(t);

    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 420 }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Process Register"}
        </button>
      </form>

      {token && (
        <div style={{ marginTop: 15, background: "#f6f6f6", padding: 12, borderRadius: 8 }}>
        <p style={{ margin: 0 }}>
            <b>Activation Token (for learning/dev):</b>
        </p>

    <textarea
        readOnly
        value={token}
        rows={4}
        style={{ width: "100%", marginTop: 8 }}
    />

    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(token)}
      >
        Copy Token
      </button>

      <a href={`/verify?token=${encodeURIComponent(token)}`}>Verify Now →</a>
    </div>
    </div>
    )}


    <p style={{ fontSize: 13, opacity: 0.8, marginTop: 12 }}>
        After this, your backend should send a verification token/code to your email.
    </p>
    </div>

    
  );
}
