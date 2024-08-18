import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  console.log("Selector: selectCategoryReducer");
  return state.categories;
};

export const selectCategoriesMap = createSelector(
  [selectCategoryReducer],
  (categories) => {
    console.log("Selector: selectCategoriesMap");
    return categories.categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

// export const selectCategoriesMap = (state) => {
//   const categoriesMap = state.categories.categories.reduce(
//     (acc, { title, items }) => {
//       acc[title.toLowerCase()] = items;
//       return acc;
//     },
//     {}
//   );
//   return categoriesMap;
// };
