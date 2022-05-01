import { useEffect, useState } from "react";
import { NotificationState } from "../hooks/useNotificationState";

type Props = {
  state: NotificationState;
};

const Notification: React.FC<Props> = ({ state }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state.count === 0) return;

    setIsOpen(true);
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.count]);

  return (
    <div
      className={
        "fixed bottom-0 left-0 w-full notification z-10 " + (isOpen ? "notification-open" : "")
      }
    >
      <p
        className={
          "text-white px-2 py-4 m-3 text-center shadow-xl shadow-black " +
          (state.styles ? state.styles : "bg-gray-600")
        }
      >
        {isOpen ? state.text : ""}
      </p>
    </div>
  );
};

export default Notification;
