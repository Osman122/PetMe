import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./profile.css";

function Profile() {
  return (
    <div className="container main">
      <div className="container light-style flex-grow-1 container-p-y p-3 mb-3">
        <h4 className="font-weight-bold py-3 mb-4">Profile settings</h4>
        <div classNameName="bg-light p-5 rounded-3 border border-secondary">
          <Tab.Container defaultActiveKey="#account-general">
            <Row>
              <Col sm={4}>
                <ListGroup id="account-settings-links">
                  <ListGroup.Item action href="#account-general">
                    General
                  </ListGroup.Item>
                  <ListGroup.Item action href="#account-change-password">
                    Change Password
                  </ListGroup.Item>
                  <ListGroup.Item action href="#account-info">
                    Information
                  </ListGroup.Item>
                  <ListGroup.Item action href="#account-social-links">
                    Social
                  </ListGroup.Item>
                  <ListGroup.Item action href="#account-notifications">
                    Notifications
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content style={{height:'520px'}} className="rounded p-3">
                  <Tab.Pane eventKey="#account-general">
                    <img
                      src="https://www.svgrepo.com/show/5125/avatar.svg"
                      className="d-block avatar-icon"
                    />
                    <div className="media-body ml-4">
                      <label
                        className="btn"
                        style={{ color: "#fff", backgroundColor: "#8c594d" }}
                      >
                        Upload new photo
                        <input
                          type="file"
                          className="account-settings-fileinput"
                        />
                      </label>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-outline-secondary md-btn-flat"
                      >
                        Reset
                      </button>
                      <div className="text-light small mt-1">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </div>
                    </div>
                    <div className="card-body media align-items-center"></div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <div className="row p-2">
                      <div className="form-group col">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control mb-1 w-75"
                          value="Mohamed"
                        />
                      </div>
                      <div className="form-group col">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control mb-1 w-75"
                          value="Ahmed"
                        />
                      </div>
                      </div>
                      <div className="form-group p-2">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control w-75"
                          value="@mohamed"
                        />
                      </div>
                      <div className="form-group p-2">
                        <label className="form-label">E-mail</label>
                        <input
                          type="email"
                          className="form-control mb-1 w-75"
                          value="mohamed@mail.com"
                        />
                        <div className="alert alert-warning mt-3 w-75" >
                          Your email is not confirmed. Please check your inbox.
                          <br />
                          <a href="javascript:void(0)">Resend confirmation</a>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#account-change-password">
                    <div className="card-body pb-2">
                      <div className="form-group p-2 w-75">
                        <label className="form-label">Current password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group p-2 w-75">
                        <label className="form-label">New password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group p-2 w-75">
                        <label className="form-label">Repeat new password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#account-info">
                    <div className="card-body pb-2">
                      <div className="form-group p-2 w-75">
                        <label className="form-label">Bio</label>
                        <textarea className="form-control" rows="5">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Mauris nunc arcu, dignissim sit amet sollicitudin
                          iaculis, vehicula id urna. Sed luctus urna nunc.
                        </textarea>
                      </div>
                      <div className="form-group p-2 w-75">
                        <label className="form-label">Birthday</label>
                        <input
                          type="date"
                          className="form-control"
                          
                        />
                      </div>
                      <div className="form-group d-flex p-2">
                        <label className="form-label m-2">Country</label>
                        <select className="form-control w-50">
                          <option selected>Egypt</option>
                          <option>USA</option>
                          <option>UK</option>
                          <option>Germany</option>
                          <option>France</option>
                        </select>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
                      <div className="form-group p-2 w-75">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value="+0 (123) 456 7891"
                        />
                      </div>
                      </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#account-social-links">
                    <div className="card-body pb-2">
                      <div className="form-group row">
                        <label className="form-label col-2 m-2">Twitter</label>
                        <input
                          type="text"
                          className="form-control col"
                          value="https://twitter.com/user"
                        />
                      </div>
                      <div className="form-group row pt-3">
                        <label className="form-label col-2 m-2">Facebook</label>
                        <input
                          type="text"
                          className="form-control col"
                          value="https://facebook.com/user"
                        />
                      </div>
                      <div className="form-group row pt-3">
                        <label className="form-label col-2 m-2">Google</label>
                        <input
                          type="text"
                          className="form-control col"
                          value="https://google.com/user"
                        />
                      </div>
                      <div className="form-group row pt-3">
                        <label className="form-label col-2 m-2">LinkedIn</label>
                        <input
                          type="text"
                          className="form-control col"
                          value="https://linkin.com/user"
                        />
                      </div>
                      <div className="form-group row pt-3">
                        <label className="form-label col-2 m-2">Instgram</label>
                        <input
                          type="text"
                          className="form-control col"
                          value="https://instgram.com/user"
                        />
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#account-notifications">
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Activity</h6>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            checked
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">
                            Email me when someone comments on my article
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            checked
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">
                            Email me when someone answers on my forum thread
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">
                            Email me when someone follows me
                          </span>
                        </label>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Application</h6>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            checked
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">
                            News and announcements
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">
                            Weekly product updates
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            checked
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                          <span className="switcher-label">
                            Weekly blog digest
                          </span>
                        </label>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        <div className="text-end m-3">
          <button
            type="button"
            className="btn"
            style={{ color: "#fff", backgroundColor: "#8c594d" }}
          >
            Save changes
          </button>
          &nbsp;
          <button type="button" className="btn btn-default">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
