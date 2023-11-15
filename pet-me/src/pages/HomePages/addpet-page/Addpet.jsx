import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddPet = () => {
    const [petName, setPetName] = useState("");
    const [petImage, setPetImage] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petWeight, setPetWeight] = useState("");
    const [petGender, setPetGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [petColor, setPetColor] = useState("");

    const handlePetNameChange = (e) => {
        setPetName(e.target.value);
    };


    const handleImageChange = (e) => {
        setPetImage(e.target.value);
    };

    const handleBreedChange = (e) => {
        setPetBreed(e.target.value);
    };

    const handleWeightChange = (e) => {
        setPetWeight(e.target.value);
    };

    const handleGenderChange = (e) => {
        setPetGender(e.target.value);
    };

    const handleDateOfBirthChange = (e) => {
        setDateOfBirth(e.target.value);
    };

    const handleColorChange = (e) => {
        setPetColor(e.target.value);
    };

    const handleSend = () => {
        console.log("Pet Name:", petName);
        console.log("Pet Image:", petImage);
        console.log("Pet Breed:", petBreed);
        console.log("Pet Weight:", petWeight);
        console.log("Pet Gender:", petGender);
        console.log("Date of Birth:", dateOfBirth);
        console.log("Pet Color:", petColor);
    };

    return (
        <div className="container-main" style={{ marginTop: "65px", marginLeft: "0px" , marginRight: "0px", marginBottom:"1px"}}>
            <div className="row" style={{width:"100%"}}>
                <div className="col-md-6" style={{ backgroundColor: "#D9C9BA", width: "35%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p className="text-white" style={{ fontSize: "2rem" }}>
                    Include all the<br/> relevant information<br/> about your pet to let<br/>
                    the world get to know<br/> him better and ensure<br/> him a better stay.
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
                                Add Pet
                            </h1>
                            <div className="form-group mt-4">
                            <label htmlFor="petImage" style={{ color: "#BF7245" }}>
                                Upload Image
                            </label>
                            
                            <div className="input-group mt-3">
                            <div className="input-group-append">
                                    <span className="input-group-text" style={{ backgroundColor: "#D9C9BA" }}>
                                        <FontAwesomeIcon icon={faCloudUploadAlt} style={{ color: "#BF7245" }} />
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="petImage"
                                    style={{
                                        color: "#BF7245",
                                        backgroundColor: "#D9C9BA",
                                    }}
                                    value={petImage}
                                    onChange={handleImageChange}
                                />
                                
                            </div>
                        </div>
                            <div className="form-group mt-4">
                            <div className="row">
                                    <div className="col">
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
                                <div className="col">
                                        <label htmlFor="petBreed" style={{ color: "#BF7245" }}>
                                            Pet Breed
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mt-3"
                                            id="petBreed"
                                            style={{
                                                color: "#BF7245",
                                                backgroundColor: "#D9C9BA",
                                            }}
                                            value={petBreed}
                                            onChange={handleBreedChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-4">
                                <div className="row">
                                    
                                    <div className="col">
                                        <label htmlFor="petWeight" style={{ color: "#BF7245" }}>
                                            Pet Weight
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mt-3"
                                            id="petWeight"
                                            style={{
                                                color: "#BF7245",
                                                backgroundColor: "#D9C9BA",
                                            }}
                                            value={petWeight}
                                            onChange={handleWeightChange}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="petGender" style={{ color: "#BF7245" }}>
                                            Pet Gender
                                        </label>
                                        <select
                                            className="form-control mt-3"
                                            id="petGender"
                                            style={{
                                                color: "#BF7245",
                                                backgroundColor: "#D9C9BA",
                                            }}
                                            value={petGender}
                                            onChange={handleGenderChange}
                                        >
                                            <option value="">Select Pet Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-group mt-4">
                            <div className="row">
                                    
                                    <div className="col">
                                    <label htmlFor="dateOfBirth" style={{ color: "#BF7245" }}>
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control mt-3"
                                        id="dateOfBirth"
                                        style={{
                                            color: "#BF7245",
                                            backgroundColor: "#D9C9BA",
                                        }}
                                        value={dateOfBirth}
                                        onChange={handleDateOfBirthChange}
                                    />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="petColor" style={{ color: "#BF7245" }}>
                                            Pet Color
                                        </label>
                                        <input
                                            type="color"
                                            className="form-control mt-3"
                                            id="petColor"
                                            style={{
                                                color: "#BF7245",
                                                backgroundColor: "#D9C9BA",
                                            }}
                                            value={petColor}
                                            onChange={handleColorChange}
                                        />
                                    </div>
                                </div>
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
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPet;
