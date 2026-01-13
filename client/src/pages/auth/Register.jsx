import "../../styles/register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { processRegister } from "../../api";



export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [image, setImage] = useState(null);
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!image) {
      setErr("Please upload a profile image.");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("password", form.password);
      fd.append("phone", form.phone);
      fd.append("address", form.address);
      fd.append("image", image); // must be field name "image"

      const res = await processRegister(fd);

      setMsg(res?.message || "Registration started. Check your email to verify.");

      //  go to verify page after registration
      setTimeout(() => navigate("/verify"), 800);
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="formCard">
      <h2 style={{ marginTop: 0 }}>Create your EbUy account</h2>

      <p className="helper">
        Sign up to save your cart, track orders, and checkout faster.
      </p>

      {msg && <p className="successText">{msg}</p>}
      {err && <p className="errorText">{err}</p>}

      <form onSubmit={onSubmit} className="formGrid">
        <div className="formRow2">
          <div>
            <label className="label">Full Name</label>
            <input
              className="input2"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              className="input2"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="formRow2">
          <div>
            <label className="label">Phone</label>
            <input
              className="input2"
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="01XXXXXXXXX"
              required
            />
          </div>

          <div>
            <label className="label">Password</label>

            <div className="pwdRow">
              <input
                className="input2"
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Create a strong password"
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

            <p className="helper">Use at least 8 characters (recommended).</p>
          </div>
        </div>

        <div>
          <label className="label">Address</label>
          <input
            className="input2"
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="City, area, street..."
            required
          />
        </div>

        <div>
          <label className="label">Profile Image (required)</label>
          <input
            className="input2"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
          <p className="helper">Max 2MB.</p>
        </div>

        <button className="btn btnPrimary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="helper" style={{ margin: 0 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
