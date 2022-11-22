import { NavLink } from "react-router-dom";
import classes from "./SideBar.module.css";
const SideBar = () => {
  return (
    <div className="px-3">
      <div className="my-4 fs-5 fw-bold ms-4">Menu</div>
      <div className="mb-3">
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive
              ? classes.active + " border rounded px-1 px-xl-4 py-2"
              : classes.inactive + " px-1 px-xl-4 py-2"
          }
        >
          <span className="fs-5 me-3">
            <i className="fas fa-th-large"></i>
          </span>
          <span>Dashboard</span>
        </NavLink>
      </div>
      <div className="mb-3">
        <NavLink
          to={"/questions"}
          className={({ isActive }) =>
            isActive
              ? classes.active + " border rounded px-1 px-xl-4 py-2"
              : classes.inactive + " px-1 px-xl-4 py-2"
          }
        >
          <span className="fs-5 me-3">
            <i className="fa-solid fa-layer-group"></i>
          </span>
          <span>Questions</span>
        </NavLink>
      </div>
      <div className="mb-3">
        <NavLink
          to={"/surveys"}
          className={({ isActive }) =>
            isActive
              ? classes.active + " border rounded px-1 px-xl-4 py-2"
              : classes.inactive + " px-1 px-xl-4 py-2"
          }
        >
          <span className="fs-5 me-3">
            <i className="fa-solid fa-layer-group"></i>
          </span>
          <span>Survey</span>
        </NavLink>
      </div>

      <div className="mb-3">
        <NavLink
          to={"/employees"}
          className={({ isActive }) =>
            isActive
              ? classes.active + " border rounded px-1 px-xl-4 py-2"
              : classes.inactive + " px-1 px-xl-4  py-2"
          }
        >
          <span className="fs-5 me-3">
            <i className="fa-solid fa-users"></i>
          </span>
          <span>Employees</span>
        </NavLink>
      </div>
    </div>
  );
};
export default SideBar;
