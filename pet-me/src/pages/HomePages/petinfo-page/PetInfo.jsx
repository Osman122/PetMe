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
        setPetData(res.data)
        
    })
        .catch((err) => console.log("osssssss",id,err));
        
    
    }
    const handleDeletePet = () => {
        axiosInstance.delete(`pets/${id}/`)
        .then((res) => {
            // Pet deleted successfully, update the UI or take any other action
            console.log("Pet deleted successfully");
            // You may want to clear the petData state or update the UI after deletion
            navigate('/'); // Redirect to the home page
        })
        .catch((err) => {
            // Handle the error, such as displaying an error message to the user
            console.log("Error deleting pet:", err);
        });
    };
    useEffect(()=>{
        getPetData();
        console.log(petData)
        
    },[]);

    const [offerDescription, setOfferDescription] = useState('');

    const handleOfferSubmit = (event) => {
        event.preventDefault();
        if (id) {
            // Send a POST request to the /pets/<pet_id>/offer endpoint
            axiosInstance.post(`/pets/${id}/offer/`, { description: offerDescription })
              .then((response) => {
                // Handle successful offer submission
                console.log('Offer submitted successfully:', response.data);
                navigate('/'); // Redirect to the home page
                // You can add further logic here, such as updating the UI
              })
              .catch((error) => {
                // Handle error
                console.error('Error submitting offer:', error);
              });
          } else {
            console.error('Pet ID is undefined');
          }
        };
    
    


  return petData?(
    
            <div className="container">
            <div className="row g-6" style={{ justifyContent:"space-between", paddingTop:"25px"}}>
                <div className="col-12 col-md-5 sec-border p-3">
                    <img style={{maxHeight:"450px ", marginBottom:"40px" }} className="w-100 h-100 rounded border border-dark" src={petData.thumbnail} alt=""></img>
                   {petData.photos.length!=0?( <div className="" style={{display:"flex", height:"100px",width:"100% ", justifyContent:"space-around"}} >
                    { petData.photos.map((pet) => {
                    return pet?( <img className="border rounded  my-2" src={pet.photo} alt="pic" />  ):(<>no pics</>)
                
                       })}
                       
                    </div>):(<></>)}
                </div>
                <div className="col-12 col-md-6 card"  style={{marginLeft:"20px",marginTop:"20px", marginBottom:"10px" }}>
                    <div className=" " style={{marginLeft:"20px",marginTop:"30px" }}>
                        
                        <div children className="d-inline" >
                            
                        <img className="d-inline rounded-circle shadow-1-strong me-3"
                         src={`${petData.owner.user_picture}`} alt="avatar" width="40"
                           height="40" />  
                           </div>
                           <div  className="d-inline">
                           <h5 className="d-inline ">{petData.owner.username} {" "}Currently Own{" "} {petData.name}  </h5>
                        </div>
                      
    
                    </div>
                    <hr/>
                   
                    <div className=" mx-2" >

                        <p className="text-muted m-0">Name</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.name}
                            </p>
                        <p className="text-muted m-0">Age</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.age}
                            </p>
                        <p className="text-muted m-0">Type</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.pet_type}
                            </p>
                        <p className="text-muted m-0">Gender</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.gender}
                            </p>
                        <p className="text-muted m-0">Species</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.species}
                            </p>
                        <p className="text-muted m-0">Color</p>
                            <p className="fw-semibold fs-5 mb-2">
                                {petData.color}
                            </p>
                        
                        <p className="text-muted m-0 border-bottom">Brief</p>
                            <p className="fw-semibold fs-6 mb-2" style={{textAlign:"justify"}}>
                            {petData.brief}
                            </p>
                    
                        
                        {petData.owner.user_id == currentUser.id? 
                        <Link to={`/editpet/${petData.id}`} className="btn w-100 btn-outline-primary mb-3"> Edit Pet Data </Link>
                        :<Link to={`/profile/${petData.owner.user_id}`} className="w-100 btn-primary btn my-1" type="button">
                            View Pet Owner Profile</Link>}

                            {petData.owner.user_id === currentUser.id && (
                                <button onClick={() => handleDeletePet(petData.id)} className="btn w-100 btn-danger mb-3">
                                Delete Pet
                                </button>
                            )}
                        {currentUser.id === petData.owner.user_id && (
                            <form onSubmit={handleOfferSubmit}>
                                    <div>
                                    <label htmlFor="offerDescription">Offer Description:</label>
                                    <input
                                        type="text"
                                        id="offerDescription"
                                        value={offerDescription}
                                        onChange={(e) => setOfferDescription(e.target.value)}
                                    />
                                    </div>
                                    <button type="submit">Make Offer</button>
                                </form>)}
                        </div>
                </div>
    
            </div>
            <div>
                <br /><hr />
            <h3 style={{textAlign:"center"}} >Prvious Adoptions</h3>
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