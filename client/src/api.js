import axios from "axios";

// Because we used Vite proxy, we can call "/test" directly
export async function pingBackend() {
  const res = await axios.get("/test");
  return res.data;
}
