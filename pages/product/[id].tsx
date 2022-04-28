import { NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import { DatabaseContext } from "../../context/DatabaseContext";
import useNotificationState from "../../hooks/useNotificationState";

import unloadedImg from "../../public/img/unloaded-image.png";

export type ProductListing = {
  title: string;
  price: string;
  thumbnailImgUrl: string;
  highResImgUrl: string;
  imgAttribution: string;
  imgWidth: number;
  imgHeight: number;
  productId: string;
};

const Product: NextPage = () => {
  const databaseContext = useContext(DatabaseContext);
  const [product, setProduct] = useState<ProductListing | null>(null);
  const [notifState, showNotif] = useNotificationState();
  const [test, setTest] = useState("");
  const router = useRouter();
  const { id } = router.query;

  // start over with writing this fetching. could check for a specific error state and show that instead of a notification. like show something different on the page statically if the requested product doesn't exist. and set that error state value within the onError callback

  // useEffect(() => {
  //   console.log("trying");
  //   if (databaseContext === null || product !== null) return;

  //   async function fetchProduct() {
  //     if (databaseContext === null) return;

  //     if (typeof id === "undefined" || Array.isArray(id)) return;

  //     const p = await databaseContext.getProduct(id, onError);
  //     setProduct(p);
  //   }

  //   function onError(msg: string) {
  //     // showNotif(msg, "bg-red-600");
  //     setTest("oiwj");
  //     console.error("e");
  //   }

  //   fetchProduct();
  //   console.log("test");
  // }, [databaseContext, product, id]);

  return (
    <>
      <Header />

      <main>
        <div className="flex flex-col p-4 gap-2">
          {product ? (
            <Image
              src={product.highResImgUrl}
              width={product.imgWidth}
              height={product.imgHeight}
              alt={product.title}
            />
          ) : (
            <Image src={unloadedImg} width={640} height={425} alt="" />
          )}

          <p className="italic text-gray-700 text-sm">{product ? product.imgAttribution : "..."}</p>
          <h1 className="text-2xl">{product ? product.title : "..."}</h1>
          <p className="">{product ? `\$${product.price}` : "$..."}</p>
        </div>
      </main>

      <Notification state={notifState} />

      <Footer />
    </>
  );
};

export default Product;
