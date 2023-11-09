import { Route, Routes } from "react-router-dom";
import React from 'react';
import { Suspense } from "react";
import Loader from "../components/Loader/Loader"

// import Home from "../pages/home-page/Home";
// import Login from "../pages/login-page/Login";
// import About from "../pages/about-page/About";
// import Explore from "../pages/explore-page/Explore";
// import Signup from "../pages/signup-page/Signup";
// import PetInfo from "../pages/petinfo-page/PetInfo";
// import Profile from "../pages/profile-page/Profile";
// import PageNotFound from "../pages/notfound-page/PageNotFound";
// import Adopt from "../pages/Adopt-page/AdoptPage";

// Code Splitting
const Home =React.lazy(() => import('../pages/home-page/Home'));
const Login =React.lazy(() => import('../pages/login-page/Login'));
const About =React.lazy(() => import('../pages/about-page/About'));
const Explore =React.lazy(() => import('../pages/explore-page/Explore'));
const Signup =React.lazy(() => import('../pages/signup-page/Signup'));
const PetInfo =React.lazy(() => import('../pages/petinfo-page/PetInfo'));
const Profile =React.lazy(() => import('../pages/profile-page/Profile'));
const PageNotFound =React.lazy(() => import('../pages/notfound-page/PageNotFound'));
const Adopt =React.lazy(() => import('../pages/Adopt-page/AdoptPage'));

const Router = () => {
    return ( 
        <Suspense fallback={<Loader />}>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/explore" element={<Explore />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/petinfo" element={<PetInfo />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/adopt" element={<Adopt />}/>
            <Route path="/*" element={<PageNotFound />}/>

        </Routes>
        </Suspense>
    );
}

export default Router;