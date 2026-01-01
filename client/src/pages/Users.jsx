import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api";

export default function Users() {
  // input value (typing)
  const [searchText, setSearchText] = useState("");

  // actual applied query (only changes when user clicks Search)
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // optional info if backend sends it (we keep it safe)
  // const [meta, setMeta] = useState({});

  async function loadUsers() {
    try {
      setErr("");
      setLoading(true);

      const data = await getUsers({ search: searchQuery, page, limit });

      const list = data?.payload?.users || [];
      setUsers(list);

      // if backend returns more info (total, pages etc) we store it
      // setMeta(data?.payload || {});
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  // Fetch whenever page/limit/searchQuery changes
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchQuery]);

  function onSearchClick() {
    setPage(1);               // reset to first page
    setSearchQuery(searchText.trim());
  }

  function onClear() {
    setSearchText("");
    setSearchQuery("");
    setPage(1);
  }

  return (
    <div>
      <h2>Users</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search (name/email)..."
          style={{ padding: 6, width: 240 }}
        />

        <button onClick={onSearchClick}>Search</button>
        <button onClick={onClear}>Clear</button>

        <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 13 }}>Limit:</span>
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Status */}
      {loading && <p>Loading users...</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}


      {/* Users list */}
      <ul style={{ paddingLeft: 18 }}>
        {users.map((u) => (
          <li key={u._id} style={{ marginBottom: 10 }}>
            <Link to={`/users/${u._id}`} style={{ textDecoration: "none" }}>
              <div><b>{u.name}</b></div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>{u.email}</div>
              <div style={{ fontSize: 12, opacity: 0.6 }}>Click to view details →</div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>Page: {page}</span>

        <button
          disabled={loading || users.length < limit} 
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
