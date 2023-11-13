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
import { useState,useEffect } from "react";
import { axiosInstance } from '../../api/config';
import { useParams } from "react-router-dom";


function UserProfile() {
    const { id } = useParams();
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
      
      
    },[]);    
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
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{usrData.first_name}</p>
                <p className="text-muted mb-4">{usrData.date_joined}</p>
                <div className="d-flex justify-content-center mb-2">
                  <btn className="btn" style={{backgroundColor:"#BF7245"}}>Message</btn>
                  
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0 " style={{textAlign:"center", alignContent:"center"}}> 
              <h5>Current pets</h5>
                <MDBListGroup flush className="rounded-3">
                   
                {usrData.pets.map((pet) => {
                    return pet?( <div className="card  shadow-0 mb-3" style={{maxHeight:"12em"}}>
                    <div class="card-header bg-transparent ">Type: {pet.pet_type}</div>
                    <div class="card-body">
                      <h5 class="card-title">Name: {pet.name}</h5>
                      <p class="card-text"> {pet.brief}</p>
                    </div>
                    <div class="card-footer bg-transparent ">Gender: {pet.gender}</div>
                  </div>):(<div className="card  shadow-0 mb-3" style={{maxHeight:"12em"}}><h3>no current pet</h3></div>)
                    
                    
                    
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
            <MDBListGroup flush className="rounded-3">
                   
                   {usrData.adoptions.map((pet) => {
                       return pet?( <div class="card  shadow-0 mb-3" style={{maxHeight:"12em"}}>
                      
                       <div class="card-body">
                         <h5 class="card-title">{usrData.first_name} Host Pet With Name: {pet.petname}</h5>
                         <p class="card-text"> From {pet.start_at}</p>
                         <p class="card-text"> Till {pet.ent_at?(pet.end_at):("now") }</p>
                       </div>
                       

                     </div>):(<></>) 
                    })}
            </MDBListGroup>

            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

  ):(<></>);
}

export default UserProfile;
