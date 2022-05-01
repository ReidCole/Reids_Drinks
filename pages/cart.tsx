import { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import CartItem, { CartItemData } from "../components/CartItem";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { DatabaseContext } from "../context/DatabaseContext";
import { ProductListing } from "./product/[id]";

const Cart: NextPage = () => {
  const databaseContext = useContext(DatabaseContext);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [triedToGetCartItems, setTriedToGetCartItems] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

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
            <div>
              <p className="text-xl">Subtotal: {subtotal.toFixed(2)}</p>
            </div>
          </>
        ) : (
          <p className="p-2 text-center">There are no items in your cart.</p>
        )}

        <Footer />
      </main>
    </>
  );
};

export default Cart;
