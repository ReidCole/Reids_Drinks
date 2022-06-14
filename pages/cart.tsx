import { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import CartItem, { CartItemData } from "../components/CartItem";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { DatabaseContext } from "../context/DatabaseContext";
import { ProductListing } from "./product/[id]";

const Cart: NextPage = () => {
  const databaseContext = useContext(DatabaseContext);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [triedToGetCartItems, setTriedToGetCartItems] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [buyModalOpen, setBuyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (databaseContext === null || databaseContext.allProducts.length === 0) return;

    let st = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const product = databaseContext.allProducts.find(
        (p) => p.productId === cartItems[i].productId
      );
      if (typeof product === "undefined") {
        console.error(
          "subtotal calc error: there was a product in the cart items that couldn't be found in allProducts."
        );
        return;
      }
      st += product.price * cartItems[i].quantity;
    }
    setSubtotal(st);
  }, [cartItems, databaseContext]);

  useEffect(() => {
    if (cartItems.length !== 0 || databaseContext === null || triedToGetCartItems) return;

    setCartItems(databaseContext.getAllCartItemDatas());
    setTriedToGetCartItems(true);
  }, [databaseContext, cartItems, triedToGetCartItems]);

  function refreshItems() {
    if (databaseContext === null) return;

    setCartItems(databaseContext.getAllCartItemDatas());
  }

  return (
    <>
      <Head>
        <title>Cart - Reid&apos;s Drinks</title>
      </Head>

      <main>
        <Header />

        <h1 className="text-center font-bold text-2xl mt-6 mb-2 border-b-2 border-emerald-700 w-max mx-auto">
          Your Cart
        </h1>

        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col p-2">
              {cartItems.map((item, index) => (
                <CartItem
                  refreshItems={refreshItems}
                  key={item.productId}
                  lastItem={index === cartItems.length - 1}
                  cartItemData={{ productId: item.productId, quantity: item.quantity }}
                />
              ))}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl p-2 text-center">Subtotal: ${subtotal.toFixed(2)}</p>
              <Button
                onClick={() => setBuyModalOpen(true)}
                styles="bg-blue-600 mb-4 text-white w-max"
              >
                Proceed To Checkout
              </Button>
            </div>
          </>
        ) : (
          <p className="p-2 mb-4 text-center">There are no items in your cart.</p>
        )}

        <Modal isOpen={buyModalOpen} setIsOpen={setBuyModalOpen} heading="Just Kidding">
          <p className="p-2 text-center">
            Because this site isn&apos;t a real store, you can&apos;t actually buy anything.
          </p>
          <div className="absolute bottom-0 p-2 flex flex-row w-full gap-2">
            <Button
              data-cy="modal-cancelbtn"
              onClick={() => setBuyModalOpen(false)}
              styles="bg-emerald-700 text-white basis-full"
            >
              How rude...
            </Button>
          </div>
        </Modal>

        <Footer />
      </main>
    </>
  );
};

export default Cart;
