import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

import { selectCategoriesMap,selectCategoriesIsLoading } from "../../store/categories/category.selector";
// import { CategoriesContext } from "../../context/categories.context";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {isLoading ? <Spinner/> :
      (Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview title={title} products={products} />;
      }))}
    </Fragment>
  );
};

export default CategoriesPreview;
