import {
  faCat,
  faFlag,
  faPalette,
  faShapes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, ListGroup, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const { users, usersList , reports , reportsList , posts , pets } = props;
  console.log(usersList);
  const activeUsersList = usersList.filter((user) => user.is_active);

  return (
    <Tab.Container defaultActiveKey="#dashboard" id="tab-container">
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
                        <p className="fs-5">Categories</p>
                      </div>
                      <i className="bi bi-boxes p-3 fs-1"></i>
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
              <table className="table caption-top bg-white rounded-3 overflow-hidden">
                <caption className="text-white fs-3 p-2">#Active Users</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {activeUsersList.map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                          <i class="bi bi-trash text-danger fs-5"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Tab.Pane>
            <Tab.Pane eventKey="#reports-page">
              <table className="table caption-top bg-white rounded-3 overflow-hidden">
                <caption className="text-white fs-3 p-2">
                  #All Reports: {reports}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Report</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsList.map((report, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{report.user.username}</td>
                        <td>{report.comment.content}</td>
                        <td>{report.reason}</td>
                        <td>
                          <i class="bi bi-trash text-danger fs-5"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Tab.Pane>
            <Tab.Pane eventKey="#users-page">
              <table className="table caption-top bg-white rounded-3 overflow-hidden">
                <caption className="text-white fs-3 p-2">
                  #All Users: {users}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                          <i class="bi bi-trash text-danger fs-5"></i>
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
