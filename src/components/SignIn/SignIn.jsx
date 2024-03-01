import React, { useState, useEffect, useRef } from "react";
// import { useCookies } from "react-cookie";
import { useAuth } from "./AuthContext.jsx";
import './SignIn.css';
import FirebaseUI from 'firebaseui-react'
import { auth, signOutUser } from "../../utils/firebase"


export default function SignIn({ isSignInVisible, setIsSignInVisible }) {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => 
    {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsSignInVisible(false); // Hide the sign-in container
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isSignInVisible, setIsSignInVisible]);
  
  const redirectUrl = process.env.FIREBASE_REDIRECT_URL
  const UIConfig = {
    continueUrl: redirectUrl,
    // requireVerifyEmail: true,
    callbacks: {
      signInSuccessWithAuthResult: function (user) {
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
        provider: "google.com",
        customParameters: { prompt: "select_account" },
        signInFlow: "redirect"
      },
      {
        provider: "emaillink",
        customStyles: { backgroundColor: "#000" }
      },
    ],

    // formButtonStyles: { backgroundColor: "red" },
    // formDisabledStyles: { backgroundColor: "yellow" },
    formInputStyles: { backgroundColor: "#ebebeb" },
    // containerStyles: { width: "100%" },
    language: "en",

  };
  
  const { user } = useAuth();
  const [showFirebaseUI, setShowFirebaseUI] = useState(!user);

  return (
    <div ref={ref} className={`bg-background sign-in-container sign-in-container--${isSignInVisible ? 'active' : 'hidden'}`}>
      {user && <p>Current user {user.email}</p>}
      {user && <button onClick={signOutUser}>Sign out</button>}
      {showFirebaseUI && !user && <FirebaseUI auth={auth} config={UIConfig} />}     
    </div>
  );
}
