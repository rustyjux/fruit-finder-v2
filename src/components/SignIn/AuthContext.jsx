import React, { createContext, useContext, useState, useEffect } from "react";
// import { Cookies } from "react-cookie";
import { auth, provider } from "../../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


const AuthContext = createContext();

// export function useAuth() {
//   // Return AuthContext OR an empty object if context is undefined
//   return useContext(AuthContext) || {};
// }

export function useAuth() {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    console.error("useAuth must be used within an AuthProvider");
  }

  return authContext;
}

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
