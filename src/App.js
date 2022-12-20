import { Fragment, useEffect } from "react";

import Router from "./routes";

import "./App.css";

function App() {
  
  // useEffect(()=>{
  //   // if ("serviceWorker" in navigator) {
  //   //   navigator.serviceWorker
  //   //     .register("/sw.js")
  //   //     .then(serviceWorker => {
  //   //       console.log("Service Worker registered: ", serviceWorker);
  //   //     })
  //   //     .catch(error => {
  //   //       console.error("Error registering the Service Worker: ", error);
  //   //     });
  //   // }
  // },[])

  return (
    <Fragment>
      <Router />

      
    </Fragment> 
  );
}

export default App;
