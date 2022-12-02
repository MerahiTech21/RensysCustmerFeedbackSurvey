import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AppContainer from "../AppContainer";
import Dashboard from "../pages/Dashboard";
import Questions from "../pages/Questions";
import SurveyList from "../pages/SurveyList";
import Response from "../pages/Response";
import Survey from "../pages/Survey";
import Preview from "../pages/Preview";
import LoginPage from "../pages/login/LoginPage";
import ForgotPassword from "../pages/login/ForgotPassword";
import NotFound from "../pages/NotFound";
import Setting from "../pages/Setting";
import VerifyPassword from "../pages/login/VerifyOtp";
import VerifyOtp from "../pages/login/VerifyOtp";
import NewPassword from "../pages/login/NewPassword";
import UserRegister from "../components/UserRegister";

function Rouuter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="surveys" element={<Survey />}>
            <Route path="" index element={<SurveyList />}></Route>
            <Route path=":surveyId/questions" element={<Questions />}></Route>
            <Route path=":surveyId/preview" element={<Preview />}></Route>
            <Route path=":surveyId/user-register" element={<UserRegister />}></Route>
            <Route path=":surveyId/responses" element={<Response />}></Route>
          </Route>
          <Route path="setting" element={<Setting />}/>
          {/* <Route path="logout" element={<Employee />}></Route> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<NewPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rouuter;
