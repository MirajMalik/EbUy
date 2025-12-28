import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/users");

        // backend returns: res.data.payload.users
        const list = res?.data?.payload?.users || [];
        setUsers(list);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message || "Request failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h2>Users</h2>

      {loading && <p>Loading users...</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {!loading && !err && users.length === 0 && <p>No users found.</p>}

      <ul style={{ paddingLeft: 18 }}>
        {users.map((u) => (
          <li key={u._id} style={{ marginBottom: 10 }}>
            <Link to={`/users/${u._id}`} style={{ textDecoration: "none" }}>
                <div><b>Name:</b> {u.name}</div>
                <div><b>Email:</b> {u.email}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                Click to view details →
                </div>
            </Link>
        </li>

        ))}
      </ul>
    </div>
  );
}
