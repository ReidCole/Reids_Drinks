import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { CartItemData } from "../components/CartItem";
import { ProductListing } from "../pages/product/[id]";

export const DatabaseContext = React.createContext<ContextType | null>(null);

type Props = {
  children: JSX.Element;
  db: Firestore;
};

const DatabaseProvider: React.FC<Props> = ({ children, db }) => {
  const [allProducts, setAllProducts] = useState<ProductListing[]>([]);

  useEffect(() => {
    async function getAllProducts() {
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      const products: ProductListing[] = [];
      querySnapshot.forEach((docSnap) => {
        const product = getProductFromSnapshot(docSnap);
        products.push(product);
      });
      if (products.length === 0) {
        console.error("Couldn't get all products from database");
        return [];
      }

      setAllProducts(products);
    }

    getAllProducts();
  }, [db]);

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

  function dev_uploadProduct(product: ProductListing) {
    console.log("eoifwj");
    const docRef = doc(db, `products/${product.productId}`);
    setDoc(docRef, product);
  }

  const value: ContextType = {
    getProduct: getProduct,
    allProducts: allProducts,
    addToCart: addToCart,
    getAllCartItemDatas: getAllCartItemDatas,
    updateQuantityInCart: updateQuantityInCart,
    removeItemFromCart: removeItemFromCart,
    getProductsFromCart: getProductsFromCart,
    dev_uploadProduct: dev_uploadProduct,
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

type ContextType = {
  getProduct(id: string, onError: () => void): Promise<ProductListing | null>;
  allProducts: ProductListing[];
  addToCart(productId: string, quantity: number): void;
  getAllCartItemDatas(): CartItemData[];
  updateQuantityInCart(productId: string, quantity: number): void;
  removeItemFromCart(productId: string): void;
  getProductsFromCart(cartItems: CartItemData[]): Promise<ProductListing[]>;
  dev_uploadProduct(product: ProductListing): void;
};

export default DatabaseProvider;
