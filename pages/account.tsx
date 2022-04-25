import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const Account: NextPage = () => {
  const authContext = useContext(AuthContext);

  function onDeleteAccountFulfilled() {}

  function onDeleteAccountError(errorMsg: string) {}

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
            <span className="text-green-700 font-bold whitespace-nowrap">
              {authContext.user.email}
            </span>
          </h1>

          <Link href="/resetpassword" passHref>
            <a className="bg-gray-600 text-white font-bold py-1 w-60 rounded-lg mb-4">
              Reset Password
            </a>
          </Link>
          <button
            onClick={() =>
              authContext.deleteAccount(onDeleteAccountFulfilled, onDeleteAccountError)
            }
            className="bg-red-700 text-white font-bold py-1 w-60 rounded-lg mb-4"
          >
            Delete Account
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="p-2 mb-4 text-center">
            You are not signed in. Please sign in to manage your account.
          </p>
          <Link href="/signin?prevRoute=/account">
            <a className="bg-gray-600 text-white font-bold py-1 w-60 rounded-lg mb-4 text-center">
              Sign In
            </a>
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Account;
