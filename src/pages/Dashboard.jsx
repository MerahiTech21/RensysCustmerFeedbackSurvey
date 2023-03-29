import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard'
import { surveyAction } from '../store/slices/ServeySlice';
import { isLoadingAction } from '../store/spinerSlice';
import apiClient from '../url';

function Dashboard() {


  const [survey,setSurvey]=useState({});

  useEffect(() => {
    const user=localStorage.getItem('user');
    if(user){
       const parseUser=JSON.parse(user)
         setSurvey(parseUser.survey)
    }
  }, []);
 

  return (
    <div>
      <DashboardCard survey={survey}/>
    </div>
  )
}

export default Dashboard