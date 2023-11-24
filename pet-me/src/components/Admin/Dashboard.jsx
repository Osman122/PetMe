import {
  faCat,
  faCircleXmark,
  faEyeSlash,
  faFlag,
  faPalette,
  faShapes,
  faTrash,
  faUsers,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFile } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, ListGroup, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../api/config";

const Dashboard = (props) => {
  const { users, usersList , reports, getReports , reportsList , posts , pets } = props;
  const activeUsersList = usersList.filter((user) => user.is_active);
  const [inactive, setInActive] = useState(false)

  const deleteUser = (e, id) => {
    axiosInstance.delete(`/accounts/users/${id}/`).then(()=>{
      e.target.closest('tr').remove()
    }).catch(e => console.log(e))
  }

  const hidePost = (e, post) => {
    axiosInstance.post(`/posts/${post.id}/`).then(()=>{
      getReports()
    }).catch(e => console.log(e))
  }

  const deleteComment = (e, id) => {
    axiosInstance.delete(`/posts/comment/${id}/`).then(()=>{
      e.target.closest('tr').remove()
    }).catch(e => console.log(e))
  }

  const deleteReport = (e, id) => {
    axiosInstance.delete(`/posts/reports/${id}/`).then(()=>{
      e.target.closest('tr').remove()
    }).catch(e => console.log(e))
  }

  return (
    <Tab.Container defaultActiveKey="#dashboard" id="#dashboard">
      <Row>
        <Col sm={3} className="p-4 bg-white min-vh-100">
          <div>
            <i class="bi bi-binoculars-fill me-2 fs-4"></i>
            <span className="brand-name fs-4">Admin Panel</span>
          </div>
          <hr className="text-dark" />
          <ListGroup className="sidebar" >
            {/* <ListGroup.Item action href="#home">
              <i className="bi bi-house fs-4 me-3"></i>
              <span className="fs-5 ms-2">Home</span>
            </ListGroup.Item> */}
            <ListGroup.Item action href="#dashboard">
              <i className="bi bi-speedometer2 fs-4 me-3"></i>
              <span className="fs-5 ms-2">Dashboard</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#users-page">
              <i className="bi bi-people fs-4 me-3"></i>
              <span className="fs-5 ms-2">Users</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#reports-page">
              <i className="bi bi-clipboard-data fs-4 me-3"></i>
              <span className="fs-5 ms-2">Reports</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={9} className="mt-5 p-3">
          <Tab.Content className="px-3">
            <Tab.Pane eventKey="#dashboard">
              <div className="container-fluid pb-4">
                <div className="row g-3  my-2">
                  <div className="col-md-3 col-sm-6">
                    <div className="p-3 rounded-3  bg-light shadow-sm d-flex justify-content-around align-content-center">
                      <div>
                        <h3 className="fs-2">{users}</h3>
                        <p className="fs-5">Users</p>
                      </div>
                      <i className="bi bi-people p-3 fs-1"></i>
                    </div>
                  </div>

                  <div className="col-md-3 col-sm-6">
                    <div className="p-3 rounded-3 bg-light shadow-sm d-flex justify-content-around align-content-center">
                      <div>
                        <h3 className="fs-2">{pets}</h3>
                        <p className="fs-5">Pets</p>
                      </div>
                      <FontAwesomeIcon icon={faCat} className="p-3 fs-1" />
                      {/* <i className="bi bi-boxes p-3 fs-1"></i> */}
                    </div>
                  </div>

                  <div className="col-md-3 col-sm-6">
                    <div className="p-3 rounded-3 bg-light shadow-sm d-flex justify-content-around align-content-center">
                      <div>
                        <h3 className="fs-2">{posts}</h3>
                        <p className="fs-5">Posts</p>
                      </div>
                      <i className="bi bi-activity p-3 fs-1"></i>
                    </div>
                  </div>

                  <div className="col-md-3 col-sm-6">
                    <div className="p-3 rounded-3 bg-light shadow-sm d-flex justify-content-around align-content-center">
                      <div>
                        <h3 className="fs-2">{reports}</h3>
                        <p className="fs-5">Reports</p>
                      </div>
                      <i className="bi bi-flag p-3 fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
              <table className="table caption-top bg-white rounded-3 overflow-hidden" style={{textAlign:"center", verticalAlign: 'middle'}}>
                <caption className="text-dark fs-2 p-2">Active Users</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">See Profile</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {activeUsersList.map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.first_name}</td>
                        <td>{user.username}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                          <Link to={`/profile/${user.id}`}>
                            <FontAwesomeIcon icon={faUser} className="text-dark"/>
                          </Link>
                        </td>
                        <td >
                          <FontAwesomeIcon icon={faTrash}  style={{cursor:"pointer"}} className="text-danger" onClick={e => deleteUser(e,user.id)}/>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Tab.Pane>
            <Tab.Pane eventKey="#reports-page">
              <table className="table caption-top bg-white rounded-3 overflow-hidden"  style={{textAlign:"center", verticalAlign: 'middle'}}>
                <caption className="text-dark fs-2 p-2">
                  All Reports:
                </caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Reported Content</th>
                    <th scope="col">Report Reason</th>
                    <th scope="col">View Original Post</th>
                    <th scope="col">Take Action</th>
                    <th scope="col">Dismiss Report</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsList.map((report, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{report.user.username}</td>
                        <td>" {report.comment? report.comment.content: report.post.content} "</td>
                        <td>{report.reason}</td>
                        <td><Link to={`/posts/${report.post.id}`}>
                          <FontAwesomeIcon icon={faFile} />
                        </Link></td>
                        <td>
                          {report.comment?<>
                            <FontAwesomeIcon icon={faTrash} style={{cursor:"pointer"}} title="Delete comment" className="text-danger" onClick={e => {deleteComment(e, report.comment.id)}}/>
                            </>:report.post.visible?<>
                              <FontAwesomeIcon icon={faEyeSlash} style={{cursor:"pointer"}} title="Hide Post" className="text-muted" onClick={e => {hidePost(e, report.post)}}/>
                            </>:<>
                              <p className="text-muted m-0">Post hidden</p>
                            </>}

                        </td>
                        <td>
                          <FontAwesomeIcon icon={faCircleXmark} style={{cursor:"pointer"}} className="text-danger"  onClick={e => {deleteReport(e, report.id)}}/>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Tab.Pane>
            <Tab.Pane eventKey="#users-page">
              <table className="table caption-top bg-white rounded-3 overflow-hidden" style={{textAlign:"center", verticalAlign: 'middle'}}>

                <caption className="text-dark fs-2 p-2">
                    #All Users:
                  <div class="form-check form-switch d-inline-block ms-5 fs-5">
                    <input class="form-check-input" type="checkbox" role="switch" id="inactive" checked={inactive} onChange={e => setInActive(e.target.checked)}/>
                    <label class="form-check-label" for="inactive">Show only inactive users</label>
                  </div>
                </caption>

                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">See Profile</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.filter((user)=>{
                    return ((!inactive) || (!user.is_active))
                  }).map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                          <Link to={`/profile/${user.id}`}>
                            <FontAwesomeIcon icon={faUser} className="text-dark"/>
                          </Link>
                        </td>
                        <td >
                          <FontAwesomeIcon icon={faTrash} className="text-danger" onClick={e => deleteUser(e,user.id)}  style={{cursor:"pointer"}}/>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Dashboard;
