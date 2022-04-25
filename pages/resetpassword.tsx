import { NextPage } from "next";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ResetPassword: NextPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const authContext = useContext(AuthContext);

  return (
    <>
      <main>
        <header className="bg-green-300 p-2 flex flex-row items-center gap-2 h-14 justify-center mb-4 w-full">
          <h1 className="font-bold text-xl">Reset Password</h1>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            authContext?.resetPassword(emailValue);
          }}
          className="flex flex-col gap-4 p-2"
        >
          <p className="text-center">
            Forgot your password? An email will be sent to the given address to reset your password.
          </p>

          <label>
            Email
            <input
              data-cy="input-email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              className="w-full rounded-lg border-2 border-green-700 px-2 py-1"
              type="email"
            />
          </label>

          <button className="bg-green-700 py-2 font-bold text-white rounded-lg" type="submit">
            Send Reset Email
          </button>

          <p className="text-center mt-2">
            Don&apos;t see the email? Be sure to check your junk/spam folder.
          </p>
        </form>
      </main>
    </>
  );
};

export default ResetPassword;
