import { doc, Firestore, getDoc } from "firebase/firestore";
import React from "react";
import { ProductListing } from "../pages/product/[id]";

type ContextType = {
  getProduct: (id: string, onError: (errorMsg: string) => void) => Promise<ProductListing | null>;
};

export const DatabaseContext = React.createContext<ContextType | null>(null);

type Props = {
  children: JSX.Element;
  db: Firestore;
};

const DatabaseProvider: React.FC<Props> = ({ children, db }) => {
  async function getProduct(id: string, onError: (errorMsg: string) => void) {
    const docRef = doc(db, `/products/${id}`);
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
        imgWidth: data.imgWidth,
        imgHeight: data.imgHeight,
      };
      return product;
    } else {
      onError("Error: Couldn't find the requested product.");
      return null;
    }
  }

  const value: ContextType = {
    getProduct: getProduct,
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

export default DatabaseProvider;
