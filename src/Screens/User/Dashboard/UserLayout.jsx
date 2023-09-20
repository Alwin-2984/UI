import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";

/**
 * UserLayout component serves as a common layout for user-related pages.
 * It includes the Header component and uses the Outlet to render child components based on the URL.
 */
const UserLayout = () => {
  return (
    <>
      {/* Include the Header component */}
      <Header />

      {/* Use the Outlet to render child components of the layout based on the URL */}
      <Outlet />
    </>
  );
};

export default UserLayout;
