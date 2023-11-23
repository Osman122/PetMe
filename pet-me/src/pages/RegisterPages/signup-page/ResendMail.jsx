import logo from '../../../assets/images/Logo.png'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form'
import { axiosInstance } from '../../../api/config';
import Alert from 'react-bootstrap/Alert';
import { Input } from '../../../components/form'

import {
    email_validation,
  } from '../../../utils/inputValidations';

const ResendMail = () => {
    const methods = useForm()
    const [fail, setFail] = useState(false)
    const navigate = useNavigate();

    const onSubmit = methods.handleSubmit(data => {
        setFail("load")
        axiosInstance.post(`/accounts/users/resend_activation/`,data).then(res => {
            methods.reset()
            navigate('/register/signup/success')
        }).catch((err)=>{
            setFail("An error! Try again later.")
            setTimeout(()=>{setFail(false)},3000)
          })
      })

    return <>
        <section>
        <div className="midscreen container d-flex justify-content-center align-items-center">
            <div className="register-card" style={{minHeight:"30vh", height:"30%"}}>
                <div className="text-center">
                    <Link to="/" className="mx-auto my-3"><img src={logo} alt='logo' style={{height:"40px"}}/></Link>
                    <p className='fs-6 mt-3' style={{textTransform:'capitalize'}}>We'll send you and email with a link</p>
                </div>
                
                <FormProvider {...methods}>
                <form onSubmit={e => e.preventDefault()}
                noValidate className='mt-3 position-relative reset-form'>
                    {fail && fail !== "load" && (<>
                        <Alert key='danger' variant='danger'>
                            {fail}
                        </Alert>
                        <div className="pt-5"></div></>
                        
                    )}
                    
                    <Input  
                        {...email_validation}
                        type="email"
                        name="email"
                        label="Email address"
                        className="form-control"
                        id="email"
                        style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                        placeholder="Email"
                    />
                    
                    <div className="mt-4 pt-2">
                        <button style={{ width: "100%", height:'56px', borderRadius:'16px'}} 
                            type="submit" className="btn bg-primary text-white p-2 fw-semibold fs-4" onClick={onSubmit}>
                        {fail==="load"?<><span class="spinner-border 
                        spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...</>:<>Resend Email</>}
                        </button>
                    </div>


                </form>
                <p className="text-center mt-3">Back to <Link to="/register/login" className='text-primary' style={{ textDecoration: "none" }}>Login</Link> Page</p>

                </FormProvider>
            </div>
        </div>
        </section>     
    </>
}

export default ResendMail;