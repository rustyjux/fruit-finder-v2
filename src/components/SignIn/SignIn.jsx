import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React, { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import FirebaseUI from 'firebaseui-react'
import { auth, signOutUser } from "../../utils/firebase"

export default function SignIn({ isSignInVisible, setIsSignInVisible }) {

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
    <Dialog open={isSignInVisible} onOpenChange={setIsSignInVisible} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            {user && <p>Current user {user.email}</p>}
            {user && <button onClick={signOutUser}>Sign out</button>}
            {showFirebaseUI && !user && <FirebaseUI auth={auth} config={UIConfig} />}     
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    // <div ref={ref} className={`bg-background sign-in-container sign-in-container--${isSignInVisible ? 'active' : 'hidden'}`}>
    // </div>
  );
}
