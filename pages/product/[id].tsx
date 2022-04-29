import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Notification from "../../components/Notification";
import { DatabaseContext } from "../../context/DatabaseContext";
import useNotificationState from "../../hooks/useNotificationState";
import unloadedImg from "../../public/img/unloaded-image.png";

export type ProductListing = {
  title: string;
  description: string;
  price: string;
  thumbnailImgUrl: string;
  highResImgUrl: string;
  imgAttribution: string;
  productId: string;
  rating: number;
};

const Product: NextPage = () => {
  const databaseContext = useContext(DatabaseContext);
  const [product, setProduct] = useState<ProductListing | null>(null);
  const [notifState, showNotif] = useNotificationState();
  const [errorFindingProduct, setErrorFindingProduct] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (product !== null || typeof id === "undefined") return;
    console.log("effect", databaseContext, id, product);
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
  }, [databaseContext, id, product]);

  function quantityIsValid(): boolean {
    const quantityInteger = parseInt(quantity);
    if (Number.isNaN(quantityInteger) || quantityInteger < 1) {
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
    if (!quantityIsValid()) {
      showNotif("Please input a valid quantity.", "bg-red-600");
      return;
    }

    showNotif(`Added ${quantity} item${quantity !== "1" ? "s" : ""} to cart.`, "bg-green-600");
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
          <div className="flex flex-col p-4">
            <div className="flex flex-col mb-3">
              {product ? (
                <Image src={product.highResImgUrl} width={640} height={425} alt={product.title} />
              ) : (
                <Image src={unloadedImg} width={640} height={425} alt="" />
              )}
              <p className="italic text-gray-700 text-sm mt-2">
                {product ? product.imgAttribution : "..."}
              </p>
            </div>

            <div className="flex flex-col mb-4">
              <h1 className="text-2xl font-bold">{product ? product.title : "..."}</h1>
              <p className="">{product ? `\$${product.price}` : "..."}</p>
            </div>

            <div>
              <label className="bg-gray-200 p-2 rounded-lg flex flex-row items-center w-36 gap-2 mb-4">
                <p>Quantity</p>
                <input
                  className="bg-white rounded-lg text-left pl-2 w-full"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </label>
              <div className="flex flex-row w-full gap-2 mb-6">
                <button
                  onClick={onBuy}
                  className="py-2 px-4 bg-blue-600  rounded-lg text-white basis-full"
                >
                  Buy Now
                </button>
                <button
                  onClick={onAddToCart}
                  className="py-2 px-4 bg-green-700 rounded-lg text-white basis-full"
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <hr className="border-b border-gray-700 mb-6" />
            <div className="mb-8">
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
            <button
              data-cy="modal-cancelbtn"
              onClick={() => setBuyModalOpen(false)}
              className="bg-green-700 text-white p-2 rounded-lg basis-full"
            >
              How rude...
            </button>
          </div>
        </Modal>

        <Notification state={notifState} />

        <Footer />
      </main>
    </>
  );
};

export default Product;
