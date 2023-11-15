import React from "react";
import { Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader"
import '../register.css'



export default function RegisterPagesRouter () {
    return ( 
        <div className="registeration">
            <Outlet />
        </div>
    );
}
