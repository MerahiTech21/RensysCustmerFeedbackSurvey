import { Fragment, useEffect } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import classes from "./AppContainer.module.css";
import { useSelector } from "react-redux";
import Spiner from "./Spiner";
import Dashboard from "./pages/Dashboard";

const AppContainer = () => {
  const user = localStorage.getItem("token");
  const isLoading = useSelector((state) => state.loading.isLoading);

  const location = useLocation();
  return user ? (
    <div>
      <Header />
      <div className="d-flex">
        <div className={classes.sideBar}>
          <SideBar />
        </div>
        <div className="flex-fill px-3 px-lg-3 py-3 mb-4 position-relative">
          {isLoading && (
              <Spiner/>
          )}
          {/* <Dashboard/> */}
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default AppContainer;
