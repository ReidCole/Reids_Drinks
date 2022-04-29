import { collection, doc, Firestore, getDoc, getDocs, query } from "firebase/firestore";
import React from "react";
import { ProductListing } from "../pages/product/[id]";

type ContextType = {
  getProduct: (id: string, onError: () => void) => Promise<ProductListing | null>;
  getAllProducts: (onError: () => void) => Promise<ProductListing[]>;
};

export const DatabaseContext = React.createContext<ContextType | null>(null);

type Props = {
  children: JSX.Element;
  db: Firestore;
};

const DatabaseProvider: React.FC<Props> = ({ children, db }) => {
  async function getProduct(id: string, onError: () => void) {
    const docRef = doc(db, `products/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const product: ProductListing = {
        title: data.title,
        price: data.price,
        thumbnailImgUrl: data.thumbnailImgUrl,
        highResImgUrl: data.highResImgUrl,
        productId: docSnap.id,
        imgAttribution: data.imgAttribution,
        description: data.description,
        rating: data.rating,
      };
      return product;
    } else {
      onError();
      return null;
    }
  }

  async function getAllProducts(onError: () => void) {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const products: ProductListing[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const product: ProductListing = {
        title: data.title,
        price: data.price,
        thumbnailImgUrl: data.thumbnailImgUrl,
        highResImgUrl: data.highResImgUrl,
        productId: docSnap.id,
        imgAttribution: data.imgAttribution,
        description: data.description,
        rating: data.rating,
      };
      products.push(product);
    });
    if (products.length === 0) {
      onError();
      return [];
    }

    return products;
  }

  const value: ContextType = {
    getProduct: getProduct,
    getAllProducts: getAllProducts,
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

export default DatabaseProvider;
