import { Avatar } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Header.css";
function Header() {
 
  const [user,setUser]=useState({});
  useEffect(()=>{
    const user=localStorage.getItem('user');
    if(user){
         setUser(JSON.parse(user))

    }
  },[])
  return (
    <div className="headerNav d-flex justify-content-between ">
      <div className="d-flex mx-5 align-items-end">
        {/* <div className="bg-white"> */}
          <Avatar className="bg-white mx-3" alt="Logo" src="/rensyslogo.png" />
        {/* </div> */}

        <h5>
          <span className="headerLogoName1">Rensys </span>{" "}
          <span className="headerLogoName2"> Engineering</span>
        </h5>
      </div>
      <div className="d-flex align-items-end mx-5 ">
        <Avatar className="mx-3" />
        <h6 className=" text-white">{user?.name}</h6>
      </div>
    </div>
  );
}

export default Header;
