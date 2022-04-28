import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FeaturedProduct from "../components/FeaturedProduct";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import ScrollableProductsList from "../components/ScrollableProductsList";
import useNotificationState from "../hooks/useNotificationState";

import { ProductListing } from "./product/[id]";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home - Reid&apos;s Drinks</title>
      </Head>

      <main>
        <Header />

        {/* fetch products from firestore */}
        {/* <ScrollableProductsList listHeading="Popular" products={products} />

        <FeaturedProduct
          title="Green Tea Deluxe"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quae culpa libero voluptas blanditiis molestiae! Quaerat odio maxime quasi ducimus dolorem totam placeat animi. Repellendus nemo sit perferendis velit rem."
          imgUrl={imgGreenTea}
        />

        <ScrollableProductsList listHeading="New" products={products} />

        <ScrollableProductsList listHeading="Unique" products={products} /> */}

        <Footer />
      </main>
    </>
  );
};

export default Home;
