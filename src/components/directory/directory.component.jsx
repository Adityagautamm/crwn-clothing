import categories from "../categories/categories";
import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const directory = () => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default directory;
