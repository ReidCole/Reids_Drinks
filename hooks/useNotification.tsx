import { ReactNode, useState } from "react";

const useNotification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
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
        <p className={`text-center bg-gray-700 text-white p-3 m-4 ${currentStyles}`}>your mom</p>
      </div>
      // <div className="text-2xl text-red-600 bg-blue-200 w-10 h-10 p-2 m-2">fuck</div>
    ),
    showNotification: showNotification,
  };
};

export default useNotification;
