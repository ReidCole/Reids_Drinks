import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { DatabaseContext } from "../context/DatabaseContext";
import useNotificationState from "../hooks/useNotificationState";
import { ProductListing } from "../pages/product/[id]";
import unloadedImg from "../public/img/unloaded-image.png";
import Button from "./Button";
import Notification from "./Notification";

type Props = {
  product: ProductListing | null;
};

const FeaturedProduct: React.FC<Props> = ({ product }) => {
  const databaseContext = useContext(DatabaseContext);
  const [notifState, showNotif] = useNotificationState();

  function onAddToCart() {
    if (product === null || databaseContext === null) return;

    databaseContext.addToCart(product.productId, 1);

    showNotif(`Added 1 ${product.title} to your cart.`, "bg-emerald-600");
  }

  return (
    // give div a max height
    <div className="flex flex-col p-4 sm:flex-row sm:gap-4 from-white to-emerald-300 bg-gradient-to-r mb-4 ">
      <div className="relative sm:order-1 sm:w-1/2">
        <h2 className="text-xl font-bold sm:text-2xl">{product ? product.title : "..."}</h2>
        <p className="mb-2 sm:text-lg">{product ? "$" + product.price.toFixed(2) : "..."}</p>
        <p className="h-10 truncate sm:text-lg">{product ? product.tagline : "..."}</p>
        <div className="flex flex-row mb-4 gap-2 sm:absolute sm:bottom-0 sm:mb-0 md:text-lg">
          <Button styles="bg-emerald-700 text-white" onClick={onAddToCart}>
            Add To Cart
          </Button>
          <Button
            styles="bg-gray-700 text-white"
            href={product ? `product/${product.productId}` : "/"}
          >
            View Product
          </Button>
        </div>
      </div>
      <div className="featured-product-img">
        <Link passHref href={product ? `product/${product.productId}` : "/"}>
          <a className="flex rounded-xl overflow-hidden shadow-lg">
            <Image
              src={product ? product.highResImgUrl : unloadedImg}
              width={640}
              height={425}
              alt={product ? product.title : ""}
              placeholder="blur"
              blurDataURL={unloadedImg.src}
            />
          </a>
        </Link>
      </div>

      <Notification state={notifState} />
    </div>
  );
};

export default FeaturedProduct;
