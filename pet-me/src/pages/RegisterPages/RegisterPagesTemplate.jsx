import React from "react";
import { Outlet } from "react-router-dom";
import './register.css'

export default function RegisterPagesTemplate () {
    return ( 
        <div className="registeration">
            <Outlet />
        </div>
    );
}
