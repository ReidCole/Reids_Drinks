import Image from "next/image";
import Link from "next/link";
import { ProductListing } from "../pages/product/[id]";
import unloadedImg from "../public/img/unloaded-image.png";

type Props = {
  product: ProductListing | null;
};

const ScrollableProductsListItem: React.FC<Props> = ({ product }) => {
  return (
    <div className="w-44 sm:w-48 md:w-56 xl:w-72">
      <Link passHref href={`/product/${product ? product.productId : "#"}`}>
        <a>
          <Image
            src={product ? product.thumbnailImgUrl : unloadedImg}
            width={640}
            height={425}
            alt={product ? product.title : "..."}
          />
        </a>
      </Link>
      <div className="flex flex-col justify-between">
        <Link href={`/product/${product ? product.productId : "#"}`}>
          <a data-cy="scrollableproductlist-link" className="text-md md:text-lg xl:text-xl">
            {product ? product.title : "..."}
          </a>
        </Link>
        <p className="text-sm md:text-base xl:text-lg">
          ${product ? product.price.toFixed(2) : "..."}
        </p>
      </div>
    </div>
  );
};

export default ScrollableProductsListItem;
