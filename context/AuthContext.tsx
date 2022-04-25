import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword as fbSignIn,
  createUserWithEmailAndPassword as fbSignUp,
  signOut as fbSignOut,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: "AIzaSyDYZSBiYFXEuItK2IuCgZIR8MzWwfw8ius",
  authDomain: "reidsdrinks.firebaseapp.com",
  projectId: "reidsdrinks",
  storageBucket: "reidsdrinks.appspot.com",
  messagingSenderId: "160288144196",
  appId: "1:160288144196:web:1dfb9b13359766dd453511",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type ContextType = {
  user: User | null;
  signIn: (
    email: string,
    password: string,
    onFulfilled: () => void,
    onError: (error: any) => void
  ) => void;
  signUp: (
    email: string,
    password: string,
    onFulfilled: () => void,
    onError: (error: any) => void
  ) => void;
  signOut: () => void;
  deleteAccount: (onFulfilled: () => void, onError: (errorMsg: string) => void) => void;
  resetPassword: (
    email: string,
    onFulfilled: () => void,
    onError: (errorMsg: string) => void
  ) => void;
};

export const AuthContext = React.createContext<ContextType | null>(null);

type Props = {
  children: JSX.Element;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
      console.log("set user:", newUser);
    });

    return () => unsub();
  }, []);

  // add error callbacks to this and signup functions
  function signIn(
    email: string,
    password: string,
    onFulfilled: () => void,
    onError: (error: any) => void
  ) {
    fbSignIn(auth, email, password)
      .then(() => onFulfilled())
      .catch((error) => onError(error));
  }

  function signUp(
    email: string,
    password: string,
    onFulfilled: () => void,
    onError: (error: any) => void
  ) {
    fbSignUp(auth, email, password)
      .then(() => onFulfilled())
      .catch((error) => onError(error));
  }

  function signOut() {
    fbSignOut(auth);
  }

  function deleteAccount(onFulfilled: () => void, onError: (errorMsg: string) => void) {
    if (user === null) {
      console.error("user is null");
      return;
    }
    deleteUser(user)
      .then(() => onFulfilled())
      .catch((error) => onError(error.code));
  }

  function resetPassword(
    email: string,
    onFulfilled: () => void,
    onError: (errorMsg: string) => void
  ) {
    sendPasswordResetEmail(auth, email)
      .then(() => onFulfilled())
      .catch((error) => onError(error.code));
  }

  const value: ContextType = {
    user: user,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    deleteAccount: deleteAccount,
    resetPassword: resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
