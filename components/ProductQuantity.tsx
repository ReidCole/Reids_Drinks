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
      data-cy="item-quantity"
    >
      <button
        className="bg-gray-700 text-white basis-full py-1 text-xl focus-visible:outline-none focus-visible:bg-green-500 "
        onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
        data-cy="quantity-minusbtn"
      >
        -
      </button>
      <p className="basis-full text-center">{quantity}</p>
      <button
        className="bg-gray-700 text-white basis-full py-1 text-xl focus-visible:outline-none focus-visible:bg-green-500 "
        onClick={() => setQuantity(quantity + 1)}
        data-cy="quantity-plusbtn"
      >
        +
      </button>
    </div>
  );
};

export default ProductQuantity;
