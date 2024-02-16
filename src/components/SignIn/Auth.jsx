import React from "react";
// import { useCookies } from "react-cookie";
import { useAuth } from "./AuthContext.jsx";

export default function Auth() {
  // const [cookies, setCookie] = useCookies(['name']);
  
  // this works but need to avoid 3rd party cookies
  const { isAuth, signInWithGoogle } = useAuth();

  return (
    <div className="auth">
      <p>Sign in with Google to Continue</p>
      <p>Current auth status is {isAuth ? 'true' : 'false'}</p>
      {isAuth ? <p>Signed in</p> : <p>Not signed in!</p>}
      <button onClick={signInWithGoogle}>Sign in</button>
    </div>
  );
}
