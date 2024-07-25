import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
    products: [],

});

export const ProductsProvider = ({ children }) => {
   const [products, setProducts] = useState([]);
  //  useEffect(() =>{addCollectionAndDocuments('categories', SHOP_DATA)},[])
      useEffect(() =>{
        // we dont make use effect asyn but to call a async method we do it like below
        const getCategoriesMap= async() =>{
       const categoryMap=  await   getCategoriesAndDocuments()}

       getCategoriesMap();
      },[])
   const value = { products, setProducts};

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
