import { Dispatch, SetStateAction } from "react";

type Props = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  className?: string;
};

const ProductQuantity: React.FC<Props> = ({ quantity, setQuantity, className }) => {
  return (
    <div
      className={
        "rounded-lg flex flex-row items-center justify-center gap-2 overflow-hidden bg-gray-200 " +
        (className ? className : "")
      }
    >
      <button
        className="bg-gray-700 text-white basis-full py-1 text-xl"
        onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
      >
        -
      </button>
      <p className="basis-full text-center">{quantity}</p>
      <button
        className="bg-gray-700 text-white basis-full py-1 text-xl"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default ProductQuantity;