import { useState } from "react";

const useNotification: () => {
  notification: JSX.Element;
  showNotification: (text: string, styles: string, timeoutTime: number) => void;
} = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>("");
  const [currentStyles, setCurrentStyles] = useState<string>("");
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);

  function showNotification(text: string, styles: string, timeoutTime: number) {
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
      console.log("cleared timeout and set current timeout to null");
    }

    setIsOpen(true);
    setCurrentText(text);
    setCurrentStyles(styles);

    setCurrentTimeout(
      setTimeout(() => {
        setCurrentTimeout(null);
        setIsOpen(false);
        console.log("set current timeout to null");
      }, timeoutTime)
    );
  }

  return {
    notification: (
      <div
        className={`w-full fixed bottom-0 left-0 notification ${isOpen ? "notification-open" : ""}`}
      >
        <p className={`bg-gray-700 text-white p-3 m-4 text-center ${currentStyles}`}>
          {currentText}
        </p>
      </div>
    ),
    showNotification: showNotification,
  };
};

export default useNotification;
