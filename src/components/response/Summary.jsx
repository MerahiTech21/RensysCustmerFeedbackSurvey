import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";
import PrintIcon from "@mui/icons-material/Print";
import CircleIcon from "@mui/icons-material/Circle";
import BarChart from "react-easy-bar-chart";
import HorizontalBarChart from "./BarChart";
import initialQuestionResponses from "../../sample-data/SampleData"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../url";

const colors = ["#E38627", "#C13C37", "#6A2135"];
function Summary() {
  const [questionResponses, setQuestionResponses] = useState([]);
  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);

  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    try {
       const response=await apiClient.get(`/api/responses/${selectedSurvey.id}`)
      if (response.status === 200) {
        setQuestionResponses(response.data);
        console.log('fetched = ',response.data)
        // dispatch(questionAction.setQuestions(initialQuestions));
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="align-self-end">
        <Button variant="color-light">
          <PrintIcon />
        </Button>
      </div>

      {questionResponses.map((qResponse, index) => {
        return (
          <div
            key={index}
            className="mb-4 p-4 border rounded-bottom rounded-right rounded-left rounded-top bg-light"
          >
            <div>
              <p className="fw-bold fs-6  text-capitalize ">{qResponse.text}</p>
            </div>
            <div className="ms-3">
              <p>{qResponse.responses.length + " responses"}</p>
            </div>
            {qResponse.responses.length === 0 && (<di>No Answers For This Question Yet</di>)}
            {qResponse.responses.length !== 0 && ( <div>

            {qResponse.type === "short" && (
              <div className="m-3">
                {qResponse.responses.map((response) => {
                  return <p className=" text-capitalize"> {response.response}</p>;
                })}
              </div>
            )}

            {qResponse.type === "checkbox" && (
              <div className="m-3">

                  {qResponse.responseChoices.map((response, index) => {
                    return (
                      <HorizontalBarChart
                      title={response.response}
                      totalRespondent={ response.totalRespondent}
                      totalResponse={ qResponse.responses.length}
                      />
                    ); 
                  })} 
               
              </div>
            )}

            {qResponse.type === "radio" && (
              <div className="d-flex justify-content-evenly m-3">
                <PieChart
                  className="w-25"
                  data={qResponse.responseChoices.map((response, index) => {
                    return {
                      title: response.response,
                      value: response.totalRespondent,
                      color: colors[index],
                    };
                  })}
                />
                <div>
                  <div className="m-3">
                    {qResponse.responseChoices.map((response, index) => {
                      // style={{backgroundColor:colors[index],marginLeft:'12em'}}
                      return (
                        <h6 className="">
                          <span className="ms-3 p-3 rounded-top rounded-bottom rounded-left">
                            <CircleIcon
                              sx={{
                                color: colors[index],

                                backgroundColor: colors[index],
                              }}
                            />
                          </span>
                          {response.response}
                        </h6>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

           </div> )}
          </div>
        );
      })}
    </div>
  );
}

export default Summary;
