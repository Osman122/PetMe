import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Signup = () => {


    return (
        <div className="container main">
            <div className="container">
                <div className="row g-5" style={{ justifyContent: "space-between" }}>
                <div className="col-6">
                    <div className="row h-100">
                    <div className="col-12 sec-border p-3">
                        <img style={{ maxHeight: "450px" }} className="w-100 h-100" src="logo192.png" alt="" />
                    </div>
                    </div>
                </div>
        
                <div className="col-6">
                    <div className="card sec-border">
                    <div className="card-body">
                        <div className="text-center mb-4 mt-3">
                        <Link to="/" className="navbar-brand me-auto fw-bold" style={{ color: "#BF7245", fontSize: "2rem" }}>
                            <FontAwesomeIcon icon={faPaw} className="me-2" />
                            Pet.me
                        </Link>
                        </div>
                        <h1 className="mt-4" style={{ color: "#BF7245" }}>Create Account</h1>
                        <div className="form-group mt-4">
                        <input
                            type="text"
                            className="form-control mt-3"
                            id="fullname"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                            placeholder="Full Name"
                        />
                        </div>
                        <div className="form-group mt-4">
                        <input
                            type="date"
                            className="form-control mt-3"
                            id="birthdate"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                            placeholder="Birthdate"
                        />
                        </div>
                        <div className="form-group mt-4">
                        <input
                            type="email"
                            className="form-control mt-3"
                            id="email"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                            placeholder="Email"
                        />
                        </div>
                        <div className="form-group">
                        <div className="input-group">
                            <input
                            type="password"
                            className="form-control mt-4"
                            id="password"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                            placeholder="Password"
                            />
                            {/* <div className="input-group-append">
                            <span className="input-group-text" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                            </div> */}
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group">
                            <input
                            type="password"
                            className="form-control mt-4"
                            id="password"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                            placeholder="Confirm Password"
                            />
                            {/* <div className="input-group-append">
                            <span className="input-group-text" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                            </div> */}
                        </div>
                        </div>
                        <button style={{ width: "100%", backgroundColor: "#BF7245" }} type="button" className="btn mt-3 text-white">
                        Create Account
                        </button>
                        <p className="mt-3">Already have an account? <Link to="/login" style={{ color: "#BF7245", textDecoration: "none" }}>Login</Link></p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        );
    };

export default Signup;