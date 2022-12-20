import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import classes from "./User.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiClient from "../../url";
import { responseAction } from "../../store/slices/QuestionResponseSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { isLoadingAction } from "../../store/spinerSlice";

export default function RespondentList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questionResponses, setQuestionResponses] = useState([]);
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const surveyId = searchParams.get("surveyId");

  useEffect(() => {
    fetchRespondentQuestions();
  }, []);
  const fetchRespondentQuestions = async () => {
    try {
      dispatch(isLoadingAction.setIsLoading(true));
      const response = await apiClient.get(
        `/api/responses/individual/${surveyId}`
      );
      if (response.status === 200) {
        setQuestionResponses(response.data);
        dispatch(responseAction.setIndividualResponses(response.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false));
    }
  };

  return (
    <div className="mx-4 d-flex flex-column">
      <div className="d-flex justify-content-between mb-1">
        <div className="mx-5 px-s">
          <p className="fs-5 fw-bold"> Respondent List</p>
        </div>
      </div>
      <div className="">
        <Button
          variant="none"
          className="me-2 flex-start"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon color="dark" fontSize="large" />
        </Button>
      </div>
      {questionResponses.length === 0 ? (
        <div style={{ float: "right" }} className="w-25 align-self-end">
          No Respondent
        </div>
      ) : (
        <div className="mt-1 bg-light mx-2 px-4">
          <Table responsive="md">
            <thead className={classes.header}>
              <tr className="mt-0">
                <th>NO</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Region</th>
                <th>Woreda</th>
                <th>Kebele</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionResponses.map((user, index) => {
                return (
                  <tr key={index} className={classes.row}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.phoneNo}</td>
                    <td className="p-3">{user.region}</td>
                    <td className="p-3">{user.woreda}</td>
                    <td className="p-3">{user.kebele}</td>
                    <td className="onPrintDnone">
                      <Button
                        variant="warning"
                        className="rounded text-start ps-3"
                        onClick={() => {
                          navigate(
                            `/users/${userId}/responses/${user.id}?surveyId=${surveyId}`
                          );
                        }}
                      >
                        Responses
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
