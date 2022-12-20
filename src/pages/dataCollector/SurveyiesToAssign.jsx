import React, { useEffect, useState } from "react";
import { Button, FormCheck, Modal, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import { encoderAction } from "../../store/slices/EncoderSlice";
import { isLoadingAction } from "../../store/spinerSlice";
import apiClient from "../../url";
import classes from "./User.module.css";

const SurveyiesToAssign = (props) => {
  const isLoading = useSelector((state) => state.btn.isLoading);
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.survey.surveys);
  const [surveyId, setSurveyId] = useState();
  const [error, setError] = useState("");
  // const [selectedSurvey,setSelectedSurvey]=useState()
  // const [surveys,setSurveys]=useState([])

  useEffect(() => {
    // console.log('props survey',props.surveys)
  }, []);

  const handleSelected = (id) => {
    setSurveyId(id);
  };
  const assignHandler = async () => {
    if (!surveyId) {
      setError("Please Select Survey");
      return;
    }
    const data = { userId: props.userId.id, surveyId: surveyId };

    if (surveyId) {
      dispatch(buttonAction.setBtnSpiner(true));
      try {
        const response = await apiClient.put(
          `/api/encoders/assign-survey/${data.userId}`,
          data
        );
        if (response.status === 200) {
          dispatch(encoderAction.editEncoder(response.data));
          handleClose();
        }
      } catch (er) {
        console.log(er);
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
    console.log("submited data", data);
  };
  const handleClose = () => {
    setError("");
    setSurveyId("");
    props.onClose();
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="bg-light"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Survey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {surveys.length === 0 ? (
            <div style={{ float: "right" }} className="w-25 align-self-end">
              No User
            </div>
          ) : (
            <div className="mt-4 bg-light mx-2 px-4">
              <Table responsive="md">
                <thead className={classes.header}>
                  <tr className="mt-0">
                    <th>NO</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey, index) => {
                    return (
                      <tr key={index} className={classes.row}>
                        <td className="p-3">{survey.id}</td>
                        <td className="p-3">{survey.name}</td>
                        <td className="">
                          <FormCheck
                            type="radio"
                            name="survey"
                            onChange={() => handleSelected(survey.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}{" "}
          <div className="px-5">
            {" "}
            <span className="text-danger">{error}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="none">
            Cancel
          </Button>
          <Button
            onClick={() => assignHandler()}
            variant="warning"
            //   className={classes.btn}
          >
            <div className="d-flex align-items-center">
              <span>Assign Survey</span>
              <span className="ms-2">
                {isLoading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}
              </span>
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SurveyiesToAssign;
