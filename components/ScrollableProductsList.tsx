import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type ProductListing = {
  title: string;
  price: number;
  imgUrl: StaticImageData;
  productId: string;
};

type Props = {
  listHeading: string;
  products: ProductListing[];
};

const ScrollableProductsList: React.FC<Props> = ({ listHeading, products }) => {
  return (
    <>
      <h2 className="text-lg pl-2 pt-2">{listHeading}</h2>
      <div className="overflow-x-scroll">
        <div className="w-max p-4 flex flex-row gap-4 items-center">
          {products.map((product) => (
            <div key={product.productId} className="w-44">
              <Link passHref href={`/product/${product.productId}`}>
                <Image src={product.imgUrl} width={640} height={425} alt={product.title} />
              </Link>
              <div className="flex flex-col justify-between">
                <Link passHref href={`/product/${product.productId}`}>
                  <a className="text-md">{product.title}</a>
                </Link>
                <p className="text-sm">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollableProductsList;
