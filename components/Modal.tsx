import { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  heading: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Modal: React.FC<Props> = ({ children, heading, isOpen, setIsOpen }) => {
  function onClick(e: MouseEvent<HTMLDivElement>) {
    const element: HTMLDivElement = e.target as HTMLDivElement;
    if (element.id === "modal-background") {
      setIsOpen(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div
          data-cy="modal-background"
          className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 z-30"
        />
      )}

      <div
        onClick={onClick}
        className={
          "modal fixed w-screen h-screen top-0 left-0 flex flex-col items-center justify-center z-40 " +
          (isOpen ? "modal-open" : "")
        }
        id="modal-background"
      >
        <div className="bg-white w-2/3 h-1/2 min-w-min flex flex-col relative md:w-96 md:h-96 rounded-xl overflow-hidden">
          <h1 className="bg-gray-300 text-center p-2 text-xl font-bold">{heading}</h1>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
