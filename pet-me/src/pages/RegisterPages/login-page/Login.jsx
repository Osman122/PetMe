import Cookies from 'js-cookie';
import Facebook from '../../../assets/images/Facebook.png'
import Github from '../../../assets/images/Github.png'
import Google from '../../../assets/images/Google.png'

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'

import Alert from 'react-bootstrap/Alert';

import { axiosInstance } from '../../../api/config';
import {setCurrUser} from '../../../store/Slices/UserSlice'
import { Input } from '../../../components/form'
import logo from '../../../assets/images/Logo.png'

import { useSearchParams } from 'react-router-dom';
import qs from 'qs';

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
    const [query] = useSearchParams()

    const socialAuth = (provider) => {
        let redirect = window.location.origin + `/register/social/complete/${provider}/`
        console.log(redirect)

        axiosInstance.get(`/accounts/o/${provider}/`,{ params: { redirect_uri: redirect } }).then((res)=>{
            window.open(res.data['authorization_url'],"_blank")
            setTimeout(()=>{
                let code = prompt("code")
                let state = prompt("state")
                
                const data = {'code':code,'state':state};
                const formBody = Object.keys(data).map(key=> encodeURIComponent(key)+'='+encodeURIComponent(data[key])).join('&')

                console.log(data)
                
                axiosInstance.post(`/accounts/o/${provider}/?${formBody}`, {
                    headers: { 'Content-Type':'application/x-www-form-urlencoded'}}).then(res => {
                    console.log(res)
                }).catch(error => console.log(error))
            },5000)
        }).catch(error => console.log(error))


        
    }

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
                    noValidate className='mt-4 py-2 position-relative'>
                        {fail && fail!=="load" && (
                            <Alert key='danger' variant='danger'>
                                {fail}
                            </Alert>
                            
                        )}
                        <Input  
                            {...email_validation}
                            type="email" name="email"
                            label="Email" className="form-control border-start-0 shadow-none ps-3"
                            id="email" placeholder="Write Your Email"
                            style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                        />
                        <Input 
                        {...password_validation}
                        type="password" name="password"
                        label = "Password" className="form-control shadow-none ps-3"
                        id="password" style={{ borderBottom: "1px solid #BF7245", width: "100%", color: "#BF7245" }}
                        placeholder="Write Your Password"
                        />
                        <div class="d-flex flex-row-reverse">
                            <Link className="mt-2 text-info" to="/register/password-reset" 
                            style={{ color: "#BF7245", textDecoration: "none" }}>Forgot Your Password?</Link>
                        </div>

                        <div className="mt-4 pt-2">
                            <button style={{ width: "100%", height:'56px', borderRadius:'16px'}} 
                                type="submit" className="btn bg-primary text-white login p-2 fw-semibold fs-4" onClick={onSubmit}>
                            {fail==="load"?<><span class="spinner-border 
                            spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...</>:<>Login</>}
                            </button>
                        </div>
                        <div class="divider d-flex align-items-center my-3">
                            <p class="text-center mx-3 mb-0">OR</p>
                        </div>
                        <div className="brands d-flex justify-content-center mb-3">
                            <img onClick={()=>socialAuth('facebook')} src={Facebook} alt="Facebook" />
                            <img className='mx-3' onClick={()=>socialAuth('github')} src={Github} alt="Github" />
                            <img onClick={()=>socialAuth('google-oauth2')} src={Google} alt="Google" />
                        </div>

                        <p className="text-center ">Don't have an account? <Link to="/register/signup" className='text-primary' style={{ textDecoration: "none" }}>Signup</Link></p>

                    </form>
                    </FormProvider>

                </div>
            </div>

        </div>
        </section>

        );
    };

export default Login;