import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DashboardCard(props) {
  const navigate = useNavigate();
  const activeSurveies =props.surveys.filter((sur)=>sur.status !=0 )
  const closedSurveies =props.surveys.filter((sur)=>sur.status ==0 )
  return (
    <div className="m-2">
      <div className=" border rounded bg-white mb-3">
        <div className="m-2 mx-5">Active Surveys</div>
        <Row xs={1} md={3} className="g-2">
          {activeSurveies.length === 0 ? (<div className="mx-5 flex-center" >No Active Survey</div>): (
            activeSurveies.map((survey) => {
            return (
              <Col>
                <Card className="m-3 p-3 bg-light">
                  {/* <Card.Header>{survey.name}</Card.Header> */}

                  <Card.Body>
                    <Card.Title>{survey.name+' Survey'}</Card.Title>
                    {/* <Card.Text>{survey.description.substring(0,100)} </Card.Text> */}
                    <Card.Text>Total Questions 16 </Card.Text>
                    <Card.Text>Total Response 16 </Card.Text>
                    <Card.Text>Total Respondent 16 </Card.Text>
                    <Button onClick={()=>navigate('/surveys')} variant="dark">Detail</Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            );
            
          })
          )
      }
          
        </Row>
      </div>
      <div className=" border rounded bg-white">
        <div className="m-2 mx-5">Closed Surveys</div>
        <Row xs={1} md={3} className="g-2">
          {closedSurveies.slice(0,3).map((survey) => {
            return (
              <Col>
                <Card className="m-3 p-3 bg-light">
                  <Card.Header>{survey.name}</Card.Header>

                  <Card.Body>
                    <Card.Title>{survey.name}</Card.Title>
                    <Card.Text>{survey.description.substring(0,100)} </Card.Text>
                    <Button onClick={()=>navigate('/surveys')} variant="dark">Detail</Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Closed 3 mins ago
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    
    </div>
  );
}

export default DashboardCard;
