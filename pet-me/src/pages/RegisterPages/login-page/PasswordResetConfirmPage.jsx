import logo from '../../../assets/images/Logo.png'
import emailsent from '../../../assets/images/emailsent.png'
import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {clearCurrUser} from '../../../store/Slices/UserSlice'

import { FormProvider, useForm } from 'react-hook-form'
import { axiosInstance } from '../../../api/config';
import Alert from 'react-bootstrap/Alert';
import { Input } from '../../../components/form'
import {
    password_validation,
} from '../../../utils/inputValidations';

const PasswordResetPage = () => {
    const { uid, token } = useParams();
    const dispatch = useDispatch()

    const methods = useForm();
    const [fail, setFail] = useState(false)
    const navigate = useNavigate();
    const {synced} = useSelector(state => state.currentUser)

    useEffect(()=>{
        if (synced){navigate('/')}
    },[synced])

    const onSubmit = methods.handleSubmit(data => {
        setFail('load')

        axiosInstance.post(`/accounts/users/reset_password_confirm/`,{...data,'uid':uid,'token':token}).then(res => {
              methods.reset()
              setFail(false)
              document.querySelector('form.reset-form').innerHTML = `<h3>Password Changed Successfully!</h3>
              <p className='text-center py-3'>You may now login using your new credentials.</p>`
              dispatch(clearCurrUser())

          }).catch((err)=>{
            console.log(err)
            setFail("An error happened! Try again.")

            setTimeout(()=>{setFail(false)},3000)
          })
          
      })

    return <>
        <section>
            <div className="midscreen container d-flex justify-content-center align-items-center">
                <div className="register-card" style={{minHeight:"60vh", height:"60vh"}}>
                    <div className="text-center">
                        <Link to="/" className="mx-auto my-3"><img src={logo} alt='logo' style={{height:"40px"}}/></Link>
                        <p className='fs-5 mt-3' style={{textTransform:'capitalize'}}>Enter a new password for your account</p>
                    </div>


                    <FormProvider {...methods}>
                    <form onSubmit={e => e.preventDefault()}
                    noValidate className='mt-3 position-relative reset-form'>
                        {fail && fail!=="load" && (
                            <Alert key='danger' variant='danger'>
                                {fail}
                            </Alert>
                            
                        )}

                        <Input 
                            {...password_validation}
                            type="password"
                            name="new_password"
                            label = "New Password"
                            className="form-control"
                            id="new_password"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                            placeholder="Enter a unique strong password"
                            />
                        <div className="mt-3"></div>
                        <Input 
                            {...password_validation}
                            type="password"
                            name="re_password"
                            label = "Confirm Password"
                            className="form-control"
                            id="re_password"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                            placeholder="Enter the same password as above"
                            {...methods.register("confirm_password", {
                                required: true,
                                validate: (val) => {
                                  if (methods.watch('new_password') !== val) {
                                    return "Your passwords do no match";
                                  }
                                },
                               })}
                            />
                        
                        <div className="mt-4 pt-2">
                            <button style={{ width: "100%", height:'56px', borderRadius:'16px'}} 
                                type="submit" className="btn bg-primary text-white p-2 fw-semibold fs-4" onClick={onSubmit}>
                            {fail==="load"?<><span class="spinner-border 
                            spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...</>:<>Change Password</>}
                            </button>
                        </div>

                        <p className="text-center mt-4">Back to <Link to="/register/login" className='text-primary' style={{ textDecoration: "none" }}>Login</Link> Page</p>

                    </form>
                    </FormProvider>

                </div>
            </div>
        </section>                
    </>
}

export default PasswordResetPage;