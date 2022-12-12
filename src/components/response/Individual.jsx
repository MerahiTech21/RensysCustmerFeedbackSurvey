import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import questionResponses from "../../sample-data/SampleData";
// import { usersResponse } from "../../sample-data/SampleData";

import classes from "./Individual.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { responseAction } from "../../store/slices/QuestionResponseSlice";

function Individual() {
  const [current, setCurrent] = useState(0);
  const usersResponse = useSelector(
    (state) => state.response.individualResponses
  );
  const componentRef = useRef();
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const deleteUserResponse=(current)=>{
    dispatch(responseAction.deleteUserResponse(current))
    setCurrent(0)

  }
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
  if (usersResponse.length == 0) {
    return <div>no data</div>;
  }
  return (
    <div>
      <div className="d-flex justify-content-evenly align-items-center mb-3 mx-5">
      <div className="pe-0  ">
          <Button
            variant="none"
            className={"me-2 "}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon color="dark" fontSize="large" />
          </Button>
        </div>
        <div className="w-25">
          <Form.Select
            className="bg-light"
            onChange={onQuestionChange}
            value={current}
          >
            {usersResponse.map((userResp, index) => {
              return (
                <option key={index} value={index}>
                  {index + 1 + ". " + userResp.name}
                </option>
              );
            })}
          </Form.Select>
        </div>
        <div className="d-flex me-5">
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
            disabled={current >= usersResponse.length - 1}
          >
            <NavigateNextIcon />
          </Button>
        </div>

        <div className="d-flex">
          <div className="align-self-end me-3">
            <Button
              variant="none"
              className={classes.printButton}
              onClick={handlePrint}
            >
              <PrintIcon /> Print
            </Button>
          </div>
          <div className="align-self-end">
            <Button variant="none" className={classes.deleteButton} onClick={()=>deleteUserResponse(current)} >
              <DeleteIcon /> Delete 
            </Button>
          </div>
        </div>
      </div>

      <div ref={componentRef} className="mx-5">
        <div className="d-flex justify-content-start mx-5">
          <div className="ms-5 px-5 align-self-start">
            <p>
              <u>Name : {usersResponse[current].name}</u>
            </p>
            <p>
              <u>Phone Number : {usersResponse[current].phoneNo}</u>
            </p>
          </div>
          <div className="ms-5">
            <p>
              <u>Region : {usersResponse[current].region}</u>
            </p>
            <p>
              <u>Zone : {usersResponse[current].zone}</u>
            </p>
            <p>
              <u>Woreda : {usersResponse[current].woreda}</u>
            </p>
            <p>
              <u>Kebele : {usersResponse[current].kebele}</u>
            </p>
          </div>
        </div>

        {usersResponse[current].questions.map((question, index) => {
          return (
            <div key={index}>
              <div className="mb-3 mx-5">{index * 1 + 1 + ". " + question.text}</div>
              <div className="border my-3 mx-5 p-3 ps-4 rounded">
                {question.type == "short" && (
                  <div>{question.response.answer}</div>
                )}

                {question.type !== "short" && question.type !== "linear" && (
                  <Form>
                    {question.responseChoices.map((opt, index) => {
                      return (
                        <div key={index}>
                          <Form.Check
                            type={question.type}
                            id={opt.id}
                            label={opt.text}
                            //  disabled
                            defaultChecked={question.responses.some(
                              (ans) => ans.answer === opt.text
                            )}
                          />
                        </div>
                      );
                    })}
                  </Form>
                )}
                {question.type == "linear" && (
                  <Form className="d-flex justify-content-between mx-0 my-sm-1  my-lg-1 py-1 ps-4 ">
                    {returnArray(question.responseChoices[0].text,question.responseChoices[1].text).map((opt, index) => {
                      return (
                         <div key={index} className="my-1 py-0 mx-lg-1 mx-sm-2 mx-md-1 px-sm-2 px-md-1 ">
                          <Form.Check
                            type="radio"
                            // id={opt.id}
                             id={"linear" + usersResponse[current].id + opt}

                            //  label={opt}
                            // disabled
                            // checked={opt === existResp}
                            defaultChecked={question.responses.some(
                              (ans) => ans.answer == opt
                            )}
                          />

                          <Form.Label
                          className="my-0 pb-0"
                            htmlFor={
                              "linear" + usersResponse[current].id + opt
                            }
                          >
                            {opt}
                          </Form.Label>
                        </div>
                      );
                    })}
                  </Form>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Individual;
