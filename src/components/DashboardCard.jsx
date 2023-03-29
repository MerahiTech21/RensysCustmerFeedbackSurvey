import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import { useEffect, useState } from "react";

function DashboardCard(props) {
  const navigate = useNavigate();
  const [survey,setSurvey]=useState({});

  useEffect(()=>{
      setSurvey(props.survey)

  })
  return (
    <div className="m-2">
      <div className=" border rounded bg-white mb-3">
        <div className="m-2 mx-5"> Survey Detail</div>
        <Row xs={12} md={12} className="g-2">
          {!survey ? (<div className="mx-5 flex-center" >No Active Survey Assigned To You</div>): (
              <Col >
                <Card className="m-3 p-3 bg-light">
                  {/* <Card.Header>{survey.name}</Card.Header> */}

                  <Card.Body>
                    <Card.Title>{survey.name+' Survey'}</Card.Title>
                    {/* <Card.Text>{survey.description.substring(0,100)} </Card.Text> */}
                    <Card.Text>{survey.description} </Card.Text>
         
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                    <TimeAgo timestamp={survey.createdAt} />
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            
          )
      }
          
        </Row>
      </div>
      
    
    </div>
  );
}

export default DashboardCard;
