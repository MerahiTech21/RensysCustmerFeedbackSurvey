import { NavLink, useNavigate } from "react-router-dom";
import classes from "./SideBar.module.css";
import SettingsIcon from '@mui/icons-material/Settings';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LogoutIcon from '@mui/icons-material/Logout';
const SideBar = () => {


  const navigate =useNavigate()
  return (
    <div className="px-3 mx-md-0 ">
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
          <span className="fs-5 me-2">
            <i className="fas fa-th-large"></i>
          </span>
          <span className="me-1">Dashboard</span>
        </NavLink>
      </div>

      <div className="mb-3">
        <NavLink
          to={"/surveys"}
          className={({ isActive }) =>
            isActive
              ? classes.active + " border rounded px-1 px-xl-4 py-2"
              : classes.inactive + " px-1 px-xl-4 py-2 navLink"
          }
        >
          <span className="fs-5 me-2">
            <AddReactionIcon/>
            {/* <i className="fa-solid fa-layer-group"></i> */}
          </span>
          <span className="me-1">Survey</span> 
        </NavLink>
      </div>

      <div className="mb-3">
        <NavLink
          to={"/setting"}
          className={({ isActive }) =>
            isActive
              ? classes.active + " border rounded px-1 px-xl-4 py-2"
              : classes.inactive + " px-1 px-xl-4  py-2"
          }
        >
          <span className="fs-5 me-2">
           <SettingsIcon/>
            {/* <i className="fa-solid fa-users"></i> */}
          </span>
          <span >Setting</span>
        </NavLink>
      </div>
      <div className="mb-3">
        <NavLink
        onClick={()=>{navigate('/login')}}
          
          className={({ isActive }) =>
            isActive===0
              ? classes.active + " border rounded px-1 px-xl-4 py-2"
              : classes.inactive + " px-1 px-xl-4  py-2"
          }
        >
          <span className="fs-5 me-2">
            <LogoutIcon/>
            {/* <i className="fa-solid fa-users"></i> */}
          </span>
          <span >Logout</span>
        </NavLink>
      </div>
    </div>
  );
};
export default SideBar;
