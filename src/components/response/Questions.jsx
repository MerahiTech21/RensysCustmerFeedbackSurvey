import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useDispatch, useSelector } from "react-redux";
import { responseAction } from "../../store/slices/QuestionResponseSlice";
import apiClient from "../../url";
// import questionResponses from "../../sample-data/SampleData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Questions(props) {
  const [current, setCurrent] = useState(0);
  const questionResponses = useSelector((state) => state.response.responses);
  // const [questionResponses, setQuestionResponses] = useState([]);
  const surveyId = props.surveyId;
  const dispatch = useDispatch();
  const navigate=useNavigate()
  console.log("ques usee", questionResponses);
  var selected = 0;
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

  const onQuestionChange = (e) => {
    setCurrent(e.target.value);
  };

  if (questionResponses.length === 0) {
    return <div>no data</div>;
  }
  return (
    <div className="mx-5">
      <div className="d-flex justify-content-between align-items-center mb-3 mx-4 ps-2 ">
      <div className="pe-0 me-0">
          <Button
            variant="none"
            className={"me-2 "}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon color="dark" fontSize="large" />
          </Button>
        </div>
        <div className="ms-0 ps-0 w-50">
          <Form.Select onChange={onQuestionChange} value={current}>
            {questionResponses.length > 0 &&
              questionResponses.map((questResp, index) => {
                return (
                  <option key={index} value={index}>
                    {index + 1 + ". " + questResp.text}
                  </option>
                );
              })}
          </Form.Select>
        </div>
        <div className="d-flex me-3">
          <Button
            variant="black"
            disabled={current < 1}
            onClick={() => {
              setCurrent(current - 1);
            }}
          >
            <NavigateBeforeIcon />
          </Button>

          <h6 className="m-1 p-1">{current * 1 + 1}</h6>
          <Button
            variant="black"
            onClick={() => {
              setCurrent(current * 1 + 1);
            }}
            disabled={current >= questionResponses.length - 1}
          >
            <NavigateNextIcon />
          </Button>
        </div>
      </div>

      <div className="mb-3 mx-5">
        {/* {current * 1 + 1 + ". " + questionResponses[current]?.text} */}
      </div>

      {questionResponses[current] &&
        questionResponses[current]?.type === "linear" && (
          <Form.Group className="mx-5">
            {/* <p>Response {index + 1}</p> */}
            {/* <p className="lh-lg">{response}</p> */}
            <p className="fs-6 fw-light">
              {(questionResponses.length > 0 &&
                Object.values(questionResponses[current].responses).reduce(
                  (sum, count) => sum + count,
                  0.0
                )) + " response"}
            </p>
            {Object.keys(questionResponses[current].responses)
              .filter((res) => questionResponses[current].responses[res] != 0)
              .map((existResp, index) => {
                return (
                  <div key={index} className="d-flex justify-content-between mx-0 my-sm-1 border m-3 p-3 ps-4 rounded ">
                    <p>Response {index + 1}</p>
                    {/* <p className="lh-lg">{response}</p> */}
                    <p className="fs-6 fw-light">
                      {(questionResponses.length > 0 &&
                        questionResponses[current].responses[existResp]) +
                        " response"}
                    </p>
                    {Object.keys(questionResponses[current].responses).map(
                      (opt) => {
                        return (
                          <div key={opt} className="my-2 mx-lg-1 mx-sm-2 mx-md-1 px-sm-2 px-md-1 mx-5">
                            <Form.Check
                              className=""
                              type="radio"
                              
                              id={"linear" + questionResponses[current].id + opt}
                              name={questionResponses[current].id}
                              value={opt}
                              // disabled
                              // readOnly={true}
                              defaultChecked={opt === existResp}
                            />
                            <Form.Label
                              htmlFor={"linear" + questionResponses[current].id + opt}
                            >
                              {opt}
                            </Form.Label>
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              })}
          </Form.Group>
        )}
      {questionResponses[current]?.type !== "linear" &&
        questionResponses.length > 0 &&
        questionResponses[current].responses != (null || undefined) &&
        Object.keys(questionResponses[current].responses).map(
          (response, index) => {
            return (
              <div key={index} className="border m-3 p-3 ps-4 rounded mx-5">
                <p>Response {index + 1}</p>
                <div className="d-flex">
                  {questionResponses[current].type != "short" && (
                    <span className="me-3">
                      <Form.Check
                        type={questionResponses[current].type}
                        defaultChecked={true}
                        // disabled={true}
                      />
                    </span>
                  )}
                  <span>{response}</span>{" "}
                </div>
                <p className="fs-6 fw-light">
                  {(questionResponses.length > 0 &&
                    questionResponses[current].responses[response]) +
                    " response"}
                </p>
              </div>
            );
          }
        )}
    </div>
  );
}

export default Questions;
