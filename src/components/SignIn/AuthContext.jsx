import React, { createContext, useContext, useState } from "react";
import { Cookies } from "react-cookie";
import { auth, provider } from "../../utils/firebase.js";
import { signInWithPopup } from "firebase/auth";

const cookies = new Cookies();
const AuthContext = createContext();

export function useAuth() {
  // Return AuthContext OR an empty object if context is undefined
  return useContext(AuthContext) || {};
}

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      setAuthStatus(result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  }

  function setAuthStatus(token) {
    setIsAuth(token);
    cookies.set("auth-token", token, { sameSite: "lax" });
  }

  const authContextValue = {
    isAuth,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
