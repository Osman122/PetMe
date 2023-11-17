import { faCat, faFlag, faPalette, faShapes, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, ListGroup, Row, Tab } from "react-bootstrap";

const Dashboard = (props) => {

    

    return ( 
        <div className="dashboard">
            <Tab.Container defaultActiveKey="#dashboard" className="">
                <Row>
                    <Col sm={3}  className="m-5">
                        <ListGroup style={{
                            
                        }}>
                            <ListGroup.Item action href="#dashboard">
                            <FontAwesomeIcon icon={faPalette} className="pe-3" />{" "}
                             Dashboard
                            </ListGroup.Item>
                            <ListGroup.Item action href="#reports-page">
                            <FontAwesomeIcon icon={faFlag} className="pe-3" />{" "}
                             Reports
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                    <Col sm={8} className="mt-5 p-3 rounded-5 bg-light">
                        <Tab.Content>
                            <Tab.Pane eventKey="#dashboard">
                                <Row md={6}>
                                    
                                        <Card style={{
                                            border : '1px solid #3f708f',
                                            margin : '30px',
                                            height : '20vh',
                                            backgroundColor : '#eceae7'
                                        }}>
                                            <Card.Title className="pt-4 ">
                                            <FontAwesomeIcon 
                                            icon={faUsers}
                                            style={{
                                                color : '#8c594d',
                                                fontSize:'20',
                                                paddingRight : '25',
                                                paddingLeft : '25',
                                                
                                            }}  /> {" "}
                                                Users
                                                </Card.Title>
                                                <Card.Text 
                                                style={{
                                                    fontSize : '30px',
                                                    fontWeight : 'bold',
                                                    paddingTop : '20px',
                                                    paddingLeft : '65px',
                                                }}>
                                                    {props.users}
                                                </Card.Text>
                                            
                                        </Card>

                                        <Card style={{
                                            border : '1px solid #3f708f',
                                            margin : '30px',
                                            height : '20vh',
                                            backgroundColor : '#eceae7'
                                        }}>
                                            <Card.Title className="pt-4 ">
                                            <FontAwesomeIcon 
                                            icon={faCat}
                                            style={{
                                                color : '#8c594d',
                                                fontSize:'20',
                                                paddingRight : '25',
                                                paddingLeft : '25',
                                                
                                            }}  /> {" "}
                                                Pets
                                                </Card.Title>
                                                <Card.Text 
                                                style={{
                                                    fontSize : '30px',
                                                    fontWeight : 'bold',
                                                    paddingTop : '20px',
                                                    paddingLeft : '65px',
                                                }}>
                                                    {props.pets}
                                                </Card.Text>
                                            
                                        </Card>

                                        <Card style={{
                                            border : '1px solid #3f708f',
                                            margin : '30px',
                                            height : '20vh',
                                            backgroundColor : '#eceae7'
                                        }}>
                                            <Card.Title className="pt-4 ">
                                            <FontAwesomeIcon 
                                            icon={faShapes}
                                            style={{
                                                color : '#8c594d',
                                                fontSize:'20',
                                                paddingRight : '25',
                                                paddingLeft : '25',
                                                
                                            }}  /> {" "}
                                                Posts
                                                </Card.Title>
                                                <Card.Text 
                                                style={{
                                                    fontSize : '30px',
                                                    fontWeight : 'bold',
                                                    paddingTop : '20px',
                                                    paddingLeft : '65px',
                                                }}>
                                                    {props.posts}
                                                </Card.Text>
                                            
                                        </Card>

                                        <Card style={{
                                            border : '1px solid #3f708f',
                                            margin : '30px',
                                            height : '20vh',
                                            backgroundColor : '#eceae7'
                                        }}>
                                            <Card.Title className="pt-4 ">
                                            <FontAwesomeIcon 
                                            icon={faFlag}
                                            style={{
                                                color : '#8c594d',
                                                fontSize:'20',
                                                paddingRight : '25',
                                                paddingLeft : '25',
                                                
                                            }}  /> {" "}
                                                Reports
                                                </Card.Title>
                                                <Card.Text 
                                                style={{
                                                    fontSize : '30px',
                                                    fontWeight : 'bold',
                                                    paddingTop : '20px',
                                                    paddingLeft : '65px',
                                                }}>
                                                    {props.reports}
                                                </Card.Text>
                                            
                                        </Card>
                                        
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>

            </Tab.Container>
        </div>
     );
}
 
export default Dashboard;