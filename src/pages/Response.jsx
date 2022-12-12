import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Individual from '../components/response/Individual';
import Questions from '../components/response/Questions';
import Summary from '../components/response/Summary';
import { responseAction } from '../store/slices/QuestionResponseSlice';
import { surveyAction } from '../store/slices/ServeySlice';
import { isLoadingAction } from '../store/spinerSlice';
import apiClient from '../url';
import './Response.css'

function Response() {
  const [key, setKey] = useState('summary');
  const [loaded, setLoaded] = useState(0);
  const [questionResponses, setQuestionResponses] = useState([]);
  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  const dispatch = useDispatch();

  const { surveyId } = useParams();

  useEffect(() => {
    fetchQuestions();
    fetchRespondentQuestions();
    fetchSelectedServey();
  }, []);

  const fetchSelectedServey = async () => {
    try {
      const response = await apiClient.get(`/api/surveys/${surveyId}`);
      if (response.status === 200) {
        console.log(response.data);
        dispatch(surveyAction.setSelectedSurvey(response.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const fetchQuestions = async () => {
    dispatch(isLoadingAction.setIsLoading(true));

    try {
       const response=await apiClient.get(`/api/responses/${surveyId}`)
      if (response.status === 200) {
        dispatch(responseAction.setResponses(response.data))
        // setLoaded(1)
        console.log('fetched = ',response.data)

      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false));

    }
  };
  const fetchRespondentQuestions = async () => {
    try {
       const response=await apiClient.get(`/api/responses/individual/${surveyId}`)
      if (response.status === 200) {
        setQuestionResponses(response.data);
        dispatch(responseAction.setIndividualResponses(response.data))
        //  setLoaded(1)
        console.log('fetched Indi= ',response.data)

      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  
  return (
    <div className='mt-0'>
      <div className='m-0'><h6 className='ms-5'>2 Responses</h6></div>
    <div className='d-flex flex-column justify-content-between align-items-end mb-2 me-5 mt-0' >
      <div>
    <div  >Survey Name : {selectedSurvey.name}</div>
    <div  >Survey Status :{selectedSurvey.status == 0  ? "Closed" : "Opened"}</div>
    </div>
    </div>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      transition={false}
      onSelect={(k) => setKey(k)}
      className="mb-3 d-flex justify-content-center align-items-center border-color-gray-600"
      // fill
      // justify
      // variant="pills"
      
    >
      <Tab eventKey="summary" title="Summary" className='mx-5 border-0' >
        <Summary surveyId={surveyId}  />
      </Tab>
      <Tab eventKey="question" title="Question" className='mx-5 border-0' >
        <Questions surveyId={surveyId}  />
      </Tab>
      <Tab eventKey="individual" title="Individual" className='mx-5 border-0' >
        <Individual />
      </Tab>
    </Tabs>
    </div>
  );
}

export default Response;