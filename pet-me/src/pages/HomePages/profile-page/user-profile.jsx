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
import Post from '../../../components/home/Post';
import PostContext from "../../../Context/PostContext";


function UserProfile() {
    const { id } = useParams();
    const { synced, currentUser } = useSelector(state => state.currentUser);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ postsList , setPostsList ] = useState([])

    const [ usrData , setUserData ] = useState(null);
      
    const getUserData  = () => {
      axiosInstance.get(`/accounts/users/${id}/`)
      .then((res) => {
        let birthdate
        if (res.data['birthdate']){
          birthdate = new Date(res.data['birthdate']).toISOString().substr(0, 10)
        } else {
          birthdate = ""
        }
        const date_joined = new Date(res.data['date_joined']).toISOString().substr(0, 10)
        setUserData({...res.data,'birthdate':birthdate, 'date_joined':date_joined })
    })
      .catch((err) => console.log("osssssss",id,err));
    }
    const getPostsList = () => {
      axiosInstance.get(`/posts/user/${id}/`)
      .then((res) => {
          setPostsList(res.data.results)
          
      })
      .catch((err) => console.log(err));
  }
    useEffect(()=>{
      getUserData();
      getPostsList();
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

    const sendMessage = (e) => {
      e.preventDefault()
      let content = e.target.querySelector('textarea').value

      axiosInstance.post(`/chats/user/${usrData.id}/`,{content:content}).then(()=>{
          let alert = document.getElementById('success')
          alert.lastChild.innerText = "Message Sent Successfully."
          document.getElementById('closeModal').click()
          alert.hidden = false
          setTimeout(()=>{
              document.getElementById('success').hidden = true
          },3000)

      }).catch(e => {
          console.log(e)
          let alert = document.getElementById('fail')
          alert.lastChild.innerText = "Something went wrong!."
          alert.hidden = false
          setTimeout(()=>{
              document.getElementById('fail').hidden = true
          },3000)

      })}
    

    return usrData?  (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

       
      <MDBCard className="mb-4 py-4">
              
              <MDBCardBody className="text-center">
              <MDBRow>
              <MDBCol lg="2">
                <MDBCardImage
                  src= {usrData.picture}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '130px', height: '130px'  ,paddingLeft:"0px",marginLeft:"0"}}
                   />
                </MDBCol>
                <MDBCol lg="3">
                
                <p className="text-muted mb-1">{`${usrData.first_name}${usrData.last_name?' '+usrData.last_name:""}` || usrData.username}</p>
                <p className="text-muted mb-4">Member since: {usrData.date_joined}</p>
                <div className="d-flex flex-wrap justify-content-center mb-2">
                {synced? currentUser.id == id ? <><Link to="/profile/edit" className=" flex-grow-1 btn outline-primary me-3">Edit Profile</Link>
                <Button className='flex-grow-1' variant='outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal">Delete Account</Button>
                <Link to="/addpet" className='btn btn-primary mt-3 fw-bold flex-grow-1' style={{flexBasis:"100%"}}>Add New Pet</Link>
            
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

                :
                <>
                <button className="btn outline-primary" data-bs-toggle="modal" data-bs-target="#messageModal">Message</button>
                <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Send Message to this user</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <form method="POST" onSubmit={e=>sendMessage(e)}>
                          <div class="mb-3">
                              <label for="message-text" class="col-form-label">Message:</label>
                              <textarea name="content" class="form-control" id="message-text" required style={{resize:'none',outline:'none'}}></textarea>
                          </div>
                          <div class="modal-footer">
                              <button id="closeModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary">Send Message</button>
                          </div>
                          
                          </form>
                      </div>
                      </div>
                  </div>
                </div>
                </>:<></>}
                 
                </div>
                </MDBCol>
                <MDBCol lg="1"> 
                <div class="d-flex" style={{height:"90%"}}>
                <div class="vr"></div>
                 </div>
                 </MDBCol>
              
                <MDBCol lg="6">
              
                
                
                <MDBRow style={{marginBottom:"6px"}}>
                  <MDBCol sm="3">
                    <MDBCardText style={{fontSize:"15px"}}>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontSize:"18px"}}>{usrData.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              
                <MDBRow style={{marginBottom:"6px"}}>
                  <MDBCol sm="3">
                    <MDBCardText style={{fontSize:"15px"}}>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{fontSize:"18px"}} className="text-muted">{usrData.gender}</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <MDBRow style={{marginBottom:"6px"}}>
                  <MDBCol sm="3">
                    <MDBCardText style={{fontSize:"15px"}}>BirthDate</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontSize:"18px"}}>{usrData.birthdate}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              
                <MDBRow style={{marginBottom:"6px"}}>
                  <MDBCol sm="3">
                    <MDBCardText style={{fontSize:"15px"}}>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ fontSize:"18px" ,color:"#0000"}} className="text-muted">{usrData.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
            
                </MDBCol>
                
              </MDBRow>
              </MDBCardBody>
             
            </MDBCard>
              
            <MDBCard>
            <MDBListGroup flush className="rounded-3">

             

              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Pets</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Posts</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#prev" type="button" role="tab" aria-controls="profile" aria-selected="false">Pet History</button>
                </li>
                
              </ul>  
                 <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <h3 className='fw-bold p-2 m-0 text-center'>Current pets</h3>
                {usrData.pets.length?(
                    <div className="d-flex mx-3 p-3" style={{overflowX:"auto", flexWrap:"nowrap"}}>
                        { usrData.pets.map((pet) => {return <>
                                <PetCard pet={pet}/>
                        </>})}
                    </div>):(<> 
                    <h5 style={{textAlign:"center", fontWeight:"bolder" }}> No Current pets you can add now</h5></>)}
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <MDBCard className="mb-4 mb-lg-0" style={{maxHeight:"150vh", overflow:"auto"}}>
                          <MDBCardBody className="p-0 " > 
                          {usrData.posts.length>0?(<MDBListGroup flush className="rounded-3">
                          
                          <PostContext.Provider value={{ postsList, setPostsList }}>
                                {postsList.map((post) => {
                                    return <Post post={post}/> 
                                })}
                            </PostContext.Provider>

                          
                          </MDBListGroup>):(<>
                            <h5 style={{textAlign:"center", paddingTop:"15px" }}> No posts currently</h5>
                          
                          </>)}
                        </MDBCardBody>
                      </MDBCard>
                    </div>
                    <div class="tab-pane fade" id="prev" role="tabpanel" aria-labelledby="previous-tab">
                    <MDBCard className="mb-4 mb-lg-0">
                     <h5 style={{textAlign:"center", fontWeight:"bolder", padding:"10px"}}>Previous Adoptions </h5>

                 <MDBCardBody className="p-0 " > 
                 {usrData.adoptions.length>0?(<MDBListGroup flush className="rounded-3">
                   
                {usrData.adoptions.map((adoption) => {
                       return adoption.end_at?( <div class="card shadow-0 mb-3" style={{maxHeight:"12em"}}>
                      
                       <div class="card-body">
                         <h5 class="card-title text-center"><strong>{`${usrData.first_name}${usrData.last_name?' '+usrData.last_name:""}` || usrData.username}</strong> had <Link className='text-dark mx-5' to={`/petinfo/${adoption.pet_id}`}>{adoption.petname}</Link> From {adoption.start_at}  Till  {(adoption.end_at)}</h5>
                       </div>
         
                     </div>):(<></>) 
                       })}
                 
                </MDBListGroup>):(<>
                  <h5 style={{textAlign:"center", paddingTop:"15px" }}> No Previous Adoptions for this user</h5>
                
                </>)}
              </MDBCardBody>
            </MDBCard>
                    </div>

                    </div>
                  
            </MDBListGroup>
             </MDBCard>

      </MDBContainer>
    </section>

  ):(<></>);
}

export default UserProfile;
