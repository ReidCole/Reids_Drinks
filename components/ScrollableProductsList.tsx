import Image from "next/image";
import Link from "next/link";
import { ProductListing } from "../pages/product/[id]";
import unloadedImg from "../public/img/unloaded-image.png";
import ScrollableProductsListItem from "./ScrollableProductsListItem";

type Props = {
  listHeading: string;
  products: ProductListing[];
};

const ScrollableProductsList: React.FC<Props> = ({ listHeading, products }) => {
  return (
    <div className="border-b-2 border-green-700">
      <h2 className="text-lg pl-2 pt-2">{listHeading}</h2>
      <div className="overflow-x-scroll">
        <div className="w-max p-4 flex flex-row gap-4 items-center">
          {products.length === 0 ? (
            <>
              <div className="w-44">
                <Image src={unloadedImg} width={640} height={425} alt="" />
                <div className="flex flex-col justify-between">
                  <p className="text-md">...</p>
                  <p className="text-sm">...</p>
                </div>
              </div>
              <div className="w-44">
                <Image src={unloadedImg} width={640} height={425} alt="" />
                <div className="flex flex-col justify-between">
                  <p className="text-md">...</p>
                  <p className="text-sm">...</p>
                </div>
              </div>
              <div className="w-44">
                <Image src={unloadedImg} width={640} height={425} alt="" />
                <div className="flex flex-col justify-between">
                  <p className="text-md">...</p>
                  <p className="text-sm">...</p>
                </div>
              </div>
            </>
          ) : (
            products.map((product) => (
              <ScrollableProductsListItem key={product.productId} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollableProductsList;
