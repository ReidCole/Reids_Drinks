import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import { AuthContext } from "../context/AuthContext";
import useNotificationState from "../hooks/useNotificationState";

const DeleteAccount: NextPage = () => {
  const authContext = useContext(AuthContext);
  const [notifState, showNotif] = useNotificationState();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (authContext === null) return <></>;

  function onFulfilled() {
    setIsModalOpen(false);
    showNotif("Account deletion successful. Returning home...", "bg-green-600");
    setTimeout(() => router.push("/"), 2500);
  }

  function onError(msg: string) {
    if (msg === "auth/requires-recent-login") {
      router.push("/authenticate/?prevRoute=/deleteaccount");
    } else {
      showNotif("Error: " + msg, "bg-red-600");
    }
  }

  return (
    <>
      <Head>
        <title>Delete Account - Reid&apos;s Drinks</title>
      </Head>

      <main className="flex flex-col">
        <header className="bg-green-300 p-2 flex flex-row items-center gap-2 h-14 justify-center w-full">
          <h1 className="font-bold text-xl">Delete Account</h1>
        </header>
        {authContext.user === null ? (
          <>
            <p className="text-center mt-2 p-2">
              You must{" "}
              <Link passHref href="/signin?prevRoute=/deleteaccount">
                <a className="underline text-green-700">Sign In</a>
              </Link>{" "}
              to an account to delete it.
            </p>
          </>
        ) : (
          <>
            <p className="text-center mb-2 p-2 bg-gray-200 flex flex-col gap-2">
              Deleting your account is permanent. If your deletion is successful, you will be signed
              out.
            </p>

            <div className="max-w-sm mx-auto flex flex-col w-full p-2">
              <button
                data-cy="deleteaccount-btn"
                onClick={() => setIsModalOpen(true)}
                className="py-2 text-white rounded-lg bg-red-600"
              >
                Delete Account
              </button>
            </div>
          </>
        )}
        <Notification state={notifState} />

        <Modal heading="Confirmation" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <p className="p-2 text-center">
            Are you sure you want to delete your account? This cannot be undone.
          </p>
          <div className="absolute bottom-0 p-2 flex flex-row w-full gap-2">
            <Button
              data-cy="modal-cancelbtn"
              onClick={() => setIsModalOpen(false)}
              styles="bg-gray-700 text-white basis-full"
            >
              Cancel
            </Button>
            <Button
              data-cy="modal-confirmbtn"
              onClick={() => {
                authContext.deleteAccount(onFulfilled, onError);
              }}
              styles="bg-red-600 text-white basis-full"
            >
              Delete
            </Button>
          </div>
        </Modal>
      </main>
    </>
  );
};

export default DeleteAccount;
