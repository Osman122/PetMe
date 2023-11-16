import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./profile.css";

import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../api/config';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [editedUserData, setEditedUserData] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handlePictureChange = (e) => {
    // Handle the new picture selection
    const file = e.target.files[0];
    setNewProfilePicture(file);
  };

  const handleUpload = () => {
    // Handle the upload of the new profile picture
    // You can use the 'newProfilePicture' state to upload the new picture to the server
  };

  useEffect(() => {
    // Fetch user data from the API and set it as the initial editedUserData
    setEditedUserData(currentUser);
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, name: value });
  };

  const handleSaveChanges = () => {
    axiosInstance.patch(`/accounts/users/me/`, editedUserData)
      .then((response) => {
        console.log('User data updated:', response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Request failed with status code:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something else happened in making the request
          console.error('Error:', error.message);
        }
      });
  };
  
  
    
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
                  
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content style={{height:'520px'}} className="rounded p-3">
                  <Tab.Pane eventKey="#account-general">
                  <form encType="multipart/form-data">
                  <div>
                    
                    <img src={currentUser.picture} className="d-block avatar-icon" />
                    <div className="media-body ml-4">
                    <label htmlFor="profile-picture" className="btn btn-outline-secondary md-btn-flat">
                      Upload new photo
                      <input
                        id="profile-picture"
                        type="file"
                        className="account-settings-fileinput"
                        onChange={handlePictureChange}
                      />
                    </label>
                    &nbsp;
                    <button type="button" className="btn btn-outline-secondary md-btn-flat" onClick={handleUpload}>
                      Upload
                    </button>
                      <div className="text-light small mt-1">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </div>
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
                          value={editedUserData.first_name || ''}
                          onChange={(e) => setEditedUserData({ ...editedUserData, first_name: e.target.value })}
                        />

                      </div>
                      <div className="form-group col">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control mb-1 w-75"
                          value={editedUserData.last_name || ''}
                          onChange={(e) => setEditedUserData({ ...editedUserData, last_name: e.target.value })}
                        />
                      </div>
                      </div>
                      <div className="form-group p-2">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control w-75"
                          value={editedUserData.username || ''}
                          onChange={(e) => setEditedUserData({ ...editedUserData, username: e.target.value })}
                        />
                      </div>
                      <div className="form-group p-2 w-75">
                        <label className="form-label">Birthday</label>
                        <input
                          type="date"
                          className="form-control"
                          value={editedUserData.birthdate || ''}
                          onChange={(e) => setEditedUserData({ ...editedUserData, birthdate: e.target.value })}
                        />
                      </div>
                      <div className="form-group p-2 w-75">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editedUserData.phone || ''}
                          onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })}
                        />
                      </div>
                      <div className="form-group p-2">
                        <label className="form-label">Gender</label>
                        <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="male"
                            checked={editedUserData.gender === "Male"}
                            onChange={(e) => setEditedUserData({ ...editedUserData, gender: "Male" })}
                          />
                          <label className="form-check-label">Male</label>
                        </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              value="female"
                              checked={editedUserData.gender === "Female"}
                              onChange={(e) => setEditedUserData({ ...editedUserData, gender: "Female" })}
                            />
                            <label className="form-check-label">Female</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              value="other"
                              checked={editedUserData.gender === "other"}
                              onChange={(e) => setEditedUserData({ ...editedUserData, gender: "other" })}
                            />
                            <label className="form-check-label">Other</label>
                          </div>
                        </div>
                      </div>


                    
                    </div>
                    </form>
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
            onClick={handleSaveChanges}
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
