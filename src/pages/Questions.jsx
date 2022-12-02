import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";
import apiClient from "../url";
import classes from "./Questions.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { questionAction } from "../store/slices/QuestionSlice";
import { surveyAction } from "../store/slices/ServeySlice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack"; // import SelectOption from "../components/SelectOption";
import { MenuItem, TextField } from "@mui/material";
import { isLoadingAction } from "../store/spinerSlice";

const questionTypes = [
  {
    id: 1,
    key: "radio",
    title: "Multiple Choice",
  },
  {
    id: 2,
    key: "short",
    title: "Short Answer",
  },
  {
    id: 3,
    key: "checkbox",
    title: "Check Box",
  },
  {
    id: 4,
    key: "linear",
    title: "Linear Scale",
  },
];

export default function Questions() {
  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  console.log("selected", selectedSurvey);
  const [questions, setQuestions] = useState([]);
  const [typingAt, setTypingAt] = useState();
  const [lowerLevel, setLowerLevel] = useState(0);
  const [uperLevel, setUpperLevel] = useState(5);
  const [showAlert, setShowAlert] = useState(false);

  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
    fetchSelectedServey();
  }, []);

  // setTimeout(()=>setShowAlert(false),5000)
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
          console.log("qustions", response.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false));
    }
  };
  const handleQuestion = (event, questionId) => {
    const questionsToUpdate = [...questions];
    const questionIndex = questionsToUpdate.findIndex(
      (quest) => quest.id === questionId
    );
    questionsToUpdate[questionIndex].text = event.target.value;
    setQuestions(questionsToUpdate);
    setTypingAt(questionIndex);
  };

  const handleQuestionType = (event, questionId) => {
    const questionsToUpdate = [...questions];
    const questionIndex = questionsToUpdate.findIndex(
      (quest) => quest.id === questionId
    );
    questionsToUpdate[questionIndex].type = event.target.value;
    setQuestions(questionsToUpdate);
    setTypingAt(questionIndex);
  };

  const handleQuestionOption = (event, questionIndex, optionIndex) => {
    console.log("event", event.target.value);
    setQuestions((prevQuestion) => {
      const newquestions = [...prevQuestion];
      newquestions[questionIndex].responseChoices[optionIndex].text =
        event.target.value;
      return newquestions;
    });
    setTypingAt(questionIndex);
  };
  const handleRequiredSwitch = (questionId) => {
    const questionsToUpdate = [...questions];
    const questionIndex = questionsToUpdate.findIndex(
      (quest) => quest.id === questionId
    );
    questionsToUpdate[questionIndex].required =
      !questionsToUpdate[questionIndex].required;
    setQuestions(questionsToUpdate);
    setTypingAt(questionIndex);
  };
  const addQuestion = () => {
    const oldQuestions = [...questions];
    const defautlQuestion = {
      id: nanoid(),
      text: " Enter Your Question Here",
      type: "checkbox",
      required: 0,
      isSaved: 0,
      responseChoices: [
        {
          id: nanoid(),
          text: "Option 1",
        },
      ],
    };
    //console.log(Array.prototype.indexOf.call(arrayLike, 2));

    oldQuestions.unshift(defautlQuestion);
    const addedIndex = oldQuestions.findIndex(
      (q) => q.id === defautlQuestion.id
    );
    setQuestions(oldQuestions);
    setTypingAt(addedIndex);
  };

  const deleteQuestion = async (index, questionId) => {
    try {
      let qns = [...questions];
      const deletedIndex = qns.findIndex(
        (question) => question.id === questionId
      );

      if (qns[deletedIndex].isSaved) {
        const response = await apiClient.delete(`/api/questions/${questionId}`);
        if (response.status === 200) {
          qns.splice(deletedIndex, 1);
          setQuestions(qns);
          dispatch(questionAction.deletedQuestion(questionId));
        }
      } else {
        qns.splice(deletedIndex, 1);
        setQuestions(qns);
        dispatch(questionAction.deletedQuestion(questionId));
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const saveQuestion = async (questionId, index) => {
    const questionsToSave = [...questions];
    const questionIndex = questionsToSave.findIndex(
      (quest) => quest.id === questionId
    );
    questionsToSave[questionIndex].order = questionIndex;
    questionsToSave[questionIndex].surveyId = surveyId;
    const question = questionsToSave[questionIndex];

    try {
      const response = await apiClient.post(`/api/questions`, question);
      if (response.status === 201) {
        questionsToSave[questionIndex] = response.data;
        questionsToSave[questionIndex].isSaved = 1;

        setQuestions(questionsToSave);
        // dispatch(questionAction.addQuestion(question))
        console.log("is Saved", questionsToSave[questionIndex].isSaved);
        setShowAlert(true);
      }
      console.log(question);
    } catch (error) {
      console.log("E while saving q", error);
    } finally {
    }
  };
  const editQuestion = async (questionId, index) => {
    const questionsToSave = [...questions];
    const questionIndex = questionsToSave.findIndex(
      (quest) => quest.id === questionId
    );
    const question = questionsToSave[questionIndex];
    try {
      const response = await apiClient.put(
        `/api/questions/${questionId}`,
        question
      );
      if (response.status === 200) {
        questionsToSave[questionIndex].isSaved = 1;
        setQuestions(questionsToSave);
        // dispatch(questionAction.addQuestion(question))
        console.log(question);
        setShowAlert(true);
      }
      console.log(question);
    } catch (error) {
    } finally {
    }
  };
  const publishSurveyQuestion = async () => {
    try {
      const response = await apiClient.put(`/api/surveys/status/${surveyId}`);
      if (response.status === 200) {
        const editedSurvey = { ...selectedSurvey };
        dispatch(
          surveyAction.editSurvey({
            ...editedSurvey,
            status: !editedSurvey.status,
          })
        );
        dispatch(
          surveyAction.setSelectedSurvey({
            ...editedSurvey,
            status: !editedSurvey.status,
          })
        );
      }
    } catch (error) {
    } finally {
    }
  };
  const addOption = (questionId, flag) => {
    const newquestions = [...questions];

    const findIndex = newquestions.findIndex((q) => q.id === questionId);
    const len = newquestions[findIndex].responseChoices.length;
    const oldOptions = newquestions[findIndex].responseChoices;
    const otherIndex = oldOptions.findIndex((oldOp) => oldOp.text === "other");
    const isthere = oldOptions.some((oldOp) => oldOp.text === "other");

    if (len <= 10) {
      if (isthere) {
        if (flag !== "other") {
          const defaultOption = {
            id: nanoid(),
            text: "Option " + (len + 1),
          };
          const other = {
            ...newquestions[findIndex].responseChoices[otherIndex],
          };
          newquestions[findIndex].responseChoices[otherIndex] = defaultOption;
          newquestions[findIndex].responseChoices.push(other);
        }
      } else {
        const defaultOption = {
          id: nanoid(),
          text: flag === "other" ? "other" : "Option " + (len + 1),
        };
        newquestions[findIndex].responseChoices.push(defaultOption);
        setTypingAt(findIndex);
      }
    }

    setQuestions(newquestions);
  };

  const deleteOption = (event, questionId, optionId, index) => {
    let qns = [...questions];

    const questionIndex = qns.findIndex(
      (question) => question.id === questionId
    );
    const options = qns[questionIndex].responseChoices;
    const deletedIndex = options.findIndex((op) => op.id === optionId);
    options.splice(deletedIndex, 1);

    setQuestions(qns);
    setTypingAt(questionIndex);
  };

  const setLinearLowerLevel = (e, questionIndex) => {
    console.log("event", e.target.value);
    setQuestions((prevQuestion) => {
      const newquestions = [...prevQuestion];
      newquestions[questionIndex].responseChoices = [
        { id: nanoid(), text: e.target.value + 2 },
        { text: uperLevel, id: nanoid() },
      ];
      return newquestions;
    });
    setLowerLevel(e.target.value);
    setTypingAt(questionIndex);
  };
  const setLinearUperLevel = (e, questionIndex) => {
    console.log("event", e.target.value);
    setQuestions((prevQuestion) => {
      const newquestions = [...prevQuestion];
      // newquestions[questionIndex].responseChoices =[e.target.value,lowerLevel];
      newquestions[questionIndex].responseChoices = [
        { id: nanoid(), text: e.target.value * 1 + 2 },
        { text: lowerLevel, id: nanoid() },
      ];

      return newquestions;
    });
    setUpperLevel(e.target.value);
    setTypingAt(questionIndex);
  };
  return (
    <div className={classes.container + " m-1 mx-5"}>
      <div className="d-flex justify-content-between mb-4 px-5 mx-lg-5 mx-md-1 mx-sm-1 ">
        <div> {selectedSurvey.name} > Questions</div>
        <div className="d-flex flex-end me-2">
          <div className="me-2">
            <button
              className="btn btn-dark"
              onClick={() =>
                navigate(`/surveys/${selectedSurvey.id}/user-register`)
              }
            >
              Preview
            </button>
          </div>
          {selectedSurvey.status * 1 === 0 ? (
            <div className="">
              <button className="btn btn-dark" onClick={publishSurveyQuestion}>
                Publish
              </button>
            </div>
          ) : (
            <div className="">
              <button className="btn btn-dark" onClick={publishSurveyQuestion}>
                Hide
              </button>
            </div>
          )}
        </div>
        <div className="">
          <button className="btn btn-warning" onClick={addQuestion}>
            Add Question
          </button>
        </div>
      </div>
      
        {showAlert && (
          <div className="">
          <Alert
             style={{ position: "fixed" ,top:10,width:'50%',float:"right" }}
            onClose={() => setShowAlert(false)}
            variant="filled"
            severity="success"
          >
            {/* ()=>setShowAlert(false) */}
            <p>Question Saved</p>
          </Alert>
          </div>
        )}
   
      <div className={classes.questionContainer + "mb-4 mx-lg-5 mx-md-0 mx-sm-1"}>
        {questions.map((question, index) => {
          return (
            <div
              key={index}
              className="mb-4 pb-4 border rounded-bottom rounded-right rounded-left rounded-top bg-light mx-5"
            >
              <Form className="m-2" key={index}>
                <div className="d-flex justify-content-end align-items-center mb-4 mx-5 ">
                  <div className="me-5">
                    <Form.Check
                      className=""
                      type="switch"
                      id={index}
                      key={index}
                      label="Required"
                      onClick={() => handleRequiredSwitch(question.id)}
                      checked={question.required}
                    />
                  </div>
                  <div>
                    <Form.Select
                      id={index}
                      key={index}
                      value={question.type}
                      onChange={(event) =>
                        handleQuestionType(event, question.id)
                      }
                    >
                      {questionTypes.map((type, index) => {
                        return (
                          <option key={index} value={type.key}>
                            {type.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </div>
                </div>
                <div className={classes.questionInput + " d-flex mx-5 my-3"}>
                  <Form.Control
                    className={classes.questionInput}
                    id={index}
                    value={question.text}
                    // type="textarea"
                    as="textarea"
                    onChange={(event) => handleQuestion(event, question.id)}
                    // onBlur={() => setTypingAt(null)}
                  ></Form.Control>
                  <span>{question.required && "*"}</span>
                </div>
                <div>
                  {question.type === "linear" ? (
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <TextField
                        className="mx-4"
                        id="outlined-select-currency"
                        select
                        value={lowerLevel}
                        onChange={(e) => setLinearLowerLevel(e, index)}
                        variant="standard"
                      >
                        <MenuItem key="0" value="0">
                          0
                        </MenuItem>
                        <MenuItem key="1" value="1">
                          1
                        </MenuItem>
                      </TextField>
                      <div className="mx-4">to</div>
                      <TextField
                        className="mx-4"
                        id="outlined-select-currency"
                        select
                        value={
                          question.responseChoices[0].text >
                          question.responseChoices[1].text
                            ? question.responseChoices[0].text
                            : question.responseChoices[1].text
                        }
                        onChange={(e) => setLinearUperLevel(e, index)}
                        variant="standard"
                      >
                        {
                          [...Array(9).keys()].map((i) => {
                            return (
                              <MenuItem key={i} value={i}>
                                {i * 1 + 2}
                              </MenuItem>
                            );
                          })
                          // Array(7).fill().map((_,i) => i*i)
                          // [...Array(7)].map((_,i) => i*i)
                        }
                      </TextField>
                    </div>
                  ) : question.type === "short" ? (
                    <Form.Label aria-label="Short Answer Text ">
                      <div className="ms-5">
                        Short Answer Question
                        &emsp;&emsp;&emsp;&emsp;................................................................................
                      </div>
                    </Form.Label>
                  ) : (
                    question.responseChoices.map((option, optionIndex) => {
                      return (
                        <div>
                          <div className="d-flex justify-content-start align-items-center mb-2 mx-5">
                            <div className="bg-light  me-2">
                              {question.type === "checkbox" && (
                                <CheckBoxOutlineBlankIcon
                                  fontSize="large"
                                  color="disabled"
                                />
                              )}

                              {question.type === "radio" && (
                                <RadioButtonUncheckedIcon
                                  fontSize="large"
                                  color="disabled"
                                />
                              )}
                            </div>

                            <div className="w-50">
                              <Form.Control
                                className="bg-light"
                                id={optionIndex}
                                key={option.id}
                                value={option.text}
                                type="text"
                                disabled={option.text === "other"}
                                onChange={(event) =>
                                  handleQuestionOption(
                                    event,
                                    index,
                                    optionIndex
                                  )
                                }
                              />
                            </div>

                            {question.responseChoices.length > 1 && (
                              <div>
                                <Button
                                  id={index}
                                  variant="link"
                                  onClick={(event) =>
                                    deleteOption(
                                      event,
                                      question.id,
                                      option.id,
                                      optionIndex
                                    )
                                  }
                                >
                                  <ClearOutlinedIcon />
                                </Button>
                              </div>
                            )}
              
                          </div>
                        </div>
                      );
                    })
                  )}

                  {question.type !== "short" &&
                    question.type !== "linear" &&
                    question.responseChoices.length < 10 && (
                      <div className="d-flex mx-5">
                        <Button
                          className="me-4 bg-white"
                          variant=""
                          key={index}
                          id={question.id}
                          onClick={(event) => addOption(question.id, "option")}
                        >
                          Add Option
                        </Button>
                        {question.responseChoices.every(
                          (opt) => opt.text !== "other"
                        ) && (
                          <Button
                            className="me-4 bg-white"
                            variant=""
                            key={index}
                            id={1 + question.id}
                            onClick={(event) => addOption(question.id, "other")}
                          >
                            Add Other
                          </Button>
                        )}
                      </div>
                    )}
                  <div className="d-flex justify-content-end me-4">
                    <Button
                      className="me-4 bg-white"
                      variant=""
                      onClick={() => deleteQuestion(index, question.id)}
                    >
                      Delete
                    </Button>

                    {index === typingAt &&
                      (!question.isSaved ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            saveQuestion(question.id, index);
                          }}
                        >
                          <span className="px-2 me-1">Save</span>
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => {
                            editQuestion(question.id, index);
                          }}
                        >
                          <span className="me-1">Save Changes</span>
                        </Button>
                      ))}
                  </div>
                </div>

              </Form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
