import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";

import classes from "./Preview.module.css";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../url";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { surveyAction } from "../../store/slices/ServeySlice";
import { questionAction } from "../../store/slices/QuestionSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserRegister from "../../components/UserRegister";
import { isLoadingAction } from "../../store/spinerSlice";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

const db = new Dexie("myDatabase");
db.version(1).stores({
  answers:
    "++id, questionId,answer,surveyId, multipleAnswer,name,phoneNumber,region,zone,woreda,kebele", // Primary key and indexed props
});

function Answer() {
  const [checkAnswers, setCheckAnswers] = useState([]);
  const [responseErrors, setResponseErrors] = useState([]);

  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  const [questions, setQuestions] = useState([]);
  const [questionResponses, setQuestionResponses] = useState([
    // {
    //   questionId:'',
    //   answer:'',
    //   multipleAnswer:[],
    // }
  ]);

  const answers = useLiveQuery(() => db.answers.toArray());

  const userData = useSelector((state) => state.user.farmer);
  const isLoading = useSelector((state) => state.btn.isLoading);

  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

        if ("serviceWorker" in navigator) {
        navigator.serviceWorker
        .register("/sw.js")
        .then(serviceWorker => {
          console.log("Service Worker registered: ", serviceWorker);
        })
        .catch(error => {
          console.error("Error registering the Service Worker: ", error);
        });
    }
    fetchQuestions();
    fetchSelectedServey();

    const check = async () => {
      try {
        const online = await apiClient.get("/api/surveys/ws/echo",
          { cache: "no-store" }
        );
        const status = online.status >= 200 && online.status < 300;
        if (status && answers?.length > 0) {
          syncOfflineSavedAnswers();
        }
      } catch (err) {
        return false;
      }
      
    };
    check();
  }, []);

  window.ononline= (event) => {  
    console.log('you are now connected')
    syncOfflineSavedAnswers()
  }

//   window.addEventListener('online', (event) => {
//     console.log("You are now connected to the network.");
//     syncOfflineSavedAnswers()

// });

  const syncOfflineSavedAnswers = async() => {
    console.log("data to be Synced", answers);
    await db.answers.clear()
  };
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

    return numbers;
  };
  const fetchSelectedServey = async () => {
    dispatch(isLoadingAction.setIsLoading(true));

    try {
      const response = await apiClient.get(`/api/surveys/${surveyId}`);
      if (response.status === 200) {
        dispatch(surveyAction.setSelectedSurvey(response.data));
      }
    } catch (error) {
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
        }
      }
    } catch (error) {
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
    setQuestionResponses(allResponse);
  };
  const handleMultipleAnswer = (e, questId) => {
    const allResponse = [...questionResponses];

    const { value, checked } = e.target;

    if (checked) {

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

  const checkOnlineStatus = async () => {
    try {
      const online = await apiClient(
        "api/surveys/ws/echo",
        { cache: "no-store" }
      );
      return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
      return false;
    }
  };

  const saveOffline = async () => {
    const formatted = questionResponses.map((res) => {
      return {
        ...res,
        surveyId,
        ...userData,
      };
    });

    for (let index = 0; index < formatted.length; index++) {
      const oneData = formatted[index];
      await db.answers.add(oneData);
    }
  
  };

  const submitResponse = async (e) => {
    e.preventDefault();
    const errors = validateErrors(questionResponses);
    setResponseErrors(errors);

    const online = await checkOnlineStatus();
    console.log("isOnline", online);
    if (!online) {
      saveOffline();
      return;
    }

    if (errors.length === 0) {
      try {
        dispatch(buttonAction.setBtnSpiner(true));
        var response = await apiClient.post("api/responses", {
          userData,
          surveyId: surveyId,
          questionResponses,
        });
        if (response.status === 201) {
          // fetchUserData();
          console.log("success", response.data);
          navigate("/success");
        }
      } catch (err) {
        console.log(err);
        // setErrors((prevErrors) => {
        //   return { ...prevErrors, errNotify: err.response?.data.msg};
        // });
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
    console.log("all Errors ", { responseErrors });
  };
  const clearResponse = async () => {
    setQuestionResponses([]);
    setResponseErrors([]);
    console.log("all response ", questionResponses);
  };

  console.log("offline ", answers);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center px-sm-0 mx-lg-5 px-lg-5">
      <div className="mx-lg-5 mx-sm-1 px-0">
      
        {
          questions.length == 0? <div className="m-5 p-5 fw-bold"> No Questions Available to This Survey to Respond</div> :(
        questions.map((question, index) => {
          return (
            <div key={index} className="border my-3 p-3 m-3 px-sm-1 rounded d-flex  flex-column justify-content-start align-items-space bg-light  mx-lg-5">
              <div className="mb-3 mx-lg-5">
                {question.required
                  ? index + 1 + "." + " * " + question.text
                  : index + 1 + ". " + question.text}
              </div>
              <div className="mx-lg-5">
                {question.type === "linear" ? (
                  <Form.Group className="d-flex justify-content-between mx-0 my-sm-1">
                    {returnArray(
                      Number(question.responseChoices[0].text),
                      Number(question.responseChoices[1].text)
                    ).map((opt,index) => {
                      return (
                        <div key={index}  className="my-2 mx-lg-3 mx-sm-2 mx-md-3 px-sm-2 px-md-2 ">
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
                      // value={question.text}
                      required={true}
                      type="text"
                      as="textarea"
                      onChange={(event) => handleOneAnswer(event, question.id)}
                    />
                  </Form.Group>
                ) : question.type === "radio" ? (
                  question.responseChoices.map((opt, index) => {
                    return (
                      <Form.Group key={index}>
                        <div >
                          <Form.Check
                            type={question.type}
                            // key={index}
                            id={opt.id}
                            name={question.id}
                            value={opt.text}
                            label={opt.text}
                            onClick={(e) => handleOneAnswer(e, question.id)}
                          ></Form.Check>
                        </div>
                      </Form.Group>
                    );
                  })
                ) : (
                  question.responseChoices.map((opt, index) => {
                    return (
                      <Form.Group key={index}>
                        <div >
                          <Form.Check
                            type={question.type}
                            // key={index}
                            id={"op" + question + index}
                            name={question.id}
                            label={opt.text}
                            value={opt.text}
                            // checked={}
                            onClick={(e) =>
                              handleMultipleAnswer(e, question.id)
                            }
                          >
                            {/* <Form.Label>{opt.text}</Form.Label> */}
                          </Form.Check>
                        </div>
                      </Form.Group>

                      // <div class="form-check">
                      //   <input
                      //   className="form-check-input"
                      //           type={question.type}
                      //       key={index}
                      //       id={'op'+question+index}

                      //       name={question.id}
                      //       label={opt.text}
                      //       value={opt.text}
                      //     />
                      //   <label class="form-check-label" for={'op'+question+index}>
                      //   {opt.text}
                      //   </label>
                      // </div>
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
        })
          )
        }
        { questions.length != 0 && (
        <div className=" mx-3 ms-lg-5 py-lg-1 px-lg-1 ps-sm-1  my-3 d-flex justify-content-between ">
          <div className="d-flex m-sm-1 px-sm-1 py-sm-1 py-lg-0 justify-content-start ">
            <Button
              variant="dark"
              className=""
              onClick={() => navigate(-1, { state: userData })}
            >
              <ArrowBackIcon />
              Back
            </Button>
          </div>
          <div className="d-flex mx-2 px-lg-3 px-sm-0 me-1">
            <Button variant="dark" className="py-2" onClick={submitResponse}>
              Submit
              {isLoading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
            </Button>
            {responseErrors.length > 0 && (
              <Link variant="dark" onClick={clearResponse}>
                Clear Response
              </Link>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Answer;
