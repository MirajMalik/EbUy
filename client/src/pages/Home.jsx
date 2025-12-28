import { useEffect, useState } from "react";
import { pingBackend } from "../api";

export default function Home() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await pingBackend();
        setData(res);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message || "Request failed");
      }
    })();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <p>This page calls backend: <code>GET /test</code></p>

      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {data && (
        <pre style={{ background: "#f6f6f6", padding: 12 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
