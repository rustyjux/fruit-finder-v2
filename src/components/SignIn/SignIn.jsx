import React, { useState } from "react";
// import { useCookies } from "react-cookie";
import { useAuth } from "./AuthContext.jsx";
import './SignIn.css';
import FirebaseUI from 'firebaseui-react'
import { auth, signOutUser } from "../../utils/firebase"


export default function SignIn() {
  const redirectUrl = "http://localhost:5173"
  const UIConfig = {
    continueUrl: redirectUrl,
    // requireVerifyEmail: true,
    callbacks: {
      signInSuccessWithAuthResult: function (user, redirectUrl) {
        console.log("successfully authenticated", user);
      },
      signInFailure: function (error) {
        console.log("somtin went wrong :9 :((");
        console.error(error);
      },
    },
    passwordSpecs: { minCharacters: 6, },
    signInOptions: [
      {
        provider: "emailpassword",
      },

      {
        provider: "google.com",
        customParameters: { prompt: "select_account" },
        signInFlow: "popup"
      },
      "phonenumber",
      {
        provider: "emaillink",
      },
      "anonymous",
    ],

    // formButtonStyles: { backgroundColor: "red" },
    // formDisabledStyles: { backgroundColor: "yellow" },
    formInputStyles: { backgroundColor: "#ebebeb" }

  };
  
  // const [cookies, setCookie] = useCookies(['name']);
  
  // this works but need to avoid 3rd party cookies
  const { user } = useAuth();
  const [showFirebaseUI, setShowFirebaseUI] = useState(false);

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <p>Current auth status is {user ? 'true' : 'false'}</p>
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
      <button onClick={setShowFirebaseUI}>Sign in</button>
      <button onClick={signOutUser}>Sign out</button>
      {showFirebaseUI && !user && <FirebaseUI auth={auth} config={UIConfig} />}  
      
    </div>
  );
}
