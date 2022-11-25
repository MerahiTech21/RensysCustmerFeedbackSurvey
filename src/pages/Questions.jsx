import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";
import apiClient from "../url";
import classes from "./Questions.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { nanoid } from "@reduxjs/toolkit";
// import SelectOption from "../components/SelectOption";
const initialQuestions = [
  {
    id: 1,
    question:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
    questionType: "short",
    required: 1,
    isSaved: 1,
    options: [
      {
        id: 1,
        title: "Option 1",
      },
      {
        id: 2,
        title: "Option 2",
      },
    ],
  },
  {
    id: 4,
    question:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
    questionType: "short",
    required: 1,
    isSaved: 1,
    options: [
      {
        id: 1,
        title: "Option 1",
      },
      {
        id: 2,
        title: "Option 2",
      },
    ],
  },
  {
    id: 2,
    question:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
    questionType: "select",
    required: 1,
    isSaved: 1,
    options: [
      {
        id: 1,
        title: "Option 1",
      },
      {
        id: 2,
        title: "Option 2",
      },
    ],
  },
  {
    id: 3,
    question:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
    questionType: "check",
    required: 1,
    isSaved: 1,
    options: [
      {
        id: 1,
        title: "Option 1",
      },
      {
        id: 2,
        title: "Option 2",
      },
    ],
  },
];

const questionTypes = [
  {
    id: 1,
    key: "select",
    title: "Multiple Choice",
  },
  {
    id: 2,
    key: "short",
    title: "Short Answer",
  },
  {
    id: 3,
    key: "check",
    title: "Check Box",
  },
];
export default function Questions() {
  const [questions, setQuestions] = useState(initialQuestions);

  const handleQuestion = (event, questionId) => {
    const questionsToUpdate=[...questions]
    const questionIndex=questionsToUpdate.findIndex((quest)=>quest.id === questionId)
    questionsToUpdate[questionIndex].question=event.target.value
    setQuestions(questionsToUpdate)
 
  };

  const handleQuestionType = (event, questionId) => {
    setQuestions((prevQuestion) => {
      const newquestions = prevQuestion.map((pre) => {
        if (pre.id === questionId) {
          return {
            ...pre,
            questionType: event.target.value,
          };
        } else {
          return pre;
        }
      });

      return newquestions;
    });
  };

  const handleQuestionOption = (event, questionId, optionId) => {
    console.log("event", event.target.value);
    setQuestions((prevQuestion) => {
      const newquestions = [...prevQuestion];
      newquestions[questionId].options[optionId].title = event.target.value;

      // const newquestions = prevQuestion.map((pre) => {
      //   if (pre.id === questionId) {
      //     const options = pre.options.map((option) => {
      //       if (optionId === option.id) {
      //         return {
      //           ...option,
      //           title: event.target.value,
      //         };
      //       } else {
      //         return option;
      //       }
      //     });

      //     return {
      //       ...pre,
      //       options: options,
      //     };
      //   } else {
      //     return pre;
      //   }
      // });

      return newquestions;
    });
  };
  const handleRequiredSwitch = (questionId) => {
    const questionsToUpdate = [...questions];
    const questionIndex = questionsToUpdate.findIndex(
      (quest) => quest.id === questionId
    );
    questionsToUpdate[questionIndex].required =
      !questionsToUpdate[questionIndex].required;
    setQuestions(questionsToUpdate);
  };
  const addQuestion = () => { 
    const oldQuestions=[...questions]
    const defautlQuestion=  {
      id: nanoid(),
      question: " Enter Your Question Here",
      questionType: "select",
      required: 0,
      isSaved: 0,
      options: [
        {
          id: nanoid(),
          title: "Option 1",
        },
      ],
    }
    oldQuestions.unshift(defautlQuestion)
    setQuestions(oldQuestions)
   
     
  
  };
  const deleteQuestion = (index, questionId) => {
    let qns = [...questions];
    if (questions.length >= 1) {
      const deletedIndex = qns.findIndex(
        (question) => question.id === questionId
      );
      qns.splice(deletedIndex, 1);
    }
    setQuestions(qns);
  };

  const saveQuestion = async (questionId, index) => {
    const questionsToSave = [...questions];
    const questionIndex = questionsToSave.findIndex(
      (quest) => quest.id === questionId
    );
    const question = questionsToSave[questionIndex];
    try {
      const response = await apiClient.post("/questions", question);
    } catch (error) {}
  };
  const addOption = (questionId, flag) => {
    const newquestions = [...questions];

    const findIndex = newquestions.findIndex((q) => q.id === questionId);
    const len = newquestions[findIndex].options.length;
    const oldOptions = newquestions[findIndex].options;
    const otherIndex = oldOptions.findIndex((oldOp) => oldOp.title === "other");
    const isthere = oldOptions.some((oldOp) => oldOp.title === "other");

    // if(otherIndex){
    //  const [other]= oldOptions.splice(otherIndex,1)
    //  const neww=oldOptions.splice(otherIndex,0,{
    //   id: nanoid(),
    //   title:  "Option " + (len + 1),
    // })

    if (len <= 10) {
    
      // newquestions[findIndex].options = [
      //   ... newquestions[findIndex].options,
      //   defaultOption
      // ];
      if (isthere) {
        if (flag !== "other") {
          const defaultOption = {
            id: nanoid(),
            title: "Option " + (len +1),
          };
          const other = { ...newquestions[findIndex].options[otherIndex] };
          newquestions[findIndex].options[otherIndex] = defaultOption;
          newquestions[findIndex].options.push(other);
        }
      } else {
        const defaultOption = {
          id: nanoid(),
          title: flag === "other" ? "other" : "Option " + (len + 1),
        };
        newquestions[findIndex].options.push(defaultOption);
      }
    }

    setQuestions(newquestions);
  };

  const deleteOption = (event, questionId, optionId, index) => {
    let qns = [...questions];

    const questionIndex = qns.findIndex(
      (question) => question.id === questionId
    );
    const options = qns[questionIndex].options;
    const deletedIndex = options.findIndex((op) => op.id === optionId);
    options.splice(deletedIndex, 1);

    setQuestions(qns);
  };
  return (
    <div className={classes.container + " m-1"}>
      <div className="d-flex justify-content-between mb-4">
        <div>questions</div>
        <div className="">
          <button className="btn btn-warning" onClick={addQuestion}>
            Add Question
          </button>
        </div>
      </div>
      <div className={classes.questionContainer + "mb-4"}>
        {questions.map((question, index) => {
          return (
            <div
              key={index}
              className="mb-4 pb-4 border rounded-bottom rounded-right rounded-left rounded-top bg-light"
            >
              <Form className="m-2" key={index}>
                <div className="d-flex justify-content-end align-items-center mb-4 ">
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
                      value={question.questionType}
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
                <div className={classes.questionInput + " d-flex mb-4"}>
                  <Form.Control
                    className={classes.questionInput}
                    id={index}
                    value={question.question}
                    // type="textarea"
                    as="textarea"
                    onChange={(event) => handleQuestion(event, question.id)}
                  ></Form.Control>
                </div>
                <div>
                  {question.questionType === "short" ? (
                    <Form.Label aria-label="Short Answer Text ">
                      <div>Short</div>
                    </Form.Label>
                  ) : (
                    question.options.map((option, optionIndex) => {
                      return (
                        <div>
                          <div className="d-flex justify-content-start align-items-center mb-2 ms-4">
                            <div className="bg-light  me-2">
                              {question.questionType === "check" && (
                                <CheckBoxOutlineBlankIcon
                                  fontSize="large"
                                  color="disabled"
                                />
                              )}

                              {question.questionType === "select" && (
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
                                value={option.title}
                                type="text"
                                disabled={option.title === "other"}
                                onChange={(event) =>
                                  handleQuestionOption(
                                    event,
                                    index,
                                    optionIndex
                                  )
                                }
                              />
                            </div>

                            {question.options.length > 1 && (
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

                  {question.questionType !== "short" &&
                    question.options.length < 10 && (
                      <div className="d-flex">
                        <Button
                          className="me-4 bg-white"
                          variant=""
                          key={index}
                          id={question.id}
                          onClick={(event) => addOption(question.id, "option")}
                        >
                          Add Option
                        </Button>
                        {question.options.every(
                          (opt) => opt.title !== "other"
                        ) && (
                          <Button
                            className="me-4 bg-white"
                            variant=""
                            key={question.id}
                            id={question.id}
                            onClick={(event) => addOption(question.id, "other")}
                          >
                            Add Other
                          </Button>
                        )}
                      </div>
                    )}
                  <div className="d-flex justify-content-end">
                    <Button
                      className="me-4 bg-white"
                      variant=""
                      onClick={() => deleteQuestion(index, question.id)}
                    >
                      Delete
                    </Button>
                    <Button variant="danger">Save ...</Button>
                  </div>
                </div>

                <div></div>
              </Form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
