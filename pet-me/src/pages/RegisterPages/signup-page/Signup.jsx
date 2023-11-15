import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form'
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaw} from "@fortawesome/free-solid-svg-icons";

import { Input } from  '../../../components/form'
import { axiosInstance } from '../../../api/config';
import {useSelector} from 'react-redux'

import {
  email_validation,
  password_validation,
  name_validation,
} from '../../../utils/inputValidations';

const Signup = () => {
    const methods = useForm()
    const [fail, setFail] = useState(false)
    const navigate = useNavigate();
    const {synced} = useSelector(state => state.currentUser)
  
    useEffect(()=>{
        if (synced){navigate('/')}
    },[])

    const onSubmit = methods.handleSubmit(data => {
        document.querySelector('button.signup').innerHTML = `  <span class="spinner-border 
        spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...`

        axiosInstance.post(`/accounts/users/`,data).then(res => {
              methods.reset()
              setFail(false)
              navigate('/signup/success')
  
          }).catch((err)=>{
            document.querySelector('button.signup').innerHTML = 'Create Account'

              if (err.response.status === 400) {
                  setFail(Object.values(err.response.data))
              } else {
                  setFail("An Error Happened! Try again.")
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

            
                    <div className="col-12 col-lg-6">
                        <div className="card sec-border">
                        <div className="card-body p-4">
                            <div className="text-center mb-4">
                            <Link to="/" className="navbar-brand me-auto fw-bold" style={{ color: "#BF7245", fontSize: "2rem" }}>
                                <FontAwesomeIcon icon={faPaw} className="me-2" />
                                Pet.me
                            </Link>
                            </div>
                            {fail && (
                                <>{fail.map((error)=>{
                                        return <Alert key='danger' variant='danger'>
                                            {error}
                                        </Alert>
                                    })}</>
                              
                            )}
                            <h1 className="mt-5" style={{ color: "#BF7245" }}>Signup</h1>

                            <div className="form-group mt-4">
                            <Input  
                                {...name_validation}
                                name = "username"
                                type="text"
                                label="Username"
                                className="form-control"
                                id="username"
                                style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                                placeholder="Username"
                            />
                            </div>

                            <div className="form-group">
                            <Input  
                                {...  email_validation}
                                name="email"
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
                                    name="password"
                                    style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                                    placeholder="Password"
                                    />
                            </div>
                            <div className="mt-3">
                                <button style={{ width: "100%", backgroundColor: "#BF7245" }} 
                                    type="submit" className="btn signup text-white" onClick={onSubmit}>
                                Create Account
                                </button>

                            </div>

                            <p className="mt-4 text-center">Already have an account? <Link to="/login" style={{ color: "#BF7245", textDecoration: "none" }}>Login</Link></p>


                        </div>
                        </div>
                    </div>
                    </div>
            </form>
        </FormProvider>
        </div>

        );
    };

export default Signup;



