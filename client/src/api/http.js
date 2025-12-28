import axios from "axios";

export const http = axios.create({
  baseURL: "/",       
  timeout: 15000,
});

// error normalization 
export function getErrorMessage(err) {
  if (!err) return "Unknown error";
  if (err.response?.data?.message) return err.response.data.message;
  if (err.response?.data?.error) return err.response.data.error;
  if (err.message) return err.message;
  return "Request failed";
}
