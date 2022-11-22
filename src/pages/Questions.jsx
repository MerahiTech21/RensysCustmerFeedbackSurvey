import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import classes from "./Questions.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// import SelectOption from "../components/SelectOption";
const questions = [
  {
    question:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
    questionType: "choice",
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

const questionTypes = ["Multiple Choice", "Check Box", "Short Answer"];
export default function Questions() {
  return (
    <div className={classes.container + " m-5"}>
      <div className="d-flex justify-content-between mb-4">
        <div>questions</div>
        <div className="">
          <button className="btn btn-warning">Add Question</button>
        </div>
      </div>
      <div className={classes.questionContainer + "mb-4"}>
        {questions.map((question, index) => {
          return (
            <Form key={index}>
              <div className="d-flex justify-content-end align-items-center mb-4 ">
                <div className="me-5">
                  <Form.Check
                    className=""
                    type="switch"
                    id="custom-switch"
                    label="Required"
                    checked={question.required}
                  />
                </div>
                <div>
                  <Form.Select>
                    {questionTypes.map((type, index) => {
                      return <option key={index}>{type}</option>;
                    })}
                  </Form.Select>
                </div>
              </div>
              <div className={classes.questionInput + " d-flex mb-4"}>
                <Form.Control
                  className={classes.questionInput}
                  value={question.question}
                  type="text"
                ></Form.Control>
              </div>
              <div>
                {question.options.map((option) => {
                  return (
                    <div>
                      <div className="d-flex align-items-center mb-2">
                        <div>
                          <RadioButtonUncheckedIcon />
                        </div>
                        <div>
                          <Form.Control
                            value={option.title}
                          ></Form.Control>
                        </div>
                        <div>
                          <Button variant="link">
                            <ClearOutlinedIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="d-flex">
                  <Button variant="">Add Option</Button>
                  <Button variant="">Add Other</Button>
                </div>

                <div className="d-flex justify-content-end">
                  <Button className="me-4" variant="">
                    Delete
                  </Button>
                  <Button variant="danger">Save ...</Button>
                </div>
              </div>

              <div></div>
            </Form>
          );
        })}
      </div>
    </div>
  );
}
