import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import questionResponses from "../../sample-data/SampleData";
// import { usersResponse } from "../../sample-data/SampleData";

// import classes from "./Individual.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { responseAction } from "../../store/slices/QuestionResponseSlice";
import apiClient from "../../url";
import { isLoadingAction } from "../../store/spinerSlice";

function RespondentAnswer() {
  const [current, setCurrent] = useState(0);
  const [usersResponse, setUsersResponse] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const surveyId=searchParams.get('surveyId')
  const {respId,userId}=useParams()

  useEffect(() => {
    fetchRespondentQuestions();
  }, []);
  const fetchRespondentQuestions = async () => {
    try {
      dispatch(isLoadingAction.setIsLoading(true));
       const response=await apiClient.get(`/api/encoders/${userId}/responses`)
      if (response.status === 200) {
        setUsersResponse(response.data);
        setUserResponse(response.data.find((da)=>da.id == respId)) 
        console.log('fetched Indi= ',response.data)

      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false));

    }
  };
  const componentRef = useRef();
  const navigate=useNavigate()
  const dispatch=useDispatch()
 
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


  if (usersResponse.length == 0) {
    return <div>no data</div>;
  }
  return (
    <div>
      <div ref={componentRef} className="mx-5">
      <div className="">
        <Button
          variant="none"
          className= "me-2 flex-start"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon color="dark" fontSize="large" />
        </Button>
      </div>
        <div className="d-flex justify-content-start mx-5">
          <div className="ms-5 px-5 align-self-start">
            <p>
              <u>Name : {userResponse.name}</u>
            </p>
            <p>
              <u>Phone Number : {userResponse.phoneNo}</u>
            </p> 
          </div>
          <div className="ms-5">
            <p>
              <u>Region : {userResponse.region}</u>
            </p>
            <p>
              <u>Zone : {userResponse.zone}</u>
            </p>
            <p>
              <u>Woreda : {userResponse.woreda}</u>
            </p>
            <p>
              <u>Kebele : {userResponse.kebele}</u>
            </p>
          </div>
        </div>

        {userResponse.questions.map((question, index) => {
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
                            checked={question.responses.some(
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
                             id={"linear" + userResponse.id + opt}

                            //  label={opt}
                            // disabled
                            // checked={opt === existResp}
                            checked={question.responses.some(
                              (ans) => ans.answer == opt
                            )}
                          />

                          <Form.Label
                          className="my-0 pb-0"
                            htmlFor={
                              "linear" + userResponse.id + opt
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

export default RespondentAnswer;
