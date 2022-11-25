import React from "react";
import classes from "./Barchart.module.css";
function BarChart({title,totalRespondent,totalResponse}) {
  return (
    <div>
      <div className={"d-flex w-100 h-100 justify-content-evenly mb-3"}>
        <div>{title}</div>
        <div className={classes.bar + " w-50"}>
          <div className={`mw-100 h-100  bg-primary`} style={{width:Math.round(totalRespondent *100 / totalResponse)}}> </div>
        </div>
        <div>{Math.round(totalRespondent *100 /totalResponse)} % ({totalRespondent})</div>
      </div>
   
    </div>
  );
}

export default BarChart;
