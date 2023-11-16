import "./profile.css";

import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../api/config';
import React, { useState, useEffect } from 'react';

import {Alert, Form} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import {clearCurrUser, setCurrUser} from '../../../store/Slices/UserSlice'
import { useDispatch } from "react-redux";

const EditProfile = () => {
  const { synced, currentUser } = useSelector(state => state.currentUser);
  const [editedUserData, setEditedUserData] = useState(false);
  const [fail, setFail] = useState(false)
  const navigate = useNavigate();
  const [ formErrors , setFormErrors ] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    // Convert date
    let birthdate
    try {
      birthdate = new Date(currentUser.birthdate).toISOString().substr(0, 10)
    } catch {
      birthdate = ""
    }
    setEditedUserData({...currentUser, 'date_joined':new Date(currentUser.date_joined),'birthdate': birthdate});
    if (editedUserData && !synced){
      navigate('/')
    }
  }, []);


  const handleChange = (event) => {
      let val = event.target.value
      let name = event.target.name
      let formErrors_ = {...formErrors}
      console.log(val)
      

      switch (name){
          case "first_name":
          case "last_name":
              if (/^[a-z]{3,}$/i.test(val)){
                  delete formErrors_[name]
              } else {                   
                  formErrors_[name] = "Please enter valid names"
              }
              break;

          case "phone":
              if (/^01[0125]{1}[0-9]{8}$/i.test(val)){
                  delete formErrors_["phone"]
              } else {                   
                  formErrors_["phone"] = "Phone must be in Egyptian format"
              }
              break;
          case "birthdate":
              let today = new Date()
              val = new Date(val)
              if (today <= val){
                formErrors_["birthdate"] = "Birthdate can not be greater than today"
              } else {
                delete formErrors_["birthdate"]
              }
              val = val.toISOString().substr(0, 10);
              break;
          default:
              break;
          
      }

      setFormErrors(formErrors_)
      setEditedUserData({...editedUserData, [name] : val})

  }

  function onSubmit (e) {
    e.preventDefault()
    setFail("load")
    const formData = new FormData(e.target)

    if (formData.get("picture").name === ""){
      formData.delete("picture")
    }

    axiosInstance.patch(`/accounts/users/me/`, formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }})
      .then((response) => {
        let alert = document.getElementById('success')
        alert.lastChild.innerText = "Changes Saved!"
        alert.hidden = false
        setTimeout(()=>{
            document.getElementById('success').hidden = true
        },3000)
        setFail(false)
        dispatch(setCurrUser(response.data))


    }).catch(e => {
        console.log(e)
        let alert = document.getElementById('fail')
        alert.lastChild.innerText = "Something went wrong!."
        alert.hidden = false
        setTimeout(()=>{
            document.getElementById('fail').hidden = true
        },3000)
        setFail(false)


    })
  };
    
  return editedUserData ? <>
      <div className="container light-style flex-grow-1 container-p-y p-3 mb-3">
        <h2 className="fw-bold pt-3 mb-2">Profile settings</h2>
        <hr style={{border:"2px solid #DDDDDD"}}/>
            <form onSubmit={e => onSubmit(e)}
            noValidate enctype="multipart/form-data" className='mt-3 position-relative user-form'>

                {fail && fail!=="load" && (
                    <Alert key='danger' variant='danger'>
                        {fail}
                    </Alert>
                )}

              <div className="row">
                <div className="media-body ml-4 col-lg-4 d-flex flex-column align-items-center">
                    <label htmlFor="profile-picture" className="position-relative btn btn-outline-light rounded-circle p-0 m-0" style={{width:"200px", height:"200px"}}>
                        <img src={currentUser.picture} alt="avatar" id="profile" className="w-100 h-100 rounded-circle" />
                    </label>
                    <div className="position-relative w-75 mt-3" style={{overflowX:'hidden',height: '35px'}}>
                      <input id="profile-picture" type="file" accept="image/*" name="picture" style={{left: '-135px', visibility:'hidden'}}
                            className="account-settings-fileinput position-absolute" onChange={e => {e.target.style.visibility = "visible"}}/>
                    </div>
                    <p className="mt-1 text-center">
                      Allowed JPG, GIF or PNG. Max size of 2MB
                    </p>
                </div>
                <div className="col-lg-7 offset-lg-1 d-flex flex-column pe-5 pt-4">
                  <div>
                    <p className="text-muted">Username</p>
                    <h5>{editedUserData.username || ''}</h5>
                  </div>

                  <div className="my-3">
                    <p className="text-muted">Email</p>
                    <h5>{editedUserData.email || ''}</h5>
                  </div>

                  <div>
                    <p className="text-muted">Date Joined</p>
                    <h5>{editedUserData.date_joined.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</h5>
                  </div>

                </div>
              </div>

              <hr style={{border:"2px solid #DDDDDD"}}/>

              <div className="row p-2 px-4">
                  <Form.Group className="col-lg-6">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" onChange={e => handleChange(e)} name="first_name" id="first_name" value={editedUserData.first_name} />
                      {formErrors['first_name']?<div className="form-text text-danger">{formErrors['first_name']}</div>:<></>}
                  </Form.Group>
                  <Form.Group className="col-lg-6">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" onChange={e => handleChange(e)} name="last_name" id="last_name" value={editedUserData.last_name} />
                      {formErrors['last_name']?<div className="form-text text-danger">{formErrors['last_name']}</div>:<></>}
                  </Form.Group>
              </div>
              <div className="row p-2 px-4">
                  <Form.Group className="col-lg-6">
                      <Form.Label>Birthdate</Form.Label>
                      <Form.Control type="date" onChange={e => handleChange(e)} name="birthdate" id="birthdate" value={editedUserData.birthdate || ''} />
                      {formErrors['birthdate']?<div className="form-text text-danger">{formErrors['birthdate']}</div>:<></>}
                  </Form.Group>
                  <Form.Group className="col-lg-6">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" onChange={e => handleChange(e)} name="phone" id="phone" value={editedUserData.phone} />
                      {formErrors['phone']?<div className="form-text text-danger">{formErrors['phone']}</div>:<></>}
                  </Form.Group>
              </div>
              
              <div className="row p-2 px-4">
                  <Form.Group className="col-lg-6">
                      <Form.Label>Gender</Form.Label>
                      <div key={'inline-radio'} className="mb-3">
                          <Form.Check inline label="Male" name="gender"
                            type='radio' value="Male" id='Male' checked={editedUserData.gender === "Male"}
                            onChange={e => handleChange(e)}/>
                          <Form.Check inline label="Female" name="gender"
                            type='radio' id='Female' value="Female" checked={editedUserData.gender === "Female"}
                            onChange={e => handleChange(e)}/>
                        </div>
                  </Form.Group>

                  <div className="col-lg-6 d-flex flex-row-reverse">
                        <button style={{ height:'40px', borderRadius:'16px'}}
                            type="submit" className="btn bg-primary text-white fw-semibold">
                        {fail==="load"?<><span class="spinner-border 
                        spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...</>:<>Save Changes</>}
                        </button>
                        <Link to={`/profile/${currentUser.id}`} type="button" className="btn btn-default">
                          Cancel
                        </Link>
                  </div>

              </div>

              </form>
      </div>
      </>:<></>
  ;
}

export default EditProfile;
