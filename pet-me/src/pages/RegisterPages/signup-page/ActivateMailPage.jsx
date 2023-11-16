import logo from '../../../assets/images/Logo.png'

import {useSelector} from 'react-redux';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Alert, Spinner} from 'react-bootstrap';
import { axiosInstance } from '../../../api/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const ActivateMailPage = () => {
    const { uid, token } = useParams();
    const [fail, setFail] = useState(false)

    const {synced} = useSelector(state => state.currentUser)
    const navigate = useNavigate();

    useEffect(()=>{
        if (synced){navigate('/')}

        if (uid && token){
            axiosInstance.post(`/accounts/users/activation/`,{'uid':uid,'token':token}).then(res => {
                setTimeout(()=>{
                    navigate('/register/login')
                }, 3000)

            }).catch((err)=>{
                setFail("An error happened! Try again.")                
            })
        } else {
            setFail("An error happened! Try again.")
        }
    },[])

    return <>
        <section>
            <div className="midscreen container d-flex justify-content-center align-items-center">
                <div className="register-card" style={{minHeight:"30vh", height:"30%"}}>
                    <div className="text-center mb-3">
                        <Link to="/" className="mx-auto my-3"><img src={logo} alt='logo' style={{height:"40px"}}/></Link>
                        <p className='fs-5 mt-3' style={{textTransform:'capitalize'}}>Activating your email </p>
                    </div>
                    {fail ? <> <Alert key='danger' variant='danger'>{fail}</Alert></>
                    :<>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='position-relative mb-5'>
                            <FontAwesomeIcon className='position-absolute text-success' style={{
                                fontSize: "140px",
                                left: "50%",
                                top: "20%"
                            }} icon={faCheck} />

                            <FontAwesomeIcon style={{
                                fontSize: "140px",

                            }} icon={faEnvelope} />
                        </div>
                        <h3>Email Activated Successfully!</h3>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <h3 className='me-3 '>Redirecting you</h3> <Spinner animation="border" variant="dark" />
                    </div></>}
                </div>
            </div>
        </section>  
    </>
}

export default ActivateMailPage;