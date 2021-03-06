type Props = {
  isCreatingAccount: boolean;
  setIsCreatingAccount: (value: boolean) => void;
};

const SignInSwitcher: React.FC<Props> = ({ isCreatingAccount, setIsCreatingAccount }) => {
  return (
    <div className="overflow-hidden border-2 rounded-lg border-emerald-700 grid grid-cols-2">
      <label
        className={
          "flex items-center justify-center gap-2 px-1 py-2 text-center " +
          (!isCreatingAccount && "bg-emerald-300")
        }
        data-cy="signin-tab"
      >
        <input
          checked={!isCreatingAccount}
          type="radio"
          name="auth-method"
          onChange={() => setIsCreatingAccount(false)}
        />{" "}
        Sign In
      </label>
      <label
        className={
          "flex items-center justify-center gap-2 px-1 py-2 text-center " +
          (isCreatingAccount && "bg-emerald-300")
        }
        data-cy="createaccount-tab"
      >
        <input
          checked={isCreatingAccount}
          type="radio"
          name="auth-method"
          onChange={() => setIsCreatingAccount(true)}
        />{" "}
        Create Account
      </label>
    </div>
  );
};

export default SignInSwitcher;
