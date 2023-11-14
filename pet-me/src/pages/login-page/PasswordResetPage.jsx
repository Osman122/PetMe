import logo from '../../assets/images/Logo.png'
import emailsent from '../../assets/images/emailsent.png'

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { axiosInstance } from '../../api/config';
import Alert from 'react-bootstrap/Alert';
import { Input } from '../../components/form'

import {
    email_validation,
  } from '../../utils/inputValidations';

const PasswordResetPage = () => {
    const methods = useForm()
    const [fail, setFail] = useState(false)
    const navigate = useNavigate();
    const {synced} = useSelector(state => state.currentUser)

    useEffect(()=>{
        if (synced){navigate('/')}
    },[])

    const onSubmit = methods.handleSubmit(data => {
        document.querySelector('button.reset').innerHTML = `  <span class="spinner-border 
        spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...`

        axiosInstance.post(`/accounts/users/reset_password/`,data).then(res => {
              methods.reset()
              setFail(false)
              document.querySelector('form.reset-form').innerHTML = `<div class="alert alert-success" role="alert">
                Password Reset Link was sent successfully!</div>`
  
          }).catch((err)=>{
            document.querySelector('button.reset').innerHTML = 'Send Password Reset Link!'

            if (err.response.status === 403) {
              setFail("Already sent! Try again later.")
            } else {
                setFail(Object.values(err.response.data))
            }
            setTimeout(()=>{setFail(false)},3000)
          })
      })

    return <>
        <div className="container">
            <div className="midscreen">
                <div className='d-flex flex-column align-items-center p-5' style={{color:"#8c594d"}}>
                    <img src={logo} alt='logo' style={{height:"40px"}}/>
                    <img src={emailsent} alt='emailsent' style={{height:"300px"}}/>

                    <FormProvider {...methods}>
                    <form className="reset-form" onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                        <div className="text-center mb-4 mt-5">
                        </div>
                        {fail && (
                            <>{fail.map((error)=>{
                                    return <Alert key='danger' variant='danger'>
                                        {error}
                                    </Alert>
                                })}</>
                            
                        )}
                        <div className="form-group mt-4">
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
                        </div>
                        <div className="mt-3">
                            <button style={{ width: "100%", backgroundColor: "#BF7245" }} 
                                type="button" className="btn text-white reset fs-5 px-5" onClick={onSubmit}>
                            Send Password Reset Link!
                            </button>

                        </div>

                    </form>
                </FormProvider>
                </div>
                

            </div>
        </div>
    </>
}

export default PasswordResetPage;