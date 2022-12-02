import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import questionResponses from "../sample-data/SampleData";
import { usersResponse } from "../sample-data/SampleData";

import classes from "./Preview.module.css";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../url";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { surveyAction } from "../store/slices/ServeySlice";
import { questionAction } from "../store/slices/QuestionSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserRegister from "../components/UserRegister";
import { isLoadingAction } from "../store/spinerSlice";
function Preview() {
  const [checkAnswers, setCheckAnswers] = useState([]);

  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  console.log("selected", selectedSurvey);
  const [questions, setQuestions] = useState([]);
  const [questionResponses, setQuestionResponses] = useState([
    // {
    //   questionId:'',
    //   answer:'',
    //   multipleAnswer:[],
    // }
  ]);

  const { surveyId } = useParams();
  const dispatch = useDispatch();
   const navigate=useNavigate()
  useEffect(() => {
    fetchQuestions();
    fetchSelectedServey();
  }, []);

  const returnArray = (start, end) => {
    console.log("stra=", start + " " + end);
    const numbers = [];

    if (start > end) {
      let temp = start;
      start = end;
      end = temp;
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    // numbers.sort((a, b) => a - b);
    console.log("numbers", numbers);
    return numbers;
  };
  const fetchSelectedServey = async () => {
    dispatch(isLoadingAction.setIsLoading(true))

    try {
      const response = await apiClient.get(`/api/surveys/${surveyId}`);
      if (response.status === 200) {
        console.log("", response.data);
        dispatch(surveyAction.setSelectedSurvey(response.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false))

    }
  };
  const fetchQuestions = async () => {
    dispatch(isLoadingAction.setIsLoading(true))

    try {
      const response = await apiClient.get(`/api/questions/${surveyId}`);
      if (response.status === 200) {
        if (response.data.length) {
          console.log("res.dat", response.data);

          const arrangedQuestions = response.data
            .map((question) => {
              return {
                ...question,
                isSaved: 1,
              };
            })
            .reverse();
          setQuestions(arrangedQuestions);
          dispatch(questionAction.setQuestions(arrangedQuestions));
          console.log("q12", questions);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false))

    }
  };
  const handleOneAnswer = (e, questionId) => {
    const allResponse = [...questionResponses];
    const index = allResponse.findIndex(
      (resp) => resp.questionId === questionId
    );
    if(index === -1){
      allResponse.push({ questionId, answer: e.target.value })
    }else{
          allResponse[index] = { questionId, answer: e.target.value };

    }
    setQuestionResponses(allResponse);
    console.log("short answer", allResponse[index]);
  };
  const handleScaleAnswer = (e, questionId, answer) => {
    const allResponse = [...questionResponses];
    const index = allResponse.findIndex(
      (resp) => resp.questionId === questionId
    );
    if(index === -1){
      allResponse.push({ questionId, answer: e.target.value,multipleAnswer:[] })
    }else{
          allResponse[index] = { questionId, answer: e.target.value,multipleAnswer:[] };

    }
    console.log("scale-answer", allResponse[index]);
    setQuestionResponses(allResponse);
    console.log("re", questionResponses);
  };
  const handleMultipleAnswer = (e, questId) => {
   
    const allResponse = [...questionResponses];
   
    console.log('checked and unchecked val',e.target);
    const {value,checked}=e.target
    
    if(checked){
      console.log('checked',e.target.value);

      const index = allResponse.findIndex((resp) => resp.questionId === questId);
  
      if (index === -1) {
        const answer={
          questionId:questId,
          answer:null,
          multipleAnswer:[`${value}`]
        }
        allResponse.push(answer)
      } else {
      //  const multipleAnswer=[...allResponse[index].multipleAnswer]
       allResponse[index]['multipleAnswer']=[...allResponse[index]?.multipleAnswer,''+value]
      }
      console.log("mult-answer-old", allResponse[index]);

      setQuestionResponses(allResponse);

    }else{
      console.log('unchecked',e.target.value);

      const index = allResponse.findIndex((resp) => {
        console.log('cmp',resp.questionId + ' '+ questId)
       return resp.questionId === questId
      });
      console.log('index ',index)
      console.log('q_id ',questId)
      // console.log('r_q_id ',resp.questionId)
      const filterd=allResponse[index].multipleAnswer.filter((multi_ans)=>multi_ans !== value )
                    allResponse[index]={...allResponse[index],multipleAnswer:filterd}
      setQuestionResponses(allResponse);
      console.log("mult-answer-old", allResponse);

    }
  };
  const submitResponse = async (e) => {
    e.preventDefault();
    console.log("all response ", questionResponses);
  };
  const clearResponse = async () => {
    setQuestionResponses([]);
    console.log("all response ", questionResponses);
  };
  return (
    <div>
      
      {/* <div><UserRegister/></div> */}
      {questions.map((question, index) => {
        return (
          <div>
            <div className="border m-3 p-3 ps-4 rounded-top rounded-bottom rounded-right rounded-left mx-5 d-flex  flex-column justify-content-center align-items-space">
              <div className="mb-3">{index + 1 + ". " + question.text}</div>
              <Form className="mx-5">
                {question.type === "linear" ? (
                  <Form.Group className="d-flex justify-content-start mx-5">
                    {returnArray(
                      Number(question.responseChoices[0].text),
                      Number(question.responseChoices[1].text)
                    ).map((opt) => {
                      return (
                        <div className="m-4 ">
                          <Form.Check
                            className=""
                            type="radio"
                            key={opt}
                            id={opt}
                            name={question.id}
                            value={opt}
                            onClick={(e) =>
                              handleScaleAnswer(e, question.id, opt)
                            }
                            //  disabled
                            //  checked={question.answer.some((ans)=> ans === opt.title)}
                          />
                          <Form.Label>{opt}</Form.Label>
                        </div>
                      );
                    })}
                  </Form.Group>
                ) : question.type === "short" ? (
                  <Form.Group>
                    <Form.Label aria-label={question.text}></Form.Label>
                    <Form.Control
                      className="bg-white"
                      id={index}
                      key={index}
                      // value={question.text}
                      type="text"
                      as="textarea"
                      onChange={(event) => handleOneAnswer(event, question.id)}
                    />
                  </Form.Group>
                ) : question.type === "radio" ? (
                  (
                    question.responseChoices.map((opt, index) => {
                      return (
                        <Form.Group>
                          <div key={index}>
                            <Form.Check
                              type={question.type}
                              key={index}
                              id={opt.id}
                              name={question.id}
                              value={opt.text}
                              label={opt.text}
                              onClick={(e) =>  handleOneAnswer(e, question.id)}
                               
                            />
                          </div>
                        </Form.Group>
                      );
                    })
                  )
                ) : (
                  question.responseChoices.map((opt, index) => {
                    return (
                      <Form.Group>
                        <div key={index}>
                          <Form.Check
                            type={question.type}
                            key={index}
                           
                            name={question.id}
                            label={opt.text}
                            value={opt.text}
                            // checked={}
                            onClick={(e) => handleMultipleAnswer(e,question.id)}
                          />
                        </div>  
                      </Form.Group>
                    );
                  })
                )}
              </Form>
            </div>
          </div>
        );
      })}
      <div className=" m-3 p-3 ps-4 d-flex justify-content-between">
      <Button variant="dark" className="px-3" onClick={()=>navigate(-1)}>
        <ArrowBackIcon/>
          Back
     </Button> 
     <div>
         <Button variant="dark" className="mx-4 px-3" onClick={submitResponse}>
          Submit
        </Button>
        <Link variant="dark" onClick={clearResponse}>Clear Response</Link>
     </div>
       
      </div>
    </div>
  );
}

export default Preview;
