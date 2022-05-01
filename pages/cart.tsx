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
  const [products, setProducts] = useState<ProductListing[]>([]);
  const [triedToGetCartItems, setTriedToGetCartItems] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (cartItems.length !== 0 || databaseContext === null || triedToGetCartItems) return;

    setCartItems(databaseContext.getAllCartItemDatas());
    setTriedToGetCartItems(true);
  }, [databaseContext, cartItems, triedToGetCartItems]);

  useEffect(() => {
    if (databaseContext === null || cartItems.length === 0) return;
    console.log("e");

    async function getCartItemsAsProducts() {
      if (databaseContext === null || cartItems.length === 0) return;

      const p = await databaseContext.getProductsFromCart(cartItems);
      setProducts(p);
    }

    getCartItemsAsProducts();
  }, [cartItems, databaseContext]);

  useEffect(() => {
    if (products.length === 0) return;
    console.log("epofj");

    function getSubtotal() {
      let sub = 0;
      for (let i = 0; i < products.length; i++) {
        const cartItem = cartItems.find((item) => item.productId === products[i].productId);
        if (typeof cartItem === "undefined") {
          console.error(
            "tried to get subtotal. there was a product in the products list gotten from the database that was not also in the cartItems array from local storage"
          );
          return;
        }
        sub += products[i].price * cartItem.quantity;
      }
      setSubtotal(sub);
    }

    getSubtotal();
  }, [products, cartItems, count]);

  function refreshItems() {
    if (databaseContext === null) return;

    setCartItems(databaseContext.getAllCartItemDatas());
    setCount((prev) => prev + 1);
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
                  product={products.find((p) => p.productId === item.productId) || products[index]}
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
