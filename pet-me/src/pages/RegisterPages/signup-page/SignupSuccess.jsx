import logo from '../../../assets/images/Logo.png'
import emailsent from '../../../assets/images/emailsent.png'

import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignupSuccess = () => {
    const {synced} = useSelector(state => state.currentUser)
    const navigate = useNavigate();

    useEffect(()=>{
        if (synced){navigate('/')}
    },[])

    return <>
            <section>
        <div className="midscreen container d-flex justify-content-center align-items-center">
            <div className="register-card" style={{minHeight:"30vh", height:"30%"}}>
                <div className="text-center">
                    <Link to="/" className="mx-auto my-3"><img src={logo} alt='logo' style={{height:"40px"}}/></Link>
                </div>
                
                <div className='d-flex flex-column align-items-center p-3'>
                    <img src={emailsent} alt='emailsent' style={{height:"300px"}}/>
                    <h1>Check Your Inbox!</h1>
                    <p className='text-center py-3'>We have sent you a message with an activation link for your personal account. Do not share it with anyone</p>

                </div>
                <p className="text-center">Didn't get it? <Link to="/register/signup/resendmail" className='text-primary' style={{ textDecoration: "none" }}>Resend</Link></p>


            </div>
        </div>
        </section>  

    </>
}

export default SignupSuccess;