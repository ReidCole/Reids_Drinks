import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import FeaturedProduct from "../components/FeaturedProduct";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import ScrollableProductsList from "../components/ScrollableProductsList";
import { DatabaseContext } from "../context/DatabaseContext";
import useNotificationState from "../hooks/useNotificationState";

import { ProductListing } from "./product/[id]";

const Home: NextPage = () => {
  const databaseContext = useContext(DatabaseContext);
  const [products, setProducts] = useState<ProductListing[]>([]);
  const [errorFindingProducts, setErrorFindingProducts] = useState(false);

  useEffect(() => {
    if (products.length !== 0 || errorFindingProducts) return;

    async function fetchProducts() {
      if (databaseContext === null) return;

      const p = await databaseContext.getAllProducts(onError);
      setProducts(p);
    }

    function onError() {
      setErrorFindingProducts(true);
    }

    fetchProducts();
  }, [databaseContext, products, errorFindingProducts]);

  function copyOfProducts(): ProductListing[] {
    const p = products.slice();
    return p;
  }

  return (
    <>
      <Head>
        <title>Home - Reid&apos;s Drinks</title>
      </Head>

      <main>
        <Header />

        {errorFindingProducts ? (
          <p className="p-2">Couldn&apos;t get products from database. Please try again later.</p>
        ) : (
          <>
            <ScrollableProductsList
              listHeading="Popular"
              products={copyOfProducts().sort((a, b) => {
                const val = a.rating - b.rating;
                if (val < 0) return 1;
                else if (val === 0) return 0;
                else return -1;
              })}
            />
          </>
        )}

        <FeaturedProduct
          product={
            products.length > 0 ? products[Math.round(Math.random() * (products.length - 1))] : null
          }
        />

        <ScrollableProductsList
          listHeading="Price"
          products={copyOfProducts().sort((a, b) => {
            const val = a.price - b.price;
            if (val < 0) return -1;
            else if (val === 0) return 0;
            else return 1;
          })}
        />

        <ScrollableProductsList
          listHeading="Unique"
          products={copyOfProducts().sort((a, b) => {
            const val = a.rating - b.rating;
            if (val < 0) return -1;
            else if (val === 0) return 0;
            else return 1;
          })}
        />

        <Footer />
      </main>
    </>
  );
};

export default Home;
