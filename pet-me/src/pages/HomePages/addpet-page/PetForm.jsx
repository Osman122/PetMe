import Cat_annon from '../../../assets/images/Cat_annon.png'
import { useSelector } from 'react-redux';

import { axiosInstance } from '../../../api/config';
import React, { useState, useEffect } from 'react';

import {Alert, Form} from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addPet} from '../../../store/Slices/UserSlice'

const PetForm = () => {
    const { id } = useParams();
    const {synced, currentUser } = useSelector(state => state.currentUser);
    const [petData, setPetData] = useState({});

    const [fail, setFail] = useState(false)
    const navigate = useNavigate();
    const [ formErrors , setFormErrors ] = useState({})
    const dispatch = useDispatch()

    function Redirect () {
        setTimeout(()=>{
            if (!synced){
                // navigate('/')
            }
            },2000)
        }

    useEffect(() => {
        // Convert date
        var birthdate, pet

        try {
            pet = currentUser.pets.filter(obj => obj.id == id)[0]
            console.log(currentUser.pets)
            birthdate = new Date(pet.birthdate).toISOString().substr(0, 10)
            
        } catch (e) {
            if (!(e instanceof RangeError)) {
                pet = {}
            }
            birthdate = ""
        }

        setPetData({...pet,'birthdate': birthdate});
        Redirect()
    }, [synced, id]);


    const validateField = (event) => {
        let val = event.target.value
        let name = event.target.name

        let formErrors_ = {...formErrors}

        switch (name){
            case "name":
                if (/^[a-z]{3,20}$/i.test(val)){
                    delete formErrors_[name]
                } else {                   
                    formErrors_[name] = "Please enter valid names, 3 to 20 characters long"
                }
                break;
  
              case "brief":
                  if (/^.{30,}$/i.test(val)){
                      delete formErrors_[name]
                  } else {                   
                      formErrors_[name] = "Please enter valid names"
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
        setPetData({...petData, [name] : val})
    }

  const handleChange = (event) => {
    let val = event.target.value
    let name = event.target.name
    let formErrors_ = {...formErrors}
    delete formErrors_[name]
    setFormErrors(formErrors_)
    setPetData({...petData, [name] : val})

  }

    const sendData =  async (data) => {
        try {
            let res
            if (id) {
                res = await axiosInstance.patch(`/pets/${id}/`, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                    }})
                
                
            } else {
                res = await axiosInstance.post(`/pets/`, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                    }})
            }
            dispatch(addPet(res.data))
            navigate(`/petinfo/${res.data.id}`)
            
        } catch (e) {
            console.log(e)
            let alert = document.getElementById('fail')
            alert.lastChild.innerText = "Something went wrong!."
            alert.hidden = false
            setTimeout(()=>{
                document.getElementById('fail').hidden = true
            },3000)
        }

    }

  function onSubmit (e) {
    e.preventDefault()
    setFail("load")
    const formData = new FormData(e.target)
    if (formData.getAll("photos").length > 4){
        let alert = document.getElementById('fail')
        alert.lastChild.innerText = "You cannot upload more than 4 photos."
        alert.hidden = false
        setFail(false)
        setTimeout(()=>{
            document.getElementById('fail').hidden = true
        })
        return
        }

    if (formData.getAll("photos")[0].name === ""){
      formData.delete("photos")
    }
    if (formData.get("species") === "Choose a Species"){
        formData.delete("species")
    }

    sendData(formData)
  };
    
  return (petData? Object.values(petData).length > 1 || !id ? <>
      <div className="container light-style flex-grow-1 container-p-y p-3 mb-3">
        <h2 className="fw-bold pt-3 mb-2">{id? "Edit Pet Profile":"Add A New Pet"}</h2>
        <hr style={{border:"2px solid #DDDDDD"}}/>
            <form onSubmit={e => onSubmit(e)}
            enctype="multipart/form-data" className='mt-3 position-relative user-form'>

              <div className="row">
                <div className="media-body ml-4 col-lg-4 d-flex flex-column align-items-center">
                    <label htmlFor="profile-picture" className="position-relative btn btn-outline-light rounded-circle p-0 m-0" style={{width:"200px", height:"200px"}}>
                        <img src={petData.thumbnail?petData.thumbnail:Cat_annon}
                            alt="avatar" id="profile" className="w-100 h-100 rounded-circle" />
                    </label>
                    <div className="position-relative w-75 mt-3" style={{overflowX:'hidden',height: '35px'}}>
                      <input id="profile-picture" multiple type="file" accept="image/*" name="photos" style={{left: '-150px', visibility:'hidden'}}
                            className="account-settings-fileinput position-absolute" 
                            onChange={e => {e.target.style.visibility = "visible"}}/>
                    </div>
                    <p className="mt-1 text-center">
                      Allowed JPG, GIF or PNG. Max size of 2MB
                    </p>
                </div>
                <div className="col-lg-7 offset-lg-1 d-flex flex-column pe-5 pt-4">
                <Form.Group className="col">
                      <Form.Label>Pet Name</Form.Label>
                      <Form.Control type="text" required={true} onBlur={e => validateField(e)} onChange={e => handleChange(e)} name="name" id="name" value={petData.name} />
                      {formErrors['name']?<div className="form-text text-danger">{formErrors['name']}</div>:<></>}
                  </Form.Group>
                  <Form.Group className="col">
                      <Form.Label>Brief</Form.Label>
                      <Form.Control as="textarea" rows={5} onBlur={e => validateField(e)} onChange={e => handleChange(e)} name="brief" id="brief" value={petData.brief} />
                      {formErrors['brief']?<div className="form-text text-danger">{formErrors['brief']}</div>:<></>}
                  </Form.Group>
                </div>
              </div>

              <hr style={{border:"2px solid #DDDDDD"}}/>

              <div className="row p-2 px-4">
                  <Form.Group className="col-lg-4">
                      <Form.Label>Birthdate</Form.Label>
                      <Form.Control type="date" onChange={e => {handleChange(e); validateField(e)}} name="birthdate" id="birthdate" value={petData.birthdate || ''} />
                      {formErrors['birthdate']?<div className="form-text text-danger">{formErrors['birthdate']}</div>:<></>}
                  </Form.Group>
                  <Form.Group className="col-lg-4">
                    <Form.Label>Birthdate</Form.Label>
                    <select className="form-select" required={true} name="species" aria-label="Default select example">
                            <option selected={!petData.species}>Choose a Species</option>
                            <option value="Dog" selected={petData.species === "Dog"}>Dog</option>
                            <option value="Cat" selected={petData.species === "Cat"}>Cat</option>
                            <option value="Turtle" selected={petData.species === "Turtle"}>Turtle</option>
                            <option value="Hamster" selected={petData.species === "Hamster"}>Hamster</option>
                            <option value="Bird" selected={petData.species === "Bird"}>Bird</option>
                            <option value="Other" selected={petData.species === "Other"}>Other</option>
                        </select>
                  </Form.Group>
                  <Form.Group className="col-lg-4">
                      <Form.Label>Breed</Form.Label>
                      <Form.Control type="text" onChange={e => handleChange(e)} name="breed" id="breed" value={petData.breed} />
                  </Form.Group>
              </div>
              
              <div className="row p-2 px-4">
                  <Form.Group className="col">
                      <Form.Label>Gender</Form.Label>
                      <div key={'inline-radio'} className="mb-3">
                          <Form.Check inline label="Male" name="gender"
                            type='radio' value="Male" id='Male' checked={petData.gender === "Male"}
                            onChange={e => handleChange(e)}/>
                          <Form.Check inline label="Female" name="gender"
                            type='radio' id='Female' value="Female" checked={petData.gender === "Female"}
                            onChange={e => handleChange(e)}/>
                        </div>
                  </Form.Group>
                  <Form.Group className="col">
                      <Form.Label>Color</Form.Label>
                      <Form.Control type="text" required={true} onBlur={e => validateField(e)} onChange={e => handleChange(e)} name="color" id="color" value={petData.color} />
                      {formErrors['color']?<div className="form-text text-danger">{formErrors['color']}</div>:<></>}
                  </Form.Group>
                  <div className="col d-flex flex-row-reverse align-items-center">
                        <button style={{ height:'40px', borderRadius:'16px'}}
                            type="submit" className="btn bg-primary text-white fw-semibold">
                        {fail==="load"?<><span class="spinner-border 
                        spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...</>:<>{id?"Save Changes":"Create Pet"}</>}
                        </button>
                        <Link to={id?`/petinfo/${id}`:`/profile/${currentUser.id}`} type="button" className="btn btn-default">
                          Cancel
                        </Link>
                  </div>

              </div>

              </form>
      </div>
      </>:<></>:<></>
  );
}

export default PetForm;
