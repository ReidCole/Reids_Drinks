import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Online Store Example</title>
      </Head>

      <main>
        <h1>Heading</h1>
        <Link passHref href="/cart">
          <a data-cy="cart-link" className="bg-gray-300 rounded-lg px-2 py-1">
            Cart
          </a>
        </Link>
      </main>
    </>
  );
};

export default Home;
