import { useState } from "react";
import { Link } from "react-router-dom";

import Cookies from 'js-cookie';
import { axiosInstance } from '../../api/config';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import Alert from 'react-bootstrap/Alert';


import { Input } from '../../components/form'
import { FormProvider, useForm } from 'react-hook-form'
import {
  email_validation,
  password_validation,
} from '../../utils/inputValidations';

const Login = () => {
    const methods = useForm()
    const [fail, setFail] = useState(false)
  
    // const [showPassword, setShowPassword] = useState(false);

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const onSubmit = methods.handleSubmit(data => {
        axiosInstance.post(`/accounts/jwt/create/`,data).then(res => {
            console.log(res.data)
            Cookies.set('refresh', res.data.refresh, { expires: 7, domain: '.yourdomain.com'})
            Cookies.set('access', res.data.access, { expires: 1, domain: '.yourdomain.com'})
            methods.reset()
            setFail(false)


        }).catch((err)=>{
            if (err.response.status === 401) {
                console.log(err)
                setFail("Credentials are incorrect.")
            } else {
                console.log(err)
                setFail("An Error Happened!")
            }
            setTimeout(()=>{
                setFail(false)
            },3000)
        })
      })

    return (
        <div className="container py-5 vh-100 d-flex align-items-center">    
        <FormProvider {...methods}>
            <form
            onSubmit={e => e.preventDefault()}
            noValidate
            autoComplete="off"
            className="container"
            >
                    <div className="row g-5 pt-5" >
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
                            <div className="text-center mb-4 mt-5">
                            <Link to="/" className="navbar-brand me-auto fw-bold" style={{ color: "#BF7245", fontSize: "2rem" }}>
                                <FontAwesomeIcon icon={faPaw} className="me-2" />
                                Pet.me
                            </Link>
                            </div>
                            {fail && (
                                <Alert key='danger' variant='danger'>
                                    {fail}
                                </Alert>
                              
                            )}
                            <h1 className="mt-5" style={{ color: "#BF7245" }}>Login</h1>
                            <div className="form-group mt-4">
                            <Input  
                                {...email_validation}
                                type="email"
                                label="Email address"
                                className="form-control"
                                id="email"
                                style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                                placeholder="Email"
                            />
                            </div>
                            <div className="form-group ">
                                    <Input 
                                    {...password_validation}
                                    type="password"
                                    label = "Password"
                                    className="form-control"
                                    id="password"
                                    style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                                    placeholder="Password"
                                    />
                            </div>
                            <p className="mt-2 text-center">Forgot password? <Link to="/forgotpass" style={{ color: "#BF7245", textDecoration: "none" }}>Restore Password</Link></p>
                            <div className="mt-3">
                                <button style={{ width: "100%", backgroundColor: "#BF7245" }} 
                                    type="button" className="btn text-white" onClick={onSubmit}>
                                Login
                                </button>

                            </div>

                            <p className="mt-4 text-center">Don't have an account? <Link to="/signup" style={{ color: "#BF7245", textDecoration: "none" }}>Signup</Link></p>


                        </div>
                        </div>
                    </div>
                    </div>
            </form>
        </FormProvider>
        </div>

        );
    };

export default Login;



