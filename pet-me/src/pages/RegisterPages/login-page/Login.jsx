import Cookies from 'js-cookie';

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'

import Alert from 'react-bootstrap/Alert';

import { axiosInstance } from '../../../api/config';
import {setCurrUser} from '../../../store/Slices/UserSlice'
import { Input } from '../../../components/form'
import logo from '../../../assets/images/Logo.png'


import {
  email_validation,
  password_validation,
} from '../../../utils/inputValidations';

const Login = () => {
    const methods = useForm()
    const [fail, setFail] = useState(false)
    const navigate = useNavigate();
    const {synced} = useSelector(state => state.currentUser)

    const dispatch = useDispatch()
  
    const fetchUserInfo = () => {
        axiosInstance.get('/accounts/users/me/').then(res => {
            dispatch(setCurrUser(res.data))
            navigate('/')
        })
    }

    const authenticate = (data) => {
        let access = Cookies.get('access')
        let refresh = Cookies.get('refresh')
        
        if (access) { return fetchUserInfo() } 
        else if (refresh) {
            axiosInstance.post('/accounts/jwt/refresh/', {'refresh':refresh}).then((res)=>{
            Cookies.set('access', res.data.access, { expires: 1})
            return fetchUserInfo()
            })} 
        else {
            axiosInstance.post(`/accounts/jwt/create/`,data).then(res => {
                Cookies.set('refresh', res.data.refresh, { expires: 7})
                Cookies.set('access', res.data.access, { expires: 1})
                methods.reset()
                setFail(false)
                return authenticate()

            }).catch((err)=>{
                if (err.response.status === 401) {
                    setFail("Credentials are incorrect.")
                }
                setTimeout(()=>{
                    setFail(false)
                },3000)

            })
        }
        
    };
  
    useEffect(()=>{
        if (synced){navigate('/')}
    },[])

    const onSubmit = methods.handleSubmit(data => {
        setFail("load")
        authenticate(data)
      })

    return (
        <div className="midscreen">    
                <div className="register-card">
                    <FormProvider {...methods}>
                    <form onSubmit={e => e.preventDefault()}
                    noValidate>
                        <div className="text-center">
                            <Link to="/" className="mx-auto my-3"><img src={logo} alt='logo' style={{height:"40px"}}/></Link>
                            <h1 className='my-3 pt-2'>Welcome to Pet.me</h1>
                            <p className="text-muted" style={{textTransform:'capitalize'}}>Find a new home for your pet</p>
                        </div>
                        {fail && fail!=="load" && (
                            <Alert key='danger' variant='danger'>
                                {fail}
                            </Alert>
                            
                        )}
                        <div className="form-group mt-4">

                        </div>
                        <Input  
                            {...email_validation}
                            type="email" name="email"
                            label="Email address" className="form-control border-start-0 shadow-none"
                            id="email" placeholder="Email"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                        />
                        <Input 
                        {...password_validation}
                        type="password" name="password"
                        label = "Password" className="form-control shadow-none"
                        id="password" style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                        placeholder="Password"
                        />
                        <p className="mt-2 text-center">Forgot password? <Link to="/password-reset" style={{ color: "#BF7245", textDecoration: "none" }}>Restore Password</Link></p>
                        <div className="mt-3">
                            <button style={{ width: "100%", backgroundColor: "#BF7245" }} 
                                type="submit" className="btn text-white login" onClick={onSubmit}>
                            {fail==="load"?<><span class="spinner-border 
                            spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...</>:<>Login</>}
                            </button>
                        </div>
                        <div class="divider d-flex align-items-center my-4">
                            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                        </div>

                        <p className="mt-4 text-center">Don't have an account? <Link to="/signup" style={{ color: "#BF7245", textDecoration: "none" }}>Signup</Link></p>

                    </form>
                    </FormProvider>

                </div>
        </div>

        );
    };

export default Login;



