import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserRegister from "../components/UserRegister";
import { isLoadingAction } from "../store/spinerSlice";
import { buttonAction } from "../store/slices/ButtonSpinerSlice";
function Preview() {
  const [checkAnswers, setCheckAnswers] = useState([]);

  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  console.log("selected", selectedSurvey);
  const [questions, setQuestions] = useState([]);
  const [questionResponses, setQuestionResponses] = useState([]);
  const [responseErrors, setResponseErrors] = useState([]);
  const userData = useSelector((state) => state.user.farmer);
  const isLoading = useSelector((state) => state.btn.isLoading);

  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetchQuestions();
    fetchSelectedServey();
  }, []);

  const validateErrors = (answers) => {
    const errors = [];
    questions.forEach((question) => {
      if (
        question.required &&
        !answers.some((ans) => ans.questionId == question.id)
      ) {
        errors.push(question.id);
      }
    });
    return errors;
  };
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
    dispatch(isLoadingAction.setIsLoading(true));

    try {
      const response = await apiClient.get(`/api/surveys/${surveyId}`);
      if (response.status === 200) {
        console.log("", response.data);
        dispatch(surveyAction.setSelectedSurvey(response.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false));
    }
  };
  const fetchQuestions = async () => {
    dispatch(isLoadingAction.setIsLoading(true));

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
      dispatch(isLoadingAction.setIsLoading(false));
    }
  };
  const handleOneAnswer = (e, questionId) => {
    const allResponse = [...questionResponses];
    const index = allResponse.findIndex(
      (resp) => resp.questionId === questionId
    );
    if (index === -1) {
      allResponse.push({
        questionId,
        answer: e.target.value,
        multipleAnswer: [],
      });
    } else {
      allResponse[index] = {
        questionId,
        answer: e.target.value,
        multipleAnswer: [],
      };
    }
    setQuestionResponses(allResponse);
    console.log("short answer", allResponse[index]);
  };
  const handleScaleAnswer = (e, questionId, answer) => {
    const allResponse = [...questionResponses];
    const index = allResponse.findIndex(
      (resp) => resp.questionId === questionId
    );
    if (index === -1) {
      allResponse.push({
        questionId,
        answer: e.target.value,
        multipleAnswer: [],
      });
    } else {
      allResponse[index] = {
        questionId,
        answer: e.target.value,
        multipleAnswer: [],
      };
    }
    console.log("scale-answer", allResponse[index]);
    setQuestionResponses(allResponse);
    console.log("re", questionResponses);
  };
  const handleMultipleAnswer = (e, questId) => {
    const allResponse = [...questionResponses];

    console.log("checked and unchecked val", e.target);
    const { value, checked } = e.target;

    if (checked) {
      console.log("checked", e.target.value);

      const index = allResponse.findIndex(
        (resp) => resp.questionId === questId
      );

      if (index === -1) {
        const answer = {
          questionId: questId,
          answer: null,
          multipleAnswer: [`${value}`],
        };
        allResponse.push(answer);
      } else {
        //  const multipleAnswer=[...allResponse[index].multipleAnswer]
        allResponse[index]["multipleAnswer"] = [
          ...allResponse[index]?.multipleAnswer,
          "" + value,
        ];
      }
      console.log("mult-answer-old", allResponse[index]);

      setQuestionResponses(allResponse);
    } else {
      console.log("unchecked", e.target.value);

      const index = allResponse.findIndex((resp) => {
        console.log("cmp", resp.questionId + " " + questId);
        return resp.questionId === questId;
      });
      console.log("index ", index);
      console.log("q_id ", questId);
      // console.log('r_q_id ',resp.questionId)
      const filterd = allResponse[index].multipleAnswer.filter(
        (multi_ans) => multi_ans !== value
      );
      allResponse[index] = { ...allResponse[index], multipleAnswer: filterd };
      setQuestionResponses(allResponse);
      console.log("mult-answer-old", allResponse);
    }
  }; 
  const submitResponse = async (e) => {
    e.preventDefault();
    const errors = validateErrors(questionResponses);
    setResponseErrors(errors);
    if (errors.length === 0) {
      try {
        dispatch(buttonAction.setBtnSpiner(true));
        // var response = await axios.post("https://hotroom.merahitechnologies.com/admin/auth/login", cridentials);
        var response = await apiClient.post("api/responses", {
          userData,
          surveyId: surveyId,
          questionResponses,
        });
        if (response.status === 201) {
          // fetchUserData();
          console.log("success", response.data);
          //  navigate(from,{replace:true})
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
    console.log("all Errors ", { errors });
  };
  const clearResponse = () => {
    const answer = {
      questionId: null,
      answer: null,
      multipleAnswer: [],
    };
    setQuestionResponses([answer]);
    setResponseErrors([]);
    console.log("all response ", questionResponses);
  };
  return (
    <div>
      {/* <div><UserRegister/></div> */}
      {questions.map((question, index) => {
        return (
          <div className="border my-3 p-3 ps-4 rounded d-flex  flex-column justify-content-start align-items-space bg-light mx-sm-1 mx-lg-5">
            <div className="mb-3 mx-0">
              {question.required
                ? index + 1 + "." + " * " + question.text
                : index + 1 + ". " + question.text}
            </div>
            <div className="mx-0">
              {question.type === "linear" ? (
                <Form.Group
                  className={
                    responseErrors.some((rE) => rE === question.id)
                      ? classes.errorBorder +
                        " d-flex justify-content-between mx-0 my-sm-1"
                      : "d-flex justify-content-between mx-0 my-sm-1"
                  }
                >
                  {returnArray(
                    Number(question.responseChoices[0].text),
                    Number(question.responseChoices[1].text)
                  ).map((opt) => {
                    return (
                      <div className="my-2 mx-lg-3 mx-sm-2 mx-md-3 px-sm-2 px-md-2 ">
                        <Form.Check
                          className=""
                          type="radio"
                          key={opt}
                          id={"linear" + question.id + opt}
                          name={question.id}
                          value={opt}
                          onClick={(e) =>
                            handleScaleAnswer(e, question.id, opt)
                          }
                          required={true}
                          //  disabled
                          //  checked={question.answer.some((ans)=> ans === opt.title)}
                        />
                        <Form.Label htmlFor={"linear" + question.id + opt}>
                          {opt}
                        </Form.Label>
                      </div>
                    );
                  })}
                </Form.Group>
              ) : question.type === "short" ? (
                <Form.Group>
                  <Form.Label aria-label={question.text}></Form.Label>
                  <Form.Control
                    className={
                      responseErrors.some((rE) => rE === question.id)
                        ? classes.errorBorder + " bg-white"
                        : " bg-white"
                    }
                    id={index}
                    key={index}
                    value={
                      questionResponses.find((q) => q.questionId == question.id)
                        ?.answer
                    }
                    type="text"
                    as="textarea"
                    onChange={(event) => handleOneAnswer(event, question.id)}
                  />
                </Form.Group>
              ) : question.type === "radio" ? (
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
                          onClick={(e) => handleOneAnswer(e, question.id)}
                        />
                      </div>
                    </Form.Group>
                  );
                })
              ) : (
                question.responseChoices.map((opt, index) => {
                  return (
                    <Form.Group>
                      <div key={index}>
                        <Form.Check
                          type={question.type}
                          key={index}
                          id={"op" + question + index}
                          name={question.id}
                          label={opt.text}
                          value={opt.text}
                          // checked={}
                          onClick={(e) => handleMultipleAnswer(e, question.id)}
                        />
                      </div>
                    </Form.Group>
                  );
                })
              )}
              <span className={classes.errorText}>
                {responseErrors.some((rE) => rE === question.id)
                  ? "Required"
                  : ""}
              </span>
            </div>
          </div>
        );
      })}
      <div className=" m-3 p-3 ps-4 d-flex justify-content-between">
        <Button
          variant="dark"
          className="px-3"
          onClick={() => navigate(-1, { state: userData })}
        >
          <ArrowBackIcon />
          Back
        </Button>
        <div className="d-flex">
          <Button variant="dark" className="mx-4 px-3" onClick={submitResponse}>
            <span className="me-2">
              {isLoading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
            </span>
            Submit
          </Button>
          {responseErrors.length > 0 && (
            <Link variant="dark" onClick={clearResponse}>
              Clear Response
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Preview;
