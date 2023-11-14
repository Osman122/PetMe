import logo from '../../assets/images/Logo.png'

import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { axiosInstance } from '../../api/config';

const ActivateMailPage = () => {
    const { uid, token } = useParams();
    const [ error, setError ] = useState("Activating ...")
    const {synced} = useSelector(state => state.currentUser)
    const navigate = useNavigate();

    useEffect(()=>{
        if (synced){navigate('/')}
        if (uid && token){
            axiosInstance.post(`/accounts/users/activation/`,{'uid':uid,'token':token}).then(res => {
                navigate('/signup/mailactivated')
            }).catch((err)=>{
                setError("Something went wrong! Redirecting You...")
                setTimeout(()=>{navigate('/login')},3000)
                
            })
        }
    },[])

    return <>
        <div className="container">
            <div className="midscreen">
                <div className='d-flex flex-column align-items-center justify-content-around p-5' style={{color:"#8c594d"}}>
                    <img src={logo} alt='logo' style={{height:"40px"}}/>
                    <Spinner animation="border" variant="dark" className="redirecting-spinner my-5" />
                    <h1>{error}</h1>
                </div>
                

            </div>
        </div>
    </>
}

export default ActivateMailPage;