import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './register.css'
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function RegisterPagesTemplate () {
    const {synced} = useSelector(state => state.currentUser)
    const navigate = useNavigate()

    useEffect(()=>{
        if (synced){navigate('/')}
    },[])

    return ( 
        <div className="registeration">
            <Outlet />
        </div>
    );
}
