import logo from '../../../assets/images/Logo.png'
import emailsent from '../../../assets/images/emailsent.png'

import {useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const MailActivated = () => {
    const {synced} = useSelector(state => state.currentUser)
    const navigate = useNavigate();

    useEffect(()=>{
        if (synced){navigate('/')}
    },[])

    return <>
        <div className="container">
            <div className="midscreen">
                <div className='d-flex flex-column align-items-center justify-content-around p-5' style={{color:"#8c594d"}}>
                    <img src={logo} alt='logo' style={{height:"40px"}}/>
                    <img src={emailsent} alt='emailsent' style={{height:"300px"}}/>

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

export default MailActivated;