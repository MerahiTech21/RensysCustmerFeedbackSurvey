import React from "react";
import { Button } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";
import PrintIcon from "@mui/icons-material/Print";
import CircleIcon from "@mui/icons-material/Circle";
import BarChart from "react-easy-bar-chart";
import HorizontalBarChart from "./BarChart";
import questionResponses from "../../sample-data/SampleData"

const colors = ["#E38627", "#C13C37", "#6A2135"];
function Summary() {
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
              <p className="fw-bold fs-6  text-capitalize ">{qResponse.question}</p>
            </div>
            <div className="ms-3">
              <h6>{qResponse.responses.length + " responses"}</h6>
            </div>
            {qResponse.questionType === "short" && (
              <div className="m-3">
                {qResponse.responses.map((response) => {
                  return <p className=" text-capitalize"> {response.response}</p>;
                })}
              </div>
            )}

            {qResponse.questionType === "check" && (
              <div className="m-3 rotate-90">

                  {qResponse.responses.map((response, index) => {
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

            {qResponse.questionType === "select" && (
              <div className="d-flex justify-content-evenly m-3">
                <PieChart
                  className="w-25"
                  data={qResponse.responses.map((response, index) => {
                    return {
                      title: response.response,
                      value: response.totalRespondent,
                      color: colors[index],
                    };
                  })}
                />
                <div>
                  <div className="m-3">
                    {qResponse.responses.map((response, index) => {
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
          </div>
        );
      })}
    </div>
  );
}

export default Summary;
