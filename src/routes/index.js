import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppContainer from "../AppContainer";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/login/LoginPage";
import ForgotPassword from "../pages/login/ForgotPassword";
import NotFound from "../pages/NotFound";
import Setting from "../pages/Setting";
import VerifyOtp from "../pages/login/VerifyOtp";
import NewPassword from "../pages/login/NewPassword";
import UserRegister from "../components/UserRegister";
import { useLocation } from "react-router-dom";
import Answer from "../pages/answerForm/Answer";
import Success from "../pages/Success";
import RespondentList from "../pages/respondent/RespondentList";
import RespondentAnswer from "../pages/respondent/RespondentAnswer";
import Respondent from "../pages/respondent/Respondent";


function Rouuter() {
  const token=localStorage.getItem('token');
  // const token='';
  const navigate=useNavigate();
  const location= useLocation();
  // const from=location.state?.from?.pathname || 'dashboard'
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route path="" index element={<Dashboard />}></Route>
    
          <Route path="users"  element={<Respondent />}>
          <Route path=":userId/responses" index element={<RespondentList/>}></Route>
          <Route path=":userId/responses/:respId" element={<RespondentAnswer/>}></Route>
          
          </Route>
          <Route path="setting" element={<Setting />}/>
          {/* <Route path="logout" element={<Employee />}></Route> */}
        </Route>
         <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<NewPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/fill-answer/:surveyId" element={<Answer  />} />
        <Route path="/fill-user/:surveyId" element={<UserRegister type='userside' />} />
        <Route path="/success" element={<Success/> } />
 
        <Route path="*" element={<NotFound />} />
      </Routes>
    // </BrowserRouter>
  );
}

export default Rouuter;
