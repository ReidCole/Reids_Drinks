import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../context/DatabaseContext";
import { ProductListing } from "../pages/product/[id]";
import unloadedImgUrl from "../public/img/unloaded-image.png";
import ProductQuantity from "./ProductQuantity";
import { BsTrashFill } from "react-icons/bs";

export type CartItemData = {
  productId: string;
  quantity: number;
};

type Props = {
  cartItemData: CartItemData;
  product: ProductListing | null;
  lastItem: boolean;
  refreshItems: () => void;
};

const CartItem: React.FC<Props> = ({ cartItemData, lastItem, refreshItems, product }) => {
  const databaseContext = useContext(DatabaseContext);
  const [errorFindingProduct, setErrorFindingProduct] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(cartItemData.quantity);

  // useEffect(() => {
  //   if (databaseContext === null || product !== null) return;

  //   async function fetchProduct() {
  //     if (databaseContext === null) return;

  //     const p = await databaseContext.getProduct(cartItemData.productId, onError);
  //     setProduct(p);
  //   }

  //   function onError() {
  //     setErrorFindingProduct(true);
  //   }

  //   fetchProduct();
  // }, [databaseContext, product, cartItemData.productId]);

  if (errorFindingProduct) {
    return (
      <div className="p-2 bg-gray-200">
        <h2>Product ID: {cartItemData.productId}</h2>
        <p>Couldn&apos;t get product from database</p>
      </div>
    );
  }

  return (
    <div
      className={
        "grid grid-cols-2 gap-3 p-2 pb-4 relative " +
        (lastItem ? "mt-2" : "border-b-2 border-green-700")
      }
    >
      <div className="flex flex-col">
        <Link passHref href={product ? `product/${product.productId}` : ""}>
          <a className="flex">
            <Image
              src={product ? product.thumbnailImgUrl : unloadedImgUrl}
              width={640}
              height={425}
              alt={product ? product.title : ""}
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col">
        <Link passHref href={product ? `product/${product.productId}` : ""}>
          <a className="text-lg font-bold">{product ? product.title : "..."}</a>
        </Link>
        <p className="mb-2">{product ? `\$${(product.price * quantity).toFixed(2)}` : "..."}</p>

        <ProductQuantity
          className="w-28 h-7"
          quantity={quantity}
          setQuantity={(q) => {
            if (databaseContext === null) return;
            setQuantity(q);
            databaseContext.updateQuantityInCart(cartItemData.productId, q);
            refreshItems();
          }}
        />
        <button
          className="flex flex-row items-center gap-1 mt-4 bg-gray-200 rounded-lg py-1 px-2 w-min"
          onClick={() => {
            if (databaseContext === null) return;
            databaseContext.removeItemFromCart(cartItemData.productId);
            refreshItems();
          }}
        >
          <BsTrashFill className="w-6 h-6 text-red-600" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;