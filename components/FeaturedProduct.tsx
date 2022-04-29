import Image from "next/image";
import { ProductListing } from "../pages/product/[id]";

type Props = {
  product: ProductListing;
};

const FeaturedProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col p-4 border-b-2 border-green-700">
      <div>
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <p className="mb-4">{product.description}</p>
        <div className="flex flex-row mb-4 gap-2 sm:bg-black">
          <button className="px-4 p-2 bg-green-700 rounded-lg text-white">Add To Cart</button>
          <button className="px-4 p-2 bg-gray-700 rounded-lg text-white">View Product</button>
        </div>
      </div>
      <div className="w-full relative">
        <Image src={product.highResImgUrl} width={640} height={425} alt={product.title} />
      </div>
    </div>
  );
};

export default FeaturedProduct;
