import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import React from "react";
import { CartItemData } from "../components/CartItem";
import { ProductListing } from "../pages/product/[id]";

type ContextType = {
  getProduct(id: string, onError: () => void): Promise<ProductListing | null>;
  getAllProducts(onError: () => void): Promise<ProductListing[]>;
  addToCart(productId: string, quantity: number): void;
  getAllCartItemDatas(): CartItemData[];
  updateQuantityInCart(productId: string, quantity: number): void;
  removeItemFromCart(productId: string): void;
  getProductsFromCart(cartItems: CartItemData[]): Promise<ProductListing[]>;
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
      const product = getProductFromSnapshot(docSnap);
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
      const product = getProductFromSnapshot(docSnap);
      products.push(product);
    });
    if (products.length === 0) {
      onError();
      return [];
    }

    return products;
  }

  function addToCart(productId: string, quantity: number) {
    // get current cart array from local storage
    let arr: CartItemData[];
    const lsArr = localStorage.getItem("cart-items");
    if (lsArr === null) {
      arr = [];
    } else {
      arr = JSON.parse(lsArr);
    }

    // check if this item already exists in cart
    const existingIndex = arr.findIndex((data) => data.productId === productId);
    if (existingIndex === -1) {
      // new item
      const cartItemData: CartItemData = {
        productId: productId,
        quantity: quantity,
      };
      arr.push(cartItemData);
    } else {
      // existing item
      arr[existingIndex] = {
        ...arr[existingIndex],
        quantity: arr[existingIndex].quantity + quantity,
      };
    }

    const jsonString = JSON.stringify(arr);

    localStorage.setItem("cart-items", jsonString);
  }

  function getAllCartItemDatas(): CartItemData[] {
    const lsArr = localStorage.getItem("cart-items");
    if (lsArr === null) {
      return [];
    } else {
      return JSON.parse(lsArr);
    }
  }

  async function getProductsFromCart(cartItems: CartItemData[]): Promise<ProductListing[]> {
    const ids = cartItems.map((item) => item.productId);
    const q = query(collection(db, "products"), where("__name__", "in", ids));
    const querySnapshot = await getDocs(q);
    let products: ProductListing[] = [];
    querySnapshot.forEach((doc) => {
      const product = getProductFromSnapshot(doc);
      products.push(product);
    });
    return products;
  }

  function getProductFromSnapshot(docSnap: QueryDocumentSnapshot<DocumentData>): ProductListing {
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
      tagline: data.tagline,
    };
    return product;
  }

  function updateQuantityInCart(productId: string, quantity: number) {
    // get current cart array from local storage
    let arr: CartItemData[];
    const lsArr = localStorage.getItem("cart-items");
    if (lsArr === null) {
      arr = [];
    } else {
      arr = JSON.parse(lsArr);
    }

    // check if this item already exists in cart
    const existingIndex = arr.findIndex((data) => data.productId === productId);
    if (existingIndex === -1) {
      // new item
      console.error("tried to update quantity of a cart item that doesn't exist in the cart");
      return;
    }

    // existing item
    arr[existingIndex] = {
      ...arr[existingIndex],
      quantity: quantity,
    };

    const jsonString = JSON.stringify(arr);

    localStorage.setItem("cart-items", jsonString);
  }

  function removeItemFromCart(productId: string) {
    // get current cart array from local storage
    let arr: CartItemData[];
    const lsArr = localStorage.getItem("cart-items");
    if (lsArr === null) {
      arr = [];
    } else {
      arr = JSON.parse(lsArr);
    }

    arr = arr.filter((item) => item.productId !== productId);

    const jsonString = JSON.stringify(arr);

    localStorage.setItem("cart-items", jsonString);
  }

  const value: ContextType = {
    getProduct: getProduct,
    getAllProducts: getAllProducts,
    addToCart: addToCart,
    getAllCartItemDatas: getAllCartItemDatas,
    updateQuantityInCart: updateQuantityInCart,
    removeItemFromCart: removeItemFromCart,
    getProductsFromCart: getProductsFromCart,
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

export default DatabaseProvider;
