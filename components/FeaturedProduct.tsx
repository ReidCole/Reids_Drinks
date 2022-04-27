import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  imgUrl: StaticImageData;
  description: string;
};

const FeaturedProduct: React.FC<Props> = ({ title, imgUrl, description }) => {
  return (
    <>
      <div className="flex flex-col p-4 bg-gray-200">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p>{description}</p>
          <div className="flex flex-row">
            <button>Add To Cart</button>
            <button>Go To Product</button>
          </div>
        </div>
        <div className="w-full relative">
          <Image src={imgUrl} width={640} height={425} alt={title} />
        </div>
      </div>
    </>
  );
};

export default FeaturedProduct;
