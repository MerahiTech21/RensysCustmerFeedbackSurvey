import { Fragment,useEffect } from 'react';
import Header from './components/Header'
import SideBar from './components/SideBar';
import { Outlet } from "react-router-dom"

import classes from './AppContainer.module.css'
const AppContainer = () =>{

    return <div>
        <Header />
        <div className='d-flex'>
         <div className={classes.sideBar}>
         <SideBar />
         </div>
        <div className='flex-fill px-3 px-lg-3 py-3 mb-4'>     
        <Outlet />
        </div>
         </div>
       </div>
}
export default AppContainer