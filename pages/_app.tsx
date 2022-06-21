import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../context/AuthContext";
import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import DatabaseProvider from "../context/DatabaseContext";
import Head from "next/head";

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
const db = getFirestore(app);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DatabaseProvider db={db}>
      <AuthProvider auth={auth}>
        <Component {...pageProps} />
      </AuthProvider>
    </DatabaseProvider>
  );
}

export default MyApp;
