import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import './home.css'
import NotificationContext from '../../Context/NotificationContext'

export default function HomePagesTemplate ()  {
    const [notifications, setNotifications] = useState(false)

    return ( 
        <>
        <NotificationContext.Provider value={{notifications, setNotifications}}>
            <Header />
            <div className="main ">
                <Outlet/>
            </div>
        </NotificationContext.Provider>

        {/* <Footer/>  */}
        </>
    );
}