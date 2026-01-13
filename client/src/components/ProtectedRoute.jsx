import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./../pages/auth/UseAuth";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // redirect to login and remember where user wanted to go
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
