import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import classes from "./User.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../url";
import { isLoadingAction } from "../../store/spinerSlice";
import AddUser from "./AddUser";
import SurveyiesToAssign from "./SurveyiesToAssign";
import { surveyAction } from "../../store/slices/ServeySlice";
import { encoderAction } from "../../store/slices/EncoderSlice";

export default function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showSurveyList, setShowSurveyList] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Data Collector");
  const [user, setUser] = useState({});
  // const [users, setUsers] = useState([{id:1,surveyId:4,name:'Alemu Tebkew',phoneNumber:'0938232169',status:1}]);
  const surveys = useSelector((state) => state.survey.surveys);
  const users = useSelector((state) => state.encoder.encoders);

  useEffect(() => {
    fetchUsers();
    fetchSurveys();
  }, []);
  const fetchUsers = async () => {
    dispatch(isLoadingAction.setIsLoading(true));

    try {
      const response = await apiClient.get(`/api/encoders`);
      if (response.status === 200) {
        console.log(response.data);
        dispatch(encoderAction.setEncoders(response.data))
        // setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false));
    }
  };

  const fetchSurveys = async () => {
    dispatch(isLoadingAction.setIsLoading(true))

    try {
       const response=await apiClient.get(`/api/surveys`)
      if (response.status === 200) {
        console.log('surveys=',response.data)
        // setSurveys(response.data)
        dispatch(surveyAction.setSurveys(response.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoadingAction.setIsLoading(false))

    }
  };
  const showServeyiesList = (user) => {
    setUser(user)
    setShowSurveyList(true);

  };

  const addUserHandler = () => {
    setModalTitle("Add Data Collector");
    setShow(true);
  };

  const editUserHandler = (user) => {
    setModalTitle("Edit Data Collector");
    console.log("su1", user);
    setUser(user);
    setShow(true);
  };

  const deleteUserHandler = async (e, id) => {
    try {
      const response = await apiClient.delete(`/api/encoders/${id}`);
      if (response.status === 200) {
        dispatch(encoderAction.deleteEncoder(id))

      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const closeModalHandler = () => {
    setShow(false);
  };
  const closeSurveyModal = () => {
    setShowSurveyList(false);
  };

  return (
    <div className="mx-4 d-flex flex-column">
      <div className="d-flex justify-content-between mb-4">
        <div className="mx-5 px-s">
          <p className="fs-5 fw-bold"> User List</p>
        </div>
        <div className="">
          <button
            className="btn btn-warning text-white"
            onClick={addUserHandler}
          >
            Add New Data Collector
          </button>
        </div>
      </div>
      {users.length === 0 ? (
        <div style={{ float: "right" }} className="w-25 align-self-end">
          No User
        </div>
      ) : (
        <div className="mt-1 bg-light mx-2 px-4">
          <Table responsive="md">
            <thead className={classes.header}>
              <tr className="mt-0">
                <th>NO</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index} className={classes.row}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.phoneNo}</td>
                    <td className="p-3">{user.surveyId ? 'Assigned':'Not Assigned'}</td>
                    <td className="onPrintDnone">
                      <Dropdown>
                        <Dropdown.Toggle variant="none" id="dropdown-basic">
                          {/* <i className="fas fa-ellipsis-v "></i>  */}
                          <MoreVertOutlinedIcon />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={classes.dropdownBg}>
                          <Button
                            variant="none"
                            className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                            onClick={() => editUserHandler(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="none"
                            className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                            onClick={(e) => deleteUserHandler(e, user.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="none"
                            className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                            onClick={()=>showServeyiesList(user)}
                          >
                            Assign Survey
                          </Button>
                          <Button
                            variant="none"
                            className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                            onClick={() => {
                              navigate(`/users/${user.id}/responses?surveyId=${user.surveyId}`);
                            }}
                          >
                            Filled Responses
                          </Button>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      <AddUser
        show={show}
        title={modalTitle}
        onClose={closeModalHandler}
        user={user}
      />

      <SurveyiesToAssign
      show={showSurveyList}
      onClose={closeSurveyModal}
      surveys={surveys}
      userId={user}
      />
    </div>
  );
}
