import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard'
import { isLoadingAction } from '../store/spinerSlice';
import apiClient from '../url';

function Dashboard() {

  const navigate = useNavigate();
  const dispatch =useDispatch()
  const [serveyList,setSurveyList]=useState([])
  // const serveyList=useSelector(state=>state.survey.surveys)
  useEffect(() => {
    fetchSurveys();
  }, []);
  const fetchSurveys = async () => {
    dispatch(isLoadingAction.setIsLoading(true))

    try {
       const response=await apiClient.get(`/api/surveys`)
      if (response.status === 200) {
        console.log(response.data)
        setSurveyList(response.data)
        // dispatch(surveyAction.setSurveys(response.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false))

    }
  };

  return (
    <div>
      <DashboardCard surveys={serveyList}/>
    </div>
  )
}

export default Dashboard