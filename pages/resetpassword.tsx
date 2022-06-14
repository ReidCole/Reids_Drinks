import { NextPage } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import Notification from "../components/Notification";
import { AuthContext } from "../context/AuthContext";
import useNotificationState from "../hooks/useNotificationState";

const ResetPassword: NextPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const authContext = useContext(AuthContext);
  const [notifState, showNotif] = useNotificationState();
  const canSubmit: boolean = emailValue.length > 0;

  function onFulfilled() {
    showNotif("Email sent!", "bg-blue-600");
  }

  function onError(msg: string) {
    switch (msg) {
      case "auth/missing-email":
        showNotif("Error: Please provide an email address.", "bg-red-600");
        break;
      case "auth/user-not-found":
        showNotif("Error: No user with this email exists.");
        break;
      default:
        showNotif("Error: " + msg, "bg-red-600");
        break;
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password - Reid&apos;s Drinks</title>
      </Head>

      <main>
        <header className="bg-emerald-300 p-2 flex flex-row items-center gap-2 h-14 justify-center w-full">
          <h1 className="font-bold text-xl">Reset Password</h1>
        </header>

        <p className="text-center bg-gray-200 p-2 mb-4">
          Forgot your password? An email will be sent to the given address to reset your password.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            authContext?.resetPassword(emailValue, onFulfilled, onError);
          }}
          className="flex flex-col gap-4 p-2 max-w-xl mx-auto"
        >
          <label>
            Email Address
            <input
              data-cy="input-email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              className="w-full rounded-lg border-2 border-emerald-700 px-2 py-1"
              type="email"
            />
          </label>

          <button
            data-cy="submit-btn"
            className={
              "py-2 text-white rounded-lg " + (canSubmit ? "bg-emerald-700" : "bg-gray-700")
            }
            disabled={!canSubmit}
            type="submit"
          >
            Send Reset Email
          </button>

          <p className="text-center mt-2">
            Don&apos;t see the email? Be sure to check your junk/spam folder.
          </p>
        </form>

        <Notification state={notifState} />
      </main>
    </>
  );
};

export default ResetPassword;
