import { useState,useEffect } from "react";
import { axiosInstance } from '../../../api/config';
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const PetInfo = ( ) => {
    const { id } = useParams();
    const {synced, currentUser } = useSelector(state => state.currentUser);
    const navigate = useNavigate();
    const [ petData , setPetData ] = useState(null);
        
    const getPetData  = () => {
        axiosInstance.get(`pets/${id}/`)
        .then((res) => { 
        setPetData({...res.data, 'created_at':new Date(res.data.created_at)});
    })
        .catch((err) => console.log(err));
    }

    const deletePet = () => {
        axiosInstance.delete(`pets/${id}/`)
        .then((res) => {
            navigate('/'); // Redirect to the home page
        })
        .catch((err) => {
            console.log("Error deleting pet:", err);
        });
    };

    useEffect(()=>{
        getPetData();
        console.log(petData)
        
    },[]);

    const offerAdopt = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)

        if (id) {
            axiosInstance.post(`/pets/${id}/offer/`, formData)
              .then((response) => {
                console.log(response)
                document.getElementById('closeModal').click()
                navigate(`/offers/${response.data.offer}`);
              })
              .catch((error) => {
                console.error('Error submitting offer:', error);
              });
          } else {
            console.error('Pet ID is undefined');
          }
    };

  return petData?(
    <div className="container">
        <div className="row g-6" style={{ justifyContent:"space-between", paddingTop:"25px"}}>
            <div className="col-12 col-md-6 p-0 m-0" style={{height:"85vh"}}>
                <img style={{ borderRadius: "16px", objectFit:"cover", maxHeight:"600px", objectPosition:"top left" }} className="w-100 h-75" src={petData.thumbnail || require('../../../assets/images/Cat_annon.png')} alt="main pet" />
                <div className="d-flex w-100 mt-4 justify-content-between" style={{height:"155px"}}>
                    {petData.photos.slice(1,).map((image, index) =>
                        <img className='img-fluid border border-secondary' key={index} src={image.photo} alt="secondary" style={{width:"30%", borderRadius: "16px", objectFit:"cover"}}/>
                    )}
                </div>
            </div>
            <div className="col-12 col-md-6 p-0 m-0 ps-4 d-flex flex-column position-relative" style={{height:"85vh"}}>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/" className='text-decoration-none text-muted'>Home</a></li>
                        <li class="breadcrumb-item"><a href="/explore" className='text-decoration-none text-muted'>Pets</a></li>
                        <li class="breadcrumb-item active fw-bold text-dark" aria-current="page">Max</li>
                    </ol>
                </nav>

                <div className='offer-info-card flex-grow-1 d-flex flex-column'>
                    {currentUser.id === petData.owner.user_id?<>
                        <button style={{right:"30px"}} onClick={deletePet} className="btn btn-outline-danger float-end position-absolute">Delete Pet</button>
                    </>:<></>}

                    <h2 className='fw-bold mb-3' style={{maxWidth:"75%"}}>Say hi to {petData.name}! </h2>
                    <div className='d-flex justify-content-between align-items-center'>
                        {currentUser.id === petData.owner.user_id?<>
                            <Link to={`/profile/${petData.owner.user_id}`} className='text-decoration-none align-items-center d-flex'>
                            <img class="rounded-circle shadow-1-strong"
                                src={`${petData.owner.user_picture}`} alt="avatar" width="40"
                                height="40"/>
                            <p className="text-dark m-0 ms-4 fs-5 p-0" style={{textTransform:"capitalize"}}>{petData.owner.username}</p>  
                        </Link>
                        </>:<></>}
                        <p className="text-muted m-0">Added on {petData.created_at.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <hr style={{border:"1px solid #DDDDDD"}}/>

                    <div className='flex-grow-1'>
                        {currentUser.id == petData.owner.user_id? <>
                            <Link className='float-end btn outline-primary' to={`/editpet/${petData.id}`}>
                                Edit Pet Information
                            </Link> 
                        </>:<></>}
                        {petData.age?<div>
                            <p className="text-muted m-0">Age</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.age}
                            </p>
                        </div>:<></>}
                        {petData.gender?<div>
                            <p className="text-muted m-0">Gender</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.gender}
                            </p>
                        </div>:<></>}
                        {petData.breed?<div>
                            <p className="text-muted m-0">Breed</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.breed}
                            </p>
                        </div>:<></>}
                        {petData.species?<div>
                            <p className="text-muted m-0">Species</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.species}
                            </p>
                        </div>:<></>}
                        {petData.color?<div>
                            <p className="text-muted m-0">Color</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.color}
                            </p>
                        </div>:<></>}
                        <div>
                            <p className="text-muted m-0 border-bottom">Details</p>
                            <p className="fw-semibold fs-6 mb-2" style={{textAlign:"justify"}}>
                                {petData.brief}
                            </p>
                        </div>
                    </div>

                        
                    {petData.offer ? <>
                        <Link style={{height: "50px", borderRadius:"12px"}} 
                            type="button" className="btn mt-2 btn-primary text-light fw-bold py-2 px-3 w-100"
                            to={`/offers/${petData.offer}`}>
                            Adoption Offer Available
                        </Link> 
                        </>
                        : currentUser.id === petData.owner.user_id? <>
                        <button style={{height: "50px", borderRadius:"12px"}} 
                        type="button" className="btn mt-2 btn-primary text-light fw-bold py-2 px-3 w-100"
                        data-bs-toggle="modal" data-bs-target="#offerModal">
                        Offer This Pet for Adoption
                        </button> 

                        <div class="modal fade" id="offerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Publish Adoption Offer</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="POST" onSubmit={e=>offerAdopt(e)}>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Message:</label>
                                        <textarea minLength={15} name="description" class="form-control" id="message-text" required style={{resize:'none',outline:'none'}}></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button id="closeModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Publish Offer</button>
                                    </div>
                                    
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>

                    </>:<></>}

                </div>
            </div>

        </div>
        <div>
            <br /><hr />
        <h3 style={{textAlign:"center"}} >Previous Adoptions</h3>
            <hr />
        {petData.adoptions? (petData.adoptions.map((owner,index) => {
                return owner.username != petData.owner.username?( <div key={index} className="card mb-5 p-5">
                    
                    <div className="d-flex justify-content-between">  
                    <div className="d-flex">
                        <div className="d-inline" >
                        <img className=" rounded-circle shadow-1-strong me-3"
                            src={`${owner.user_picture}`} alt="avatar" width="60"
                            height="60" />  
                        </div>
                            <div  className="p-2">
                            <h5 className=" ">{owner.username} {" "} Owned {" "} {petData.name} {" for A while "} </h5>
                        </div>
                        </div>
                        <div className="d-inline ml-2 p-2  "><p style={{fontSize:"20px", fontWeight:"350", padding:"0",margin:"0"}}>from {owner.start_at}</p>
                        <p style={{fontSize:"20px", fontWeight:"350", padding:"0",margin:"0"}}>To {owner.end_at}</p>
                        </div>
                        </div>
                </div>  ):(<></>)
                    }) ):(<>no previous addoptions </>) }
        </div>
    </div>
    ):(<></>);
}
 
export default PetInfo;