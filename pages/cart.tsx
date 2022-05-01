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
  const [allProducts, setAllProducts] = useState<ProductListing[]>([]);

  useEffect(() => {
    console.log("get");
    async function getAllProducts() {
      if (databaseContext === null) return;

      const p = await databaseContext.getAllProducts(() => {
        console.error("TODO: make actual error for getting all products");
      });
      setAllProducts(p);
    }

    getAllProducts();
  }, [databaseContext]);

  useEffect(() => {
    if (allProducts.length === 0) return;
    console.log("sub");
    let st = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const product = allProducts.find((p) => p.productId === cartItems[i].productId);
      if (typeof product === "undefined") {
        console.error(
          "subtotal calc error: there was a product in the cart items that couldn't be found in allProducts."
        );
        return;
      }
      st += product.price * cartItems[i].quantity;
    }
    setSubtotal(st);
  }, [cartItems, allProducts]);

  useEffect(() => {
    console.log("cart");
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
