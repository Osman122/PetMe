import qs from 'qs';
import Cookies from 'js-cookie';

import logo from '../../../assets/images/Logo.png'

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

import { axiosInstance } from '../../../api/config';
import { useSearchParams } from 'react-router-dom';

import { Alert, Spinner } from 'react-bootstrap';

const SocialLoginAuth = () => {
    const { provider } = useParams();

    const navigate = useNavigate();
    const {synced} = useSelector(state => state.currentUser)

    const [query] = useSearchParams()
    const [fail, setFail] = useState(false)

    useEffect(()=>{
        if (synced){return navigate('/')}

        const data = {'code':query.get('code'),'state':query.get('state')};

        axiosInstance.post(`/accounts/o/${provider}/`, qs.stringify(data), { headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then(res => {
            Cookies.set('access', res.data.access, { expires: 1})
            Cookies.set('refresh', res.data.refresh, { expires: 7})
            navigate('/')
            
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