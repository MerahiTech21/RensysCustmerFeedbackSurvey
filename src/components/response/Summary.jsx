import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";
import PrintIcon from "@mui/icons-material/Print";
import CircleIcon from "@mui/icons-material/Circle";
import BarChart from "react-easy-bar-chart";
import HorizontalBarChart from "./BarChart";
import initialQuestionResponses from "../../sample-data/SampleData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../url";
import SampleBarChart from "./SampleBarChart";
import VictorySampleChart from "./VictorySampleChart";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";
import { responseAction } from "../../store/slices/QuestionResponseSlice";
import { useReactToPrint } from "react-to-print";
// import classes from "./Question.module..css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const colors = [
  "#E38627",
  "#C13C37",
  "#6A2190",
  "#6A2161",
  "#6A2112",
  "#6A2158",
];
function Summary(props) {
  // const [questionResponses, setQuestionResponses] = useState([]);
  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  const questionResponses = useSelector((state) => state.response.responses);
  // const questionResponses = useSelector((state) => state.response.responses);

  var barGraphData = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const surveyId = props.surveyId;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (questionResponses.length == 0) {
    return <div></div>;
  }
  return (
    <div className="d-flex flex-column mx-5">
      <div className="d-flex justify-content-between mx-4 px-2">
        <div className="">
          <Button
            variant="none"
            className={"me-2 "}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon color="dark" fontSize="large" />
          </Button>
        </div>
        <div className="">
          <Button variant="color-light border" onClick={handlePrint}>
            <PrintIcon />
          </Button>
        </div>
      </div>
      <div ref={componentRef} className="mx-5">
        {questionResponses.length > 0 &&
          questionResponses
            .filter(
              (resp) =>
                Object.values(resp.responses).reduce(
                  (sum, res) => sum + res,
                  0
                ) > 0
            )
            .map((qResponse, index) => {
              return (
                <div
                  key={index}
                  className="mb-4 py-4 ps-4 border rounded bg-light"
                >
                  <div>
                    <p className=" fs-6">{qResponse.text}</p>
                  </div>

                  {
                    <div>
                      {qResponse.type === "short" && (
                        <div className="m-0">
                          {Object.keys(qResponse.responses).map(
                            (response, index) => {
                              return (
                                <p key={index} className=" ps-3">
                                  {" "}
                                  {response}
                                </p>
                              );
                            }
                          )}
                        </div>
                      )}

                      {qResponse.type === "checkbox" && (
                        <div className="m-0 px-0">
                          {Object.keys(qResponse.responses).map(
                            (response, index) => {
                              // console.log('response fro map',response)
                              return (
                                <HorizontalBarChart
                                  key={index}
                                  title={response}
                                  totalRespondent={
                                    qResponse.responses[response]
                                  }
                                  totalResponse={Object.values(
                                    qResponse.responses
                                  ).reduce(
                                    (sum, count) => sum * 1 + count * 1,
                                    0
                                  )}
                                />
                              );
                            }
                          )}
                        </div>
                      )}

                      {qResponse.type === "linear" && (
                        <div className="d-flex mx-0 px-0">
                          <VictoryChart
                            domainPadding={{ x: 10 }}
                            // theme={VictoryTheme.material}
                            padding={{
                              top: 10,
                              bottom: 50,
                              left: 70,
                              right: 50,
                            }}
                            width={300}
                            height={180}
                            // animate={{duration: 2}}
                          >
                            <VictoryAxis
                              label="Question Scales"
                              tickValues={Object.keys(qResponse.responses)}
                              padding={{
                                top: 10,
                                bottom: 50,
                                left: 70,
                                right: 50,
                              }}
                              style={{
                                axis: { stroke: "#756f6a" },
                                axisLabel: {
                                  fontSize: 7,
                                  padding: 25,
                                  fill: "black",
                                },
                                // grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
                                ticks: { stroke: "grey", size: 5 },
                                tickLabels: {
                                  fontSize: 7,
                                  fill: "black",
                                  font: "monospaced",
                                  padding: 5,
                                },
                              }}
                            />
                            <VictoryAxis
                              theme={VictoryTheme.material}
                              dependentAxis
                              label="Number of Responses"
                              style={{
                                axis: { stroke: "#756f6a" },
                                axisLabel: { fontSize: 7, padding: 40 },
                                // grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
                                ticks: { stroke: "grey", size: 5 },
                                tickLabels: {
                                  fontSize: 7,
                                  fill: "black",
                                  padding: 5,
                                },
                              }}
                              // tickFormat specifies how ticks should be displayed
                              tickValues={Object.values(qResponse.responses)}
                              tickFormat={(x) =>
                                `${Math.round(
                                  (x * 100) /
                                    Object.values(qResponse.responses).reduce(
                                      (sum, count) => sum * 1 + count * 1,
                                      0
                                    )
                                )}%(${x})`
                              }
                            />
                            <VictoryBar
                              data={Object.keys(qResponse.responses).map(
                                (response, index) => {
                                  return {
                                    response: response,
                                    responseCount:
                                      qResponse.responses[response],
                                  };
                                }
                              )}
                              style={{ data: { fill: "blue" } }}
                              x="response"
                              y="responseCount"
                            />
                          </VictoryChart>
                        </div>
                      )}

                      {qResponse.type === "radio" && (
                        <div className="d-flex justify-content-evenly ">
                          <PieChart
                            className="w-25"
                            data={Object.keys(qResponse.responses).map(
                              (response, index) => {
                                return {
                                  title: response,
                                  value: qResponse.responses[response],
                                  color: colors[index],
                                };
                              }
                            )}
                          />
                          <div>
                            <div className="m-3">
                              {Object.keys(qResponse.responses).map(
                                (response, index) => {
                                  // style={{backgroundColor:colors[index],marginLeft:'12em'}}
                                  return (
                                    <h6 key={index} className="">
                                      <span className="ms-3 p-3 rounded-top rounded-bottom rounded-left">
                                        <CircleIcon
                                          sx={{
                                            color: colors[index],

                                            backgroundColor: colors[index],
                                          }}
                                        />
                                      </span>
                                      {response}
                                    </h6>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                </div>
              );
            })}
      </div>
      
      <div className="mx-5 fw-bold mb-2">Un Answerd Questions</div>
      {  
              questionResponses
              .filter(
              (resp) =>
                Object.values(resp.responses).reduce(
                  (sum, res) => sum + res,
                  0
                ) == 0
            ).map((qResponse, index) => {
              return(<div className="mx-5">{qResponse.text}</div>)
            })
       }

    </div>
  );
}

export default Summary;
