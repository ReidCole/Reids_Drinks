import Image from "next/image";
import Link from "next/link";
import { ProductListing } from "../pages/product/[id]";
import ScrollableProductsListItem from "./ScrollableProductsListItem";

type Props = {
  listHeading: string;
  products: ProductListing[];
};

const ScrollableProductsList: React.FC<Props> = ({ listHeading, products }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg ml-3 pt-2 sm:text-xl md:text-2xl border-b-2 border-green-700 w-max">
        {listHeading}
      </h2>
      <div className="overflow-x-scroll">
        <div className="w-max p-4 flex flex-row gap-4 items-center">
          {products.length === 0 ? (
            <>
              <ScrollableProductsListItem product={null} />
              <ScrollableProductsListItem product={null} />
              <ScrollableProductsListItem product={null} />
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
