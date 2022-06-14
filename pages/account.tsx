import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Notification from "../components/Notification";
import { AuthContext } from "../context/AuthContext";
import useNotificationState from "../hooks/useNotificationState";

const Account: NextPage = () => {
  const authContext = useContext(AuthContext);
  const [notifState, showNotif] = useNotificationState();

  function onDeleteAccountFulfilled() {
    showNotif("Account successfully deleted.", "bg-emerald-600");
  }

  function onDeleteAccountError(errorMsg: string) {
    if (errorMsg === "auth/requires-recent-login") {
      // reauthenticate
    } else {
      showNotif("Error deleting account: " + errorMsg, "bg-red-600");
    }
  }

  if (authContext === null) return <></>;

  return (
    <>
      <Head>
        <title>Account - Reid&apos;s Drinks</title>
      </Head>

      <Header />

      {authContext.user !== null ? (
        <div className="flex flex-col items-center my-4">
          <h1 className="text-center text-xl p-2 mb-4">
            Signed in as{" "}
            <span className="text-emerald-700 font-bold whitespace-nowrap">
              {authContext.user.email}
            </span>
          </h1>

          <Link href="/resetpassword" passHref>
            <a
              data-cy="resetpassword-link"
              className="bg-gray-600 text-white py-2 w-60 rounded-lg mb-4 text-center"
            >
              Reset Password
            </a>
          </Link>
          <Link href="/deleteaccount" passHref>
            <a
              data-cy="deleteaccount-link"
              className="bg-red-700 text-white py-2 w-60 rounded-lg mb-4 text-center"
            >
              Delete Account
            </a>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="p-2 mb-4 text-center">
            You are not signed in. Please sign in to manage your account.
          </p>
          <Link href="/signin?prevRoute=/account">
            <a className="bg-emerald-700 text-white py-2 w-60 rounded-lg mb-4 text-center">
              Sign In
            </a>
          </Link>
        </div>
      )}

      <Notification state={notifState} />

      <Footer />
    </>
  );
};

export default Account;
