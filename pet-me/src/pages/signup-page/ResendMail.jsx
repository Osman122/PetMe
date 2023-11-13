import logo from '../../assets/images/Logo.png'
import emailsent from '../../assets/images/emailsent.png'

import { Link } from "react-router-dom";

const ResendMail = () => {
    return <>
        <div className="container">
            <div className="midscreen">
                <div className='d-flex flex-column align-items-center p-5' style={{color:"#8c594d"}}>
                    <img src={logo} alt='logo' style={{height:"40px"}}/>
                    <img src={emailsent} alt='emailsent' style={{height:"300px"}}/>
                    <h1>Check Your Inbox!</h1>
                    <p className='text-center py-3'>We have sent you a message with an activation link for your personal account. Do not share it with anyone</p>
                    <Link to="/signup/resendmail" className="login-button fs-5">
                        Resend Activation
                    </Link>
                </div>
                

            </div>
        </div>
    </>
}

export default ResendMail;