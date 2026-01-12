import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "ebuy_token";
const USER_KEY = "ebuy_user";

export function AuthProvider({ children }) {
  // Load saved login info once (when app starts)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  function login({ token, user }) {
    // save in React state
    setToken(token);
    setUser(user);

    // save in browser for refresh persistence
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function logout() {
    setToken("");
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  const value = useMemo(() => {
    return {
      token,
      user,
      isLoggedIn: Boolean(token),
      login,
      logout,
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
