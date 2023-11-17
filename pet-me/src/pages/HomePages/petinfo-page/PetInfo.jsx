import { useState,useEffect } from "react";
import { axiosInstance } from '../../../api/config';
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PetInfo = () => {
    const { id } = useParams();
    const {synced, currentUser } = useSelector(state => state.currentUser);


  const [ petData , setPetData ] = useState(null);
    
  const getPetData  = () => {
    axiosInstance.get(`pets/${id}/`)
    .then((res) => { 
      setPetData(res.data)
      
  })
    .catch((err) => console.log("osssssss",id,err));
      
  
  }
  useEffect(()=>{
    getPetData();
    console.log(petData)
    
  },[]);
  
 


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

                        <p style={{fontSize:"12px", fontWeight:"400px", padding:"0",margin:"0"}}>name</p>
                        <p>{petData.name}</p>
                        <p style={{fontSize:"12px", fontWeight:"400px", padding:"0",margin:"0"}}>age</p>
                        <p>{petData.age}</p>
                        <p style={{fontSize:"12px", fontWeight:"400px", padding:"0",margin:"0"}}>type</p>
                        <p>{petData.pet_type}</p>
                        <p style={{fontSize:"12px", fontWeight:"400px", padding:"0",margin:"0"}}>gender</p>
                        <p>{petData.gender}</p>
                        <p style={{fontSize:"12px", fontWeight:"400px", padding:"0",margin:"0"}}>species</p>
                        <p>{petData.species}</p>
                        <p style={{fontSize:"12px", fontWeight:"400px", padding:"0",margin:"0"}}>color</p>
                        <p>{petData.color}</p>
                        <p style={{fontSize:"12px", fontWeight:"400px", padding:"0",margin:"0"}}>brief</p>
                       
                        
                    <hr/>
                         <p className="mb-5">{petData.brief}</p>
                         {petData.owner.user_id == currentUser.id? 
                         <Link to={`/editpet/${petData.id}`} className="btn w-100 btn-outline-primary mb-3"> Edit Pet Data </Link>
                         :<Link to={`/profile/${petData.owner.user_id}`} className="w-100 btn-primary btn my-1" type="button">
                            View Pet Owner Profile</Link>}
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