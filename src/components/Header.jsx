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
    <div className="headerNav d-flex justify-content-between py-2 ">
      <div className="d-flex mx-5 align-items-end">
        {/* <div className="bg-white"> */}
          <Avatar className="bg-white mx-3" alt="Logo" src="/rensyslogo.png" />
        {/* </div> */}

        <h5>
          <span className="headerLogoName1">RENSYS </span>{" "}
          <span className="headerLogoName2"> ENGINEERING</span>
        </h5>
      </div>
      <div className="d-flex align-items-center justify-content-start mx-5 py-1">
        <Avatar className="mx-3" />
        <div className="mt-2">
         <h6 className="text-white mb-0">{user?.name}</h6>
         <p className="text-white small mt-0" >Data Collector</p>  
        </div>
       
      </div>
    </div>
  );
}

export default Header;
