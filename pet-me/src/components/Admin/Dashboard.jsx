import { faCat, faFlag, faPalette, faShapes, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { h1 } from "fontawesome";
import { Card, Col, ListGroup, Row, Tab , Container} from "react-bootstrap";

const Dashboard = (props) => {

    

    return ( 
        
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
                            <ListGroup.Item action href="#users-page">
                            <FontAwesomeIcon icon={faUsers} className="pe-3" />{" "}
                             Users
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
                            <Tab.Pane eventKey="#reports-page">
                                <h3 className="p-2">All Reports: {props.reports}</h3>
                                <hr/>
                                {console.log(props.reportsList)}
                                <table className="table table-striped table-hover fs-6">
                                            <thead className="">
                                                <th>User</th>
                                                <th>Comment</th>
                                                <th>Report Content</th>
                                                
                                            </thead>
                                        
                                {props.reportsList.map(report =>{
                                    return(
                                        <tbody>
                                            <tr>
                                                <td>{report.user.username}</td>
                                                <td>{report.comment.content}</td>
                                                <td>{report.reason}</td>
                                                
                                            </tr>
                                           

                                        </tbody>
                                    );
                                })}
                                </table>
                            </Tab.Pane>
                            <Tab.Pane eventKey="#users-page">
                                <h3 className="p-2">All Users: {props.users}</h3>
                                <hr/>
                                {/* {console.log(props.usersList)} */}
                                <table className="table table-striped table-hover fs-6">
                                            <thead className="">
                                                <tr>
                                                <th>username</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                </tr>
                                                
                                            </thead>
                                        
                                {props.usersList.map(user =>{
                                    return(
                                        <tbody>
                                            <tr>
                                                <td>{user.username}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                           

                                        </tbody>
                                    );
                                })}
                                </table>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>

            </Tab.Container>
        
     );
}
 
export default Dashboard;