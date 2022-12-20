import React from "react";
import classes from "./Barchart.module.css";
function BarChart({title,totalRespondent,totalResponse}) {
   if(totalRespondent == 0) return 
  return (
    
      <div className={"container-fluid d-flex w-100 h-50 justify-content-space mb-1 "}>
        <div className="col-5 me-1 w-50 h-50 py-0 my-0">{title.length > 40? title.substring(0,40)+'...' : title}</div>
        <div className={classes.bar + "col-5 w-50 mx-0 my-0 py-0 bg-white"}>
          <div className={` h-100  bg-primary`} style={{width:Math.round(totalRespondent *100 / (totalResponse?totalResponse :1))}}> </div>
        </div>
        <div className="col-2 d-flex ms-2">
          <div className="h-50 mx-0 ">{Math.round(totalRespondent *100 /(totalResponse?totalResponse :1))}%</div>
          <div className="h-50 mx-0 px-0"> ({totalRespondent})</div> 
        </div>
      
      </div>
   
  );
}

export default BarChart;
