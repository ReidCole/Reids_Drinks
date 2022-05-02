import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";

const AlreadySignedIn: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (authContext === null) return <></>;
  if (authContext.user === null) return <></>;

  return (
    <div className="w-full px-4 flex flex-col items-center gap-6">
      <p className="text-center">
        You are already signed in as <br />
        {authContext.user.email}
      </p>
      <Button styles="bg-gray-600 w-60 text-white" onClick={() => authContext.signOut()}>
        Sign Out
      </Button>

      <Button styles="bg-green-700 w-60 text-white" href="/">
        Go To Home
      </Button>
    </div>
  );
};

export default AlreadySignedIn;
