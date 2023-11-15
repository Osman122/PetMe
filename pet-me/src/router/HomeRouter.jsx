import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import '../home.css'



const HomeRouter = () => {
    return ( 
        <>
        <Header />
        <Outlet />
        <Footer/> 
        </>
    );
}

export default HomeRouter;