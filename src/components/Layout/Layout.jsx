import Header from "../Header/Header";
import { Outlet } from "react-router";

const Layout = ({ toggleTheme }) => {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <Outlet />
    </>
  );
};

export default Layout;
