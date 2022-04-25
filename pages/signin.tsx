import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import AlreadySignedIn from "../components/AlreadySignedIn";
import SignInForm from "../components/SignInForm";
import SignInSwitcher from "../components/SignInSwitcher";
import { AuthContext } from "../context/AuthContext";

const SignIn: NextPage = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgCount, setErrorMsgCount] = useState(0);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { prevRoute } = router.query;

  useEffect(() => {
    if (errorMsgCount === 0) return;

    const timeout = setTimeout(() => {
      setErrorMsg("");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [errorMsgCount]);

  function setError(msg: string) {
    setErrorMsg(msg);
    setErrorMsgCount((prev) => prev + 1);
  }

  function onSubmit(email: string, password: string) {
    if (authContext === null) {
      console.error("auth context is null");
      return;
    }

    if (isCreatingAccount) {
      authContext.signUp(email, password, onFulfilled, onError);
    } else {
      authContext.signIn(email, password, onFulfilled, onError);
    }
  }

  function onFulfilled() {
    if (typeof prevRoute === "undefined" || Array.isArray(prevRoute)) {
      console.error("prevRoute is not a string. might be undefined or a string array");
      return;
    }
    router.push(prevRoute);
  }

  function onError(error: any) {
    switch (error.code) {
      case "auth/wrong-password":
        setError("Error: Wrong password for this email.");
        break;
      case "auth/user-not-found":
        setError("Error: No account with this email. Did you mean to create an account?");
        break;
      case "auth/email-already-in-use":
        setError(
          "Error: This email is already in use by another account. Did you mean to sign in?"
        );
        break;
      case "auth/weak-password":
        setError("Error: Password is too weak. Please use a stronger or longer password.");
        break;
      case "auth/invalid-email":
        setError("Error: Email is invalid.");
        break;
      case "auth/too-many-requests":
        setError("Error: Too many requests to the server. Please try again later.");
        break;
      default:
        setError("Error: " + error.code);
    }
  }

  if (authContext === null) return <></>;

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <main className="flex flex-col items-center">
        <header className="bg-green-300 p-2 flex flex-row items-center gap-2 h-14 justify-center mb-4 w-full">
          <h1 className="font-bold text-xl">Sign In</h1>
        </header>

        {authContext.user === null ? (
          <div className="w-full p-2">
            <div className="flex flex-col mx-auto w-full max-w-lg">
              <SignInSwitcher
                isCreatingAccount={isCreatingAccount}
                setIsCreatingAccount={setIsCreatingAccount}
              />

              <SignInForm onSubmit={onSubmit} isCreatingAccount={isCreatingAccount} />

              <Link passHref href="/resetpassword">
                <a className="text-green-700 underline p-2 mt-2 text-center">
                  Forgot your password?
                </a>
              </Link>

              <p className="absolute bottom-0 left-0 text-center p-2 w-full bg-gray-300">
                Don&apos;t want to use your real email address? Feel free to sign up using a fake
                one. You won&apos;t be asked to verify it.
              </p>
            </div>

            {errorMsg.length > 0 && (
              <div
                data-cy="error-msg"
                className="bg-red-500 text-white font-bold p-2 mt-6 mx-auto max-w-lg"
              >
                {errorMsg}
              </div>
            )}
          </div>
        ) : (
          <AlreadySignedIn />
        )}
      </main>
    </>
  );
};

export default SignIn;
