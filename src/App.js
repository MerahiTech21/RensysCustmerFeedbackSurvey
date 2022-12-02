import {Fragment,useEffect} from 'react'

import Spiner from './Spiner';
import Router from './routes';

import './App.css';
import { useSelector } from 'react-redux';


function App() {
  const isLoading = useSelector((state=>state.loading.isLoading))

  return ( 
    <div >
    <Router />
    
    {
      isLoading && (<Spiner /> )
    }    
    
    </div>
    
  );
}

export default App;
