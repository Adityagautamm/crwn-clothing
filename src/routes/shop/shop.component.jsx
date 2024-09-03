import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
//import { setCategories } from "../../store/categories/category.action";
//import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { fetchCategoriesStartAsync } from "../../store/categories/category.action";
import "./shop.styles.scss";

export const Shop = () => {
  const distpach = useDispatch();
  
  useEffect(() => {
distpach(fetchCategoriesStartAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
