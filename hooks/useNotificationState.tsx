import { Dispatch, SetStateAction, useState } from "react";

export type NotificationState = {
  count: number;
  text: string;
  styles: string;
};

const useNotificationState: () => [
  NotificationState,
  (text: string, styles?: string) => void
] = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationText, setNotificationText] = useState("");
  const [notificationStyles, setNotificationStyles] = useState("");

  function showNotification(text: string, styles?: string) {
    setNotificationCount((prev) => prev + 1);
    setNotificationText(text);
    if (styles) setNotificationStyles(styles);
  }

  const state: NotificationState = {
    count: notificationCount,
    text: notificationText,
    styles: notificationStyles,
  };

  return [state, showNotification];
};

export default useNotificationState;
