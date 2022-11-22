import React from "react";
import { Dropdown, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import classes from "./Survey.module.css";
import { useNavigate } from "react-router-dom";
export default function SurveyList() {
    const navigate=useNavigate()
    
  return (
    <div className="mt-4">
      <Table responsive="md">
        <thead className={classes.header}>
          <tr>
            <th>NO</th>
            <th>Name</th>
            <th>Opening Date</th>
            <th>Closing Date</th>
            <th>Status</th>
            <th>Description</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.row}>
            <td className="p-3">1</td>
            <td className="p-3">Customer Fedddb</td>
            <td className="p-3">12/12/12</td>
            <td className="p-3">12/12/2012</td>
            <td className="p-3">Active</td>
            <td className="p-3">No Description</td>
            <td className="onPrintDnone">
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  {/* <i className="fas fa-ellipsis-v "></i>  */}
                  <MoreVertOutlinedIcon/>
                </Dropdown.Toggle>

                <Dropdown.Menu className={classes.dropdownBg}>
                  <Button
                    variant="none"
                    className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                    onClick={()=>navigate('/questions')}
                  >
                    Questions
                  </Button>
                  <Button
                    variant="none"
                    className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                  >
                    Responses
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
          <tr className={classes.row}>
            <td className="p-3">1</td>
            <td className="p-3">Customer Fedddb</td>
            <td className="p-3">12/12/12</td>
            <td className="p-3">12/12/2012</td>
            <td className="p-3">Active</td>
            <td className="p-3">No Description</td>
            <td className="onPrintDnone">
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  <i className="fas fa-ellipsis-v "></i> 
                </Dropdown.Toggle>

                <Dropdown.Menu className={classes.dropdownBg}>
                  <Button
                    variant="none"
                    className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                  >
                    Questions
                  </Button>
                  <Button
                    variant="none"
                    className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                  >
                    Responses
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
          <tr className={classes.row}>
            <td className="p-3">1</td>
            <td className="p-3">Customer Fedddb</td>
            <td className="p-3">12/12/12</td>
            <td className="p-3">12/12/2012</td>
            <td className="p-3">Active</td>
            <td className="p-3">No Description</td>
            <td className="onPrintDnone">
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  <i className="fas fa-ellipsis-v "></i> 
                </Dropdown.Toggle>

                <Dropdown.Menu className={classes.dropdownBg}>
                  <Button
                    variant="none"
                    className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                  >
                    Questions
                  </Button>
                  <Button
                    variant="none"
                    className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                  >
                    Responses
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
