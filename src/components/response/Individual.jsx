import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import questionResponses from "../../sample-data/SampleData";
import { usersResponse } from "../../sample-data/SampleData";

import classes from "./Individual.module.css";
function Individual() {
  const [current, setCurrent] = useState(0);

  const onQuestionChange = (e) => {
    setCurrent(e.target.value);
  };
  return (
    <div>
      <div className="d-flex justify-content-evenly align-items-center mb-3">
        <div className="w-50">
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
            <Button variant="none" className={classes.printButton}>
              <PrintIcon /> Print
            </Button>
          </div>
          <div className="align-self-end">
            <Button variant="none" className={classes.deleteButton}>
              <DeleteIcon /> Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-start">
        <div className="ms-5 px-5 align-self-start">
          <p>
            <u>Name : {usersResponse[current].name}</u>
          </p>
          <p>
            <u>Phone Number : {usersResponse[current].phoneNumber}</u>
          </p>
        </div>
        <div className="ms-5">
          <p>
            <u>Region : {usersResponse[current].address.region}</u>
          </p>
          <p>
            <u>Zone : {usersResponse[current].address.zone}</u>
          </p>
          <p>
            <u>Woreda : {usersResponse[current].address.woreda}</u>
          </p>
          <p>
            <u>Kebele : {usersResponse[current].address.kebele}</u>
          </p>
        </div>
      </div>

      {usersResponse[current].questions.map((question, index) => {
        return (
          <div>
            <div className="mb-3">{current * 1 + 1 + ". " + question.question}</div>
            <div className="border m-3 p-3 ps-4 rounded-top rounded-bottom rounded-right rounded-left">
              <Form>
              {question.options.map((opt,index)=>{
                return (
                  <div key={index}>
                    <Form.Check
                    
                     type={question.questionType} 
                     id={opt.id} 
                     label={opt.title} 
                    //  disabled
                     checked={question.answer.some((ans)=> ans === opt.title)}/>
                  </div>
                )
              })}
              </Form>
            </div>  
          </div>
        );
      })}
    </div>
  );
}

export default Individual;
