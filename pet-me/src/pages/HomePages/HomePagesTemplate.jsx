import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import './home.css'

export default function HomePagesTemplate ()  {
    return ( 
        <>
        <Header />
        <div className="main">
            <Outlet/>
        </div>
        <Footer/> 
        </>
    );
}