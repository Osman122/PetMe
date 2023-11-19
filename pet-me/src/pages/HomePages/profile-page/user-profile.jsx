import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,

} from 'mdb-react-ui-kit';
import {Row,Col}from 'react-bootstrap';
import { useState,useEffect } from "react";
import { axiosInstance } from '../../../api/config';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {clearCurrUser, setCurrUser} from '../../../store/Slices/UserSlice'
import PetCard from '../../../components/explore/PetCard';
import ProfilePetCard from '../../../components/Profile/profile-pet-card';


function UserProfile() {
    const { id } = useParams();
    const { synced, currentUser } = useSelector(state => state.currentUser);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ usrData , setUserData ] = useState(null);
      
    const getUserData  = () => {
      axiosInstance.get(`/accounts/users/${id}/`)
      .then((res) => { 
        setUserData(res.data)
    })
      .catch((err) => console.log("osssssss",id,err));
    }
    useEffect(()=>{
      getUserData();
    },[id]);

    const deleteAccount = (e) => {
        e.preventDefault()

        let current_password = e.target.querySelector('input').value

        axiosInstance.delete(`/accounts/users/me/`, {data: {current_password:current_password}}).then(()=>{
          dispatch(clearCurrUser())
          document.getElementById('closeModal').click()
          navigate('/register/login')
        }).catch(e => {
            console.log(e)
            document.getElementById('fail').lastChild.innerText = "Something went wrong!."
            document.getElementById('fail').hidden = false
            setTimeout(()=>{
                document.getElementById('fail').hidden = true
            },3000)

        })

        console.log(alert)
        


    

    }

    return usrData?  (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
       

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src= {usrData.picture}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{usrData.first_name}</p>
                <p className="text-muted mb-4">{usrData.date_joined}</p>
                <div className="d-flex justify-content-center mb-2">
                {synced? currentUser.id == id ? <><Link to="/profile/edit" className="btn outline-primary me-3">Edit Profile</Link>
                <Button variant='outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal">Delete Account</Button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Careful! You are going to delete your data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form method="POST" onSubmit={e=>deleteAccount(e)}>
                        <div class="mb-3">
                            <label for="current_password" class="col-form-label">Enter your password for confirmation:</label>
                            <input name="current_password" type='password' class="form-control border " id="current_password" required></input>
                        </div>
                        <div class="modal-footer">
                            <button id="closeModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger">Delete Account</button>
                        </div>
                        
                        </form>
                    </div>
                    </div>
                </div>
                </div></>

                :<button className="btn outline-primary">Message</button>:<></>}
                 
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
                     <h5 style={{textAlign:"center", fontWeight:"bolder", padding:"10px"}}>Previous Addaptions </h5>

              <MDBCardBody className="p-0 " > 
                <MDBListGroup flush className="rounded-3">
                   
                {usrData.adoptions.map((pet) => {
                       return pet?( <div class="card  shadow-0 mb-3" style={{maxHeight:"12em"}}>
                      
                       <div class="card-body">
                         <h5 class="card-title">{usrData.first_name} Host Pet With Name: {pet.petname}</h5>
                         <p class="card-text"> From {pet.start_at}</p>
                         <p class="card-text"> Till {pet.ent_at?(pet.end_at):("now") }</p>
                       </div>
                       

                     </div>):(<></>) 
                    
                
                
                /* {usrData.pets.map((pet) => {
                    return pet?( <div className="card  shadow-0 mb-3" style={{maxHeight:"12em"}}>
                    <div class="card-header bg-transparent ">Type: {pet.pet_type}</div>
                    <div class="card-body">
                      <h5 class="card-title">Name: {pet.name}</h5>
                      <p class="card-text"> {pet.brief}</p>
                    </div>
                    <div class="card-footer bg-transparent ">Gender: {pet.gender}</div>
                  </div>):(<div className="card  shadow-0 mb-3" style={{maxHeight:"12em"}}><h3>no current pet</h3></div>)
                     */
                    
                    
                //     <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    
                //     <h5>Pet name</h5>
                    
                //   <MDBCardText>{pet.name}</MDBCardText>
                //   <MDBCardText>{pet.pet_type}</MDBCardText>
                //   </MDBListGroupItem>
                       })}
                 
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{`${usrData.first_name} ${usrData.last_name}`}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{usrData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{usrData.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{usrData.gender}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{usrData.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>birthdate</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{usrData.birthdate}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBCard>
            <MDBListGroup flush className="rounded-3">
              {/* <div>{synced? currentUser.id == id ? <><Link to="/profile/edit" className="btn outline-primary me-3">Edit Profile</Link>
                <Button variant='outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal">Delete Account</Button>
                   </>:<></> }</div> */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:"20px" }}>
            <h3 style={{textAlign:"center", fontWeight:"bolder" ,paddingBottom:"10px", display:"inline" ,marginTop:"6px"}}>Current pets</h3>
            {synced? currentUser.id == id ? <><Link to="/addpet" className='m-2 btn outline-primary me-3'>Add New</Link>
            </>:<></>:<></>}
           </div>
            {usrData.pets.length>0?(<Row className="row-cols-lg-2 row-cols-md-2 row-cols-1">
                        { usrData.pets.map((pet) => {return <>
                            <Col className='d-flex justify-content-center mb-3 mb-lg-0 py-2'>
                                <ProfilePetCard pet={pet} />
                            </Col>
                        </>})}
                    </Row>):(<> 
                    <h5 style={{textAlign:"center", fontWeight:"bolder" }}> No Current pets you can add now</h5></>)}
        
                  
            </MDBListGroup>
</MDBCard>
            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

  ):(<></>);
}

export default UserProfile;
