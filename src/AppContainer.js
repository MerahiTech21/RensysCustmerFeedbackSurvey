import { Fragment,useEffect } from 'react';
import Header from './components/Header'
import SideBar from './components/SideBar';
import { Outlet } from "react-router-dom"

import classes from './AppContainer.module.css'
const AppContainer = () =>{

    return <Fragment>
        <Header />
        <div className='d-flex'>
         <div className={classes.sideBar}>
         <SideBar />
         </div>
        <div className='flex-fill px-3 px-lg-3 py-4 mb-4'>     
        <Outlet />
        </div>
         </div>
       </Fragment>
}
export default AppContainer