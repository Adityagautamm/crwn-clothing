import { Outlet } from "react-router-dom";
import categories from "../../components/categories/categories";
import Directory from "../../components/directory/directory.component";

const Home = () => {
  return(
  <div>
   <Directory  />;
  <Outlet />
  </div>
  )
};

export default Home;
