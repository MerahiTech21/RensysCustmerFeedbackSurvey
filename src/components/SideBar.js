import { NavLink, useNavigate } from "react-router-dom";
import classes from "./SideBar.module.css";
import SettingsIcon from '@mui/icons-material/Settings';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/PersonAddAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useEffect, useState } from "react";
const SideBar = () => {



  const [user,setUser]=useState({});
  useEffect(()=>{
    const user=localStorage.getItem('user');
    if(user){
         setUser(JSON.parse(user))

    }
  },[])
  return (
    <div className="px-3 mx-md-0 ">
      <div className="my-4 fs-5 fw-bold ms-4">Menu</div>
      <div className="mb-3">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
            ? classes.active + " border rounded px-1 px-xl-4 py-2"
            : classes.inactive + " px-1 px-xl-4 py-2 "
          }
        >
          <span className="fs-5 me-2">
            <DashboardIcon/>
          </span>
          <span className="me-1">Dashboard</span>
        </NavLink>
      </div>

      {/* navigate(`/users/${user.id}/responses?surveyId=${user.surveyId}`); */}


      <div className="mb-3">
        <NavLink
          to={`/users/${user?.id}/responses?surveyId=${user?.survey?.id}`}
          className={({ isActive }) =>
            isActive
              ? classes.active + " border rounded px-1 px-xl-4 py-2"
              : classes.inactive + " px-1 px-xl-4  py-2"
          }
        >
          <span className="fs-5 me-2">
           <PersonIcon />
            {/* <i className="fa-solid fa-users"></i> */}
          </span>
          <span className="me-1" >Responses</span>
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
        onClick={()=>{
          localStorage.setItem('token','')
        }}
          
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
