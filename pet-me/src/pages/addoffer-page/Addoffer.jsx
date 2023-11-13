import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from '../../api/config';


const AddOffer = () => {
    const [petName, setPetName] = useState("");
    const [message, setMessage] = useState("");

    const handlePetNameChange = (e) => {
        setPetName(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = (id) => {
        const data = {
            petName: petName,
            message: message,
            };
        
            axiosInstance.post(`/pets/${id}/offer`, data)
            .then((response) => {
                console.log("Offer sent successfully");
                // Handle any success actions here
            })
            .catch((error) => {
                console.error("Error sending offer:", error);
                // Handle any error actions here
            });
        };

    return (
        <div className="container-main" style={{ marginTop: "65px", marginLeft: "0px" , marginRight: "0px", marginBottom:"1px"}}>
        <div className="row" style={{width:"100%"}}>
        <div className="col-md-6" style={{ backgroundColor: "#D9C9BA", width: "35%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p className="text-white" style={{ fontSize: "3rem" }}>
                Find the new safe <br /> home your pet <br /> deserves
            </p>
            {/* Left Side */}
            </div>
            <div className="col-md-6"style={{ width: "65%" }} >
            {/* Right Side */}
            <div className="card border-0">
                <div className="card-body" style={{marginBottom:"130px"}}>
                <div className="text-center mb-4 mt-3">
                    <Link
                    to="/"
                    className="navbar-brand me-auto fw-bold"
                    style={{ color: "#BF7245", fontSize: "2rem" }}
                    >
                    <FontAwesomeIcon icon={faPaw} className="me-2" />
                    Pet.me
                    </Link>
                </div>
                <h1 className="mt-4" style={{ color: "#BF7245" }}>
                    Offer Your Pet For Adoption
                </h1>
                <div className="form-group mt-4">
                    <label htmlFor="petName" style={{ color: "#BF7245" }}>
                    Pet Name
                    </label>
                    <select
                    className="form-control mt-3"
                    id="petName"
                    style={{
                        color: "#BF7245",
                        backgroundColor: "#D9C9BA",
                    }}
                    value={petName}
                    onChange={handlePetNameChange}
                    >
                    <option value="">Select Pet Name</option>
                    <option value="Pet 1">Pet 1</option>
                    <option value="Pet 2">Pet 2</option>
                    <option value="Pet 3">Pet 3</option>
                    </select>
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="message" style={{ color: "#BF7245" }}>
                    Add Message
                    </label>
                    <textarea
                    className="form-control mt-3"
                    id="message"
                    style={{
                        color: "#BF7245",
                        backgroundColor: "#D9C9BA",
                    }}
                    placeholder="Enter your message"
                    value={message}
                    onChange={handleMessageChange}
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
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
                    Send
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default AddOffer;
