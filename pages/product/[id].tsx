import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Notification from "../../components/Notification";
import ProductQuantity from "../../components/ProductQuantity";
import ProductRating from "../../components/ProductRating";
import { DatabaseContext } from "../../context/DatabaseContext";
import useNotificationState from "../../hooks/useNotificationState";
import unloadedImg from "../../public/img/unloaded-image.png";

export type ProductListing = {
  title: string;
  description: string;
  price: number;
  thumbnailImgUrl: string;
  highResImgUrl: string;
  imgAttribution: string;
  productId: string;
  rating: number;
  tagline: string;
};

const Product: NextPage = () => {
  const databaseContext = useContext(DatabaseContext);
  const [product, setProduct] = useState<ProductListing | null>(null);
  const [notifState, showNotif] = useNotificationState();
  const [errorFindingProduct, setErrorFindingProduct] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (typeof id === "undefined") return;

    async function fetchProduct() {
      if (databaseContext === null) return;

      if (typeof id === "undefined" || Array.isArray(id)) return;

      const p = await databaseContext.getProduct(id, onError);
      setProduct(p);
    }

    function onError() {
      setErrorFindingProduct(true);
    }

    fetchProduct();
  }, [databaseContext, id]);

  function quantityIsValid(): boolean {
    if (Number.isNaN(quantity) || quantity < 1) {
      return false;
    }
    return true;
  }

  function onBuy() {
    if (!quantityIsValid()) {
      showNotif("Please input a valid quantity.", "bg-red-600");
      return;
    }

    setBuyModalOpen(true);
  }

  function onAddToCart() {
    if (product === null || databaseContext === null) return;

    if (!quantityIsValid()) {
      showNotif("Please input a valid quantity.", "bg-red-600");
      return;
    }

    databaseContext.addToCart(product.productId, quantity);

    showNotif(
      `Added ${quantity} ${product.title}${quantity !== 1 ? "s" : ""} to your cart.`,
      "bg-green-600"
    );
    return;
  }

  return (
    <>
      <Head>
        <title>{product ? `${product.title} - Reid's Drinks` : "Reid's Drinks"}</title>
      </Head>

      <main>
        <Header />

        {errorFindingProduct ? (
          <div>
            <p className="p-2">Couldn&apos;t find requested product</p>
          </div>
        ) : (
          <div className="flex flex-col p-4 items-center">
            <div className="w-full flex flex-col items-center md:flex-row md:gap-4 relative max-w-6xl">
              <div className="w-full">
                <div className="flex flex-col mb-3 product-img relative">
                  {product ? (
                    <Image src={product.highResImgUrl} layout="fill" alt={product.title} />
                  ) : (
                    <Image src={unloadedImg} layout="fill" alt="" />
                  )}
                </div>
                <p className="italic text-gray-700 text-sm w-full">
                  {product ? product.imgAttribution : "..."}
                </p>
              </div>

              <div className="w-full">
                <div className="flex flex-col mb-4 w-full">
                  <h1 className="text-2xl font-bold">{product ? product.title : "..."}</h1>
                  <p className="mb-2">{product ? `\$${product.price.toFixed(2)}` : "..."}</p>
                  <ProductRating rating={product ? product.rating : 0} />
                </div>

                <div className="w-full">
                  <ProductQuantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                    className="mb-4 w-32"
                  />

                  <div className="flex flex-row w-full gap-2 mb-6">
                    <Button
                      onClick={product ? onBuy : () => {}}
                      styles="bg-blue-600 text-white basis-full"
                    >
                      {product ? "Buy Now" : "..."}
                    </Button>
                    <Button
                      onClick={product ? onAddToCart : () => {}}
                      styles="bg-green-700 text-white basis-full"
                    >
                      {product ? "Add To Cart" : "..."}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-b border-gray-700 mb-6 md:mt-6 w-full max-w-6xl" />
            <div className="mb-8 max-w-6xl">
              <p>{product ? product.description : "..."}</p>
            </div>
          </div>
        )}

        <Modal isOpen={buyModalOpen} setIsOpen={setBuyModalOpen} heading="Just Kidding">
          <p className="p-2 text-center">
            Because this site isn&apos;t a real store, you can&apos;t actually buy anything. You can
            still add items to your cart and view them, though.
          </p>
          <div className="absolute bottom-0 p-2 flex flex-row w-full gap-2">
            <Button
              onClick={() => setBuyModalOpen(false)}
              styles="bg-green-700 basis-full text-white"
            >
              How rude...
            </Button>
          </div>
        </Modal>

        <Notification state={notifState} />

        <Footer />
      </main>
    </>
  );
};

export default Product;
