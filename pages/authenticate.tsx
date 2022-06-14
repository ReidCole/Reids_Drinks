import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import Button from "../components/Button";
import Notification from "../components/Notification";
import { AuthContext } from "../context/AuthContext";
import useNotificationState from "../hooks/useNotificationState";

const Authenticate: NextPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const router = useRouter();
  const { prevRoute } = router.query;
  const authContext = useContext(AuthContext);
  const [notifState, showNotif] = useNotificationState();
  const canSignIn: boolean = emailValue.length > 0 && passwordValue.length > 0;

  if (authContext === null) return <></>;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    if (authContext === null) return;

    e.preventDefault();
    authContext.reauthenticate(emailValue, passwordValue, onFulfilled, onError);
  }

  function onFulfilled() {
    if (typeof prevRoute === "undefined" || Array.isArray(prevRoute)) {
      router.push("/");
    } else {
      router.push(prevRoute);
    }
  }

  function onError(msg: string) {
    switch (msg) {
      case "auth/user-mismatch":
        setError("Error: Not the same email as the user you are signed in as.");
        break;
      case "auth/wrong-password":
        setError("Error: Wrong password for this email.");
        break;
      case "auth/user-not-found":
        setError("Error: No account with this email.");
        break;
      case "auth/invalid-email":
        setError("Error: Email is invalid.");
        break;
      case "auth/too-many-requests":
        setError("Error: Too many requests to the server. Please try again later.");
        break;
      case "auth/internal-error":
        setError("Error: Internal server error. Please try again later.");
        break;
      default:
        setError("Error: " + msg);
    }
  }

  function setError(msg: string) {
    showNotif(msg, "bg-red-600");
  }

  return (
    <>
      <Head>
        <title>Delete Account - Reid&apos;s Drinks</title>
      </Head>

      <main>
        <header className="bg-emerald-300 p-2 flex flex-row items-center gap-2 h-14 justify-center w-full">
          <h1 className="font-bold text-xl">Authenticate</h1>
        </header>

        {authContext.user && (
          <>
            <p className="bg-gray-200 mb-2 p-2 text-center">
              The action you are trying to perform requires you to sign in again.
            </p>
            <p className="mb-2 p-2 text-center">
              You are signed in as{" "}
              <span className="whitespace-nowrap">{authContext.user.email}</span>
            </p>
          </>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2 p-2 max-w-xl mx-auto">
          <label>
            Email
            <input
              data-cy="input-email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              className="w-full rounded-lg border-2 border-emerald-700 px-2 py-1"
              type="email"
            />
          </label>

          <label>
            Password
            <input
              data-cy="input-password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              className="w-full rounded-lg border-2 border-emerald-700 px-2 py-1"
              type="password"
            />
          </label>

          {canSignIn && (
            <Button
              data-cy="authenticate-submitbtn"
              type="submit"
              styles="text-white bg-emerald-700"
            >
              Authenticate
            </Button>
          )}
        </form>

        <Notification state={notifState} />
      </main>
    </>
  );
};

export default Authenticate;
