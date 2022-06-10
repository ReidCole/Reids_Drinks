import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword as fbSignIn,
  createUserWithEmailAndPassword as fbSignUp,
  signOut as fbSignOut,
  deleteUser,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  Auth,
} from "firebase/auth";

type ContextType = {
  user: User | null;
  signIn: (
    email: string,
    password: string,
    onFulfilled?: () => void,
    onError?: (error: any) => void
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
  reauthenticate: (
    email: string,
    password: string,
    onFulfilled: () => void,
    onError: (errorMsg: string) => void
  ) => void;
};

export const AuthContext = React.createContext<ContextType | null>(null);

type Props = {
  children: JSX.Element;
  auth: Auth;
};

const AuthProvider: React.FC<Props> = ({ children, auth }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, [auth]);

  // add error callbacks to this and signup functions
  function signIn(
    email: string,
    password: string,
    onFulfilled?: () => void,
    onError?: (error: any) => void
  ) {
    fbSignIn(auth, email, password)
      .then(() => {
        if (onFulfilled) onFulfilled();
      })
      .catch((error) => {
        if (onError) onError(error);
      });
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

  function reauthenticate(
    email: string,
    password: string,
    onFulfilled: () => void,
    onError: (errorMsg: string) => void
  ) {
    if (user === null) {
      fbSignIn(auth, email, password)
        .then(() => onFulfilled())
        .catch((error) => onError(error.code));
      return;
    }

    const credential = EmailAuthProvider.credential(email, password);

    reauthenticateWithCredential(user, credential)
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
    reauthenticate: reauthenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
