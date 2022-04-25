import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Cart: NextPage = () => {
  return (
    <>
      <Head>
        <title>Your Cart</title>
      </Head>

      <main>
        <Header />
      </main>
    </>
  );
};

export default Cart;
