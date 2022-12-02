import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import classes from "./Survey.module.css";
import { useNavigate } from "react-router-dom";
import { allSurvey } from "../sample-data/SampleData";
import AddSurvey from "./AddSurvey";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { surveyAction } from "../store/slices/ServeySlice";
import apiClient from "../url";
import { questionAction } from "../store/slices/QuestionSlice";
import { Alert } from "@mui/material";
import { isLoadingAction } from "../store/spinerSlice";

export default function SurveyList() {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  // const [serveyList,setSurveyList]=useState(allSurvey)
  const serveyList=useSelector(state=>state.survey.surveys)
  const [show,setShow]=useState(false)
  const [modalTitle,setModalTitle]=useState('Add Survey')
  const [survey, setSurvey] = useState({ });

  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    dispatch(isLoadingAction.setIsLoading(true))

    try {
       const response=await apiClient.get(`/api/surveys`)
      if (response.status === 200) {
        console.log(response.data)
        dispatch(surveyAction.setSurveys(response.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false))

    }
  };

  const addSurveyHandler = () =>{
    setModalTitle('Add Survey')
    setShow(true)
  }
   const editSurveyHandler = (survey) =>{
    
    setModalTitle('Edit Survey')
    console.log('su1',survey)
     setSurvey(survey)
    setShow(true)
   }

   const deleteSurveyHandler = async(e,id) =>{
  
    try {
      const response = await apiClient.delete(`/api/surveys/${id}`)
     if (response.status === 200) {
       console.log(response.data)
       dispatch(surveyAction.deleteSurvey(id))
      }
   } catch (error) {
     console.log(error);
   } finally {
   }
   }
   const closeModalHandler = () =>{
    setShow(false)
   }

   const formatSurveyDate=(date)=>{
    const todayDate = new Date(date); 
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}`:todayDate.getDate();
    const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth()}`: todayDate.getMonth();
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
    return formattedDate.toString()
  } 

  return (
    <div className="mx-4 d-flex flex-column">
      <div className="d-flex justify-content-between mb-4">
        <div> Survey List</div>
        <div className="">
          <button className="btn btn-warning" onClick={addSurveyHandler} >Add New Survey</button>
        </div>
      </div>
      {serveyList.length === 0 ? (<div style={{ float:"right"}} className="w-25 align-self-end">
        No Survey
  
      </div>
                 
      ):
      
      (<div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Opening Date</th>
              <th>Closing Date</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           { serveyList.map((survey,index) => {
              return (
                <tr key={index} className={classes.row}>
                  <td className="p-3">{index +1}</td>
                  <td className="p-3">{survey.name}</td>
                  <td style={{whiteSpace:"nowrap"}} className="p-3">{formatSurveyDate(survey.openingAt)}</td>
                  <td style={{whiteSpace:"nowrap"}} className="p-3">{formatSurveyDate(survey.closingAt) }</td>
                  <td  className="p-3">{survey.status === true ? 'Opened' : 'Closed'}</td>
                  <td className="p-3">{survey.description}</td>
                  <td className="onPrintDnone">
                    <Dropdown>
                      <Dropdown.Toggle variant="none" id="dropdown-basic">
                        {/* <i className="fas fa-ellipsis-v "></i>  */}
                        <MoreVertOutlinedIcon />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={classes.dropdownBg}>
                        <Button
                          variant="none"
                          className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                          onClick={() => editSurveyHandler(survey)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="none"
                          className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                          onClick={(e) => deleteSurveyHandler(e,survey.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="none"
                          className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                          onClick={() => {
                            dispatch(surveyAction.setSelectedSurvey(survey))
                            navigate(`/surveys/${survey.id}/questions`)
                          }}
                        >
                          Questions
                        </Button>
                        <Button
                          variant="none"
                          className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                          onClick={() => {
                            dispatch(surveyAction.setSelectedSurvey(survey))
                            navigate(`/surveys/${survey.id}/responses`)
                          }
                        }
                        >
                          Responses
                        </Button>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      )}
      <AddSurvey show={show} title={modalTitle} onClose={closeModalHandler} survey={survey} />

    </div>
  );
}
