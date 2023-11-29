import qs from 'qs';
import Cookies from 'js-cookie';

import logo from '../../../assets/images/Logo.png'
import { axiosInstance } from '../../../api/config';
import {setCurrUser} from '../../../store/Slices/UserSlice'

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useSearchParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { Alert, Spinner } from 'react-bootstrap';

const SocialLoginAuth = () => {
    const { provider } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {synced} = useSelector(state => state.currentUser)

    const [query] = useSearchParams()
    const [fail, setFail] = useState(false)

    useEffect(()=>{

        const data = {'code':query.get('code'),'state':query.get('state')};

        axiosInstance.post(`/accounts/o/${provider}/`, qs.stringify(data), { headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then(res => {
            Cookies.set('access', res.data.access, { expires: 1})
            Cookies.set('refresh', res.data.refresh, { expires: 7})
            axiosInstance.get('/accounts/users/me/').then(res => {
                dispatch(setCurrUser(res.data))
                navigate('/')
            }).catch(e=>console.log(e))

            
        }).catch((err)=>{
            console.log(err)
            setFail("An error happened! Try again.")
        })
        

    },[synced])


    return <>
        <section>
            <div className="midscreen container d-flex justify-content-center align-items-center">
                <div className="register-card" style={{minHeight:"30vh", height:"30%"}}>
                    <div className="text-center mb-5">
                        <Link to="/" className="mx-auto my-3"><img src={logo} alt='logo' style={{height:"40px"}}/></Link>
                    </div>
                    {fail ? <> <Alert key='danger' variant='danger'>{fail}</Alert></>
                    :<><div className='d-flex justify-content-center'>
                    <h3 className='me-3 '>Redirecting you</h3> <Spinner animation="border" variant="dark" />
                    </div></>}
                </div>
            </div>
        </section>  
    </>
}

export default SocialLoginAuth;