import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { axiosInstance } from '../../../api/config';
import { useParams } from "react-router-dom";

const EditPet = () => {
    const { id } = useParams();
      // const [petName, setPetName] = useState("");
      // const [petImage, setPetImage] = useState("");
      // const [petBreed, setPetBreed] = useState("");
      // const [petWeight, setPetWeight] = useState("");
      // const [petGender, setPetGender] = useState("");
      // const [dateOfBirth, setDateOfBirth] = useState("");
      // const [petColor, setPetColor] = useState("");

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
        <div className="container-main" style={{ alignSelf:"center"}}>
            <div className="" style={{alignSelf:"center" ,alignItems:"center", margin:"10px" ,padding:"10px", justifyContent:"center"}}>
               
              
                   
                  
                           <div className="text-center mb-4 mt-3">
                               <p
                                   
                                   className="navbar-brand me-auto fw-bold"
                                   style={{ color: "#BF7245", fontSize: "2rem" }}
                               >
                                   <FontAwesomeIcon icon={faPaw} className="me-2" />
                                   Pet.me
                               </p>
                           </div>
                           <div className="card p-5 m-5" >
                            
                           <form>
  <div className="row" style={{justifyContent:"center"}} > 
    <div className="form-group col-md-5 " style={{alignSelf:"center",justifyContent:"center"}}>
      <label for="petname">Name</label>
      <input type="email" name="name" class="form-control" id="petname" placeholder="Email" value={petData.name} />
    </div>
    <div className="form-group col-md-5 " style={{alignSelf:"center",justifyContent:"center"}}>
      <label for="petage">Pet Type</label>
      <input type="text" name="pet_type" class="form-control" id="pettype" placeholder="type" value={petData.pet_type} />
    </div>
   
  
  
  
    
  </div>
  

</form>
                         
                           
                           {/* <div className="d-flex justify-content-end">
                               <button
                                   className="btn mt-3"
                                   style={{
                                       width: "fit-content",
                                       backgroundColor: "#8c594d",
                                       color: "white",
                                   }}
                                   type="button"
                                   onClick={handleSend}
                               >
                                   Next
                               </button>
                           </div> */}
                           </div>
                    
               </div>
           
        </div>
    ):(<></>);
};

export default EditPet;
