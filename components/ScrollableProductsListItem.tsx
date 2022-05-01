import Image from "next/image";
import Link from "next/link";
import { ProductListing } from "../pages/product/[id]";

type Props = {
  product: ProductListing;
};

const ScrollableProductsListItem: React.FC<Props> = ({ product }) => {
  return (
    <div className="w-44">
      <Link passHref href={`/product/${product.productId}`}>
        <a>
          <Image src={product.thumbnailImgUrl} width={640} height={425} alt={product.title} />
        </a>
      </Link>
      <div className="flex flex-col justify-between">
        <Link href={`/product/${product.productId}`}>
          <a className="text-md">{product.title}</a>
        </Link>
        <p className="text-sm">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ScrollableProductsListItem;
