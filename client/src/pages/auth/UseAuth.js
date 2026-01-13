import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (ctx === undefined) {
    throw new Error("useAuth() must be used inside <AuthProvider> (check main.jsx)");
  }

  return ctx;
}
