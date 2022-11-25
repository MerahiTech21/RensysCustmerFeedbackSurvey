import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import questionResponses from "../../sample-data/SampleData";

function Questions() {
  const [current, setCurrent] = useState(0);

  const onQuestionChange = (e) => {
    setCurrent(e.target.value);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="w-50">
          <Form.Select
            onChange={onQuestionChange}
            value={current}
          >
            {questionResponses.map((questResp, index) => {
              return (
                <option key={index} value={index}>
                  {index + 1 + ". " + questResp.question}
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
              setCurrent(current*1 + 1);
            }}
            disabled={current >= questionResponses.length - 1}
          >
            <NavigateNextIcon />
          </Button>
        </div>
      </div>

      <div className="mb-3">
        {current * 1 + 1 + ". " + questionResponses[current].question}
      </div>
      {questionResponses[current].responses.map((response, index) => {
        return (
          <div className="border m-3 p-3 ps-4 rounded-top rounded-bottom rounded-right rounded-left">
            <p>Response {index + 1}</p>
            <p className="lh-lg">{response.response}</p>
            <p className="fs-6 fw-light">
              {(response.totalRespondent ? response.totalRespondent : 0) +
                " response"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Questions;
