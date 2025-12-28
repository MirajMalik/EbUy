import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${id}`);
        setUser(res?.data?.payload?.user || null);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message || "Request failed");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div>
      <h2>User Details</h2>
      <p>
        <Link to="/users">← Back to Users</Link>
      </p>

      {loading && <p>Loading...</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {!loading && !err && !user && <p>User not found.</p>}

      {!loading && !err && user && (
        <div
          style={{
            background: "#f6f6f6",
            padding: 14,
            borderRadius: 8,
            maxWidth: 500,
          }}
        >
          <div style={{ marginBottom: 6 }}>
            <b>ID:</b> {user._id}
          </div>
          <div style={{ marginBottom: 6 }}>
            <b>Name:</b> {user.name}
          </div>
          <div style={{ marginBottom: 6 }}>
            <b>Email:</b> {user.email}
          </div>

          <div style={{ fontSize: 12, opacity: 0.75 }}>
            Image is loading
          </div>
        </div>
      )}
    </div>
  );
}
