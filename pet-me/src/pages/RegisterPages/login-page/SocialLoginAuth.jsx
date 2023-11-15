import qs from 'qs';
import Cookies from 'js-cookie';

import logo from '../../../assets/images/Logo.png'

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

import { axiosInstance } from '../../../api/config';
import { useSearchParams } from 'react-router-dom';

const SocialLoginAuth = () => {
    const { provider } = useParams();

    const dispatch = useDispatch()

    const navigate = useNavigate();
    const {synced} = useSelector(state => state.currentUser)

    const [query] = useSearchParams()

    useEffect(()=>{
        if (synced){return navigate('/')}

        const data = {'code':query.get('code'),'state':query.get('state')};

        console.log(data)
        axiosInstance.post(`/accounts/o/${provider}/`, qs.stringify(data), { headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then(res => {
            console.log(res)
    
        }).catch((err)=>{
          console.log(err)
        })
        

    },[synced])


    return <>
        <div className="container">
            <div className="midscreen">
                <div className='d-flex flex-column align-items-center justify-content-around p-5' style={{color:"#8c594d"}}>
                    <img src={logo} alt='logo' style={{height:"40px"}}/>
                    <h3>Mail Activated Successfully!</h3>
                    <p className='text-center py-3'>Your mail is now activated! You may now login.</p>
                    <Link to="/login" className="login-button fs-5 px-5">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default SocialLoginAuth;