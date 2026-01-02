import axios from "axios";

// Because we used Vite proxy, we can call "/test" directly
export async function pingBackend() {
  const res = await axios.get("/test");
  return res.data;
};


// GET /api/users?search=&page=&limit=
export async function getUsers ({search = "", page = 1, limit = 10 } = {}) {
  const res = await axios.get("/api/users", {
    params: { search, page, limit },
  });

  return res.data;
};


// POST /api/users/process-register
export async function processRegister(formData) {
  const res = await axios.post("/api/users/process-register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Verify registration: POST /api/users/verify
export async function verifyUser(payload) {
  const res = await axios.post("/api/users/verify", payload);
  return res.data;
};