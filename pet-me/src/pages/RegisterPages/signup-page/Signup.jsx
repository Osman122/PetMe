import logo from '../../../assets/images/Logo.png'

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form'
import Alert from 'react-bootstrap/Alert';

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
        setFail("load")

        axiosInstance.post(`/accounts/users/`,data).then(res => {
              methods.reset()
              setFail(false)
              navigate('/register/signup/success')
  
          }).catch((err)=>{
            try {
                if (err.response.status === 400) {
                    setFail(Object.values(err.response.data)[0])
                } else {
                    setFail("An Error Happened! Try again.")
                }
                setTimeout(()=>{
                    setFail(false)
                },300000)

            } catch (error) {
                console.log(error)
            }
          })
      })

    return (
        <section>
        <div className="midscreen container">
            <div className="row justify-content-center">
                <div className="d-flex col-lg-5 offset-lg-1 m-0 py-sm-2 py-lg-5 justify-content-center align-items-center">
                    <h1 className='text-light fw-bold' style={{width:'400px', fontSize:'48px', textAlign:'justify'}}>Immerse Yourself in a World of Paws and Purrs.</h1>
                </div>
                <div className="register-card col-lg-5">
                    <div className="text-center">
                        <Link to="/" className="mx-auto my-3"><img src={logo} alt='logo' style={{height:"40px"}}/></Link>
                        <h1 className='my-3 pt-2'>Welcome to Pet.me</h1>
                        <p className="text-muted" style={{textTransform:'capitalize'}}>Find a new home for your pet</p>
                    </div>


                    <FormProvider {...methods}>
                    <form onSubmit={e => e.preventDefault()}
                    noValidate className='mt-3 position-relative'>
                        {fail && fail!=="load" && (
                            <Alert key='danger' variant='danger'>
                                {fail}
                            </Alert>
                            
                        )}
                        
                        <Input {...email_validation} type="email" name="email"
                        label="Email" className="form-control  ps-3" id="email"
                        placeholder="Write Your Email" style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}/>
                        
                        <Input {...name_validation} type="text" name="username"
                        label="Username" className="form-control  ps-3" id="username"
                        placeholder="Write a unique identifier" style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}/>

                        <Input {...password_validation} type="password" name="password" label = "Password" className="form-control shadow-none ps-3"
                        id="password" style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                        placeholder="Write Your Password"/>
                        
                        <div className="mt-4 pt-2">
                            <button style={{ width: "100%", height:'56px', borderRadius:'16px'}} 
                                type="submit" className="btn bg-primary text-white p-2 fw-semibold fs-4" onClick={onSubmit}>
                            {fail==="load"?<><span class="spinner-border 
                            spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...</>:<>Create Account</>}
                            </button>
                        </div>

                        <p className="text-center mt-5">Already have an account? <Link to="/register/login" className='text-primary' style={{ textDecoration: "none" }}>Login</Link></p>

                    </form>
                    </FormProvider>

                </div>
            </div>

        </div>
        </section>

        );
    };

export default Signup;



