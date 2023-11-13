import { Route, Routes } from "react-router-dom";
import React from 'react';
import { Suspense } from "react";
import Loader from "../components/Loader/Loader"
import ForgotPasswordPage from "../pages/forget-passowrd-page/ForgetPass";

// Code Splitting
const Home =React.lazy(() => import('../pages/home-page/Home'));
const Login =React.lazy(() => import('../pages/login-page/Login'));
const About =React.lazy(() => import('../pages/about-page/About'));
const Explore =React.lazy(() => import('../pages/explore-page/Explore'));
const Signup =React.lazy(() => import('../pages/signup-page/Signup'));
const PetInfo =React.lazy(() => import('../pages/petinfo-page/PetInfo'));
const Profile =React.lazy(() => import('../pages/profile-page/Profile'));
const PageNotFound =React.lazy(() => import('../pages/notfound-page/PageNotFound'));
const Offer =React.lazy(() => import('../pages/Offer-page/OfferPage'));
const AddOffer =React.lazy(() => import('../pages/addoffer-page/Addoffer'));
const AddPet =React.lazy(() => import('../pages/addpet-page/Addpet'));
const EditPet =React.lazy(() => import('../pages/editpet-page/Editpet'));
const SearchPage =React.lazy(() => import('../pages/search-page/Search.jsx'));

const Router = () => {
    return ( 
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* These pages are completely functional with api integration */}
                <Route path="/explore" element={<Explore />}/>
                <Route path="/login" element={<Login />}/>

                {/* Partially Done */}
                <Route path="/" element={<Home />}/>

                {/* These pages are not */}

                <Route path="/about" element={<About />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/petinfo" element={<PetInfo />}/>
                <Route path="/profile/:id" element={<Profile />}/>
                <Route path="/offers/:id" element={<Offer />}/>
                <Route path="/search" element={<SearchPage />}/>
                {/* <Route path="/posts/:id" element={<PostPage />}/> */}
                {/* <Route path="/chats" element={<Adopt />}/> */}
                
                <Route path="/addoffer" element={<AddOffer />}/>
                <Route path="/addpet" element={<AddPet />}/>
                <Route path="/editpet" element={<EditPet />}/>
                <Route path="/forgotpass" element={<ForgotPasswordPage />}/>
                <Route path="/*" element={<PageNotFound />}/>

            </Routes>
        </Suspense>
    );
}

export default Router;