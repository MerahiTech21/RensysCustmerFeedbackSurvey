import {Fragment,useEffect} from 'react'

import Spiner from './Spiner';
import Router from './routes';

import './App.css';


function App() {

  return ( 
    <Fragment>
    <Router />
    
    {/* {
      isLoading && (<Spiner /> )
    }     */}
    
    </Fragment>
    
  );
}

export default App;
