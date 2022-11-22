import React from 'react'
import {Routes, Route,BrowserRouter} from 'react-router-dom'
import AppContainer from '../AppContainer'
import Dashboard from '../pages/Dashboard'
import Questions from '../pages/Questions'
import Employee from '../pages/employee/Employee'
import SurveyList from '../pages/SurveyList'
function Rouuter() {
  return (
<BrowserRouter>
  <Routes>
    
     <Route path='/' element={<AppContainer/>}>
     <Route path='dashboard'  element={<Dashboard/>}></Route>
     <Route path='questions'  element={<Questions/>}></Route>
     <Route path='surveys'  element={<SurveyList/>}></Route>
     <Route path='employees'  element={<Employee/>}></Route>
     </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default Rouuter