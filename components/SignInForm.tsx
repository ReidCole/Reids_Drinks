import { useState } from "react";

type Props = {
  isCreatingAccount: boolean;
  onSubmit: (email: string, password: string) => void;
};

const SignInForm: React.FC<Props> = ({ isCreatingAccount, onSubmit }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const canSignIn: boolean = emailValue.length > 0 && passwordValue.length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(emailValue, passwordValue);
      }}
      className="flex flex-col gap-4 mt-2"
    >
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

      <label>
        Password
        <input
          data-cy="input-password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          className="w-full rounded-lg border-2 border-green-700 px-2 py-1"
          type="password"
        />
      </label>

      {canSignIn && (
        <button
          data-cy="signin-submitbtn"
          type="submit"
          className="py-2 font text-white rounded-lg bg-green-700"
          disabled={!canSignIn}
        >
          {isCreatingAccount ? "Create New Account" : "Sign In"}
        </button>
      )}
    </form>
  );
};

export default SignInForm;
