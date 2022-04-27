import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AlreadySignedIn: React.FC = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { prevRoute } = router.query;

  if (authContext === null) return <></>;
  if (authContext.user === null) return <></>;

  return (
    <div className="w-full px-4 flex flex-col items-center gap-6">
      <p className="text-center">
        You are currently signed in as <br />
        {authContext.user.email}
      </p>
      <button
        className="bg-gray-600 text-white py-2 w-60 rounded-lg"
        onClick={() => authContext.signOut()}
      >
        Sign Out
      </button>
      {typeof prevRoute !== "undefined" && !Array.isArray(prevRoute) && (
        <button
          className="bg-green-700 text-white py-2 w-60 rounded-lg"
          onClick={() => router.push(prevRoute)}
        >
          Go Back
        </button>
      )}
    </div>
  );
};

export default AlreadySignedIn;
