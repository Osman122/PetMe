import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader/Loader"

// const RegisterPagesRouter =React.lazy(() => import('./RegisterPagesRouter'));
const HomeRouter =React.lazy(() => import('./HomeRouter'));
const RegisterPagesRouter =React.lazy(() => import('./RegisterPagesRouter'));

const Login =React.lazy(() => import('../pages/RegisterPages/login-page/Login'));
const Signup =React.lazy(() => import('../pages/RegisterPages/signup-page/Signup'));
const SignupSuccess =React.lazy(() => import('../pages/RegisterPages/signup-page/SignupSuccess'));
const ActivateMailPage =React.lazy(() => import('../pages/RegisterPages/signup-page/ActivateMailPage'));
const MailActivated =React.lazy(() => import('../pages/RegisterPages/signup-page/MailActivated'));
const PasswordResetPage =React.lazy(() => import('../pages/RegisterPages/login-page/PasswordResetPage'));
const PasswordResetConfirmPage =React.lazy(() => import('../pages/RegisterPages/login-page/PasswordResetConfirmPage'));
const ResendMail =React.lazy(() => import('../pages/RegisterPages/signup-page/ResendMail'));

const Home =React.lazy(() => import('../pages/home-page/Home'));
const About =React.lazy(() => import('../pages/about-page/About'));
const Explore =React.lazy(() => import('../pages/explore-page/Explore'));
const PetInfo =React.lazy(() => import('../pages/petinfo-page/PetInfo'));
const Profile =React.lazy(() => import('../pages/profile-page/Profile'));
const UserProfile =React.lazy(() => import('../pages/profile-page/user-profile'));
const Chat =React.lazy(() => import('../pages/Chat/Chat'));
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
            <Route path="register" element={<RegisterPagesRouter />}>
                <Route path="login" element={<Login />}/>
                <Route path="signup" element={<Signup />}/>
                <Route path="signup/success" element={<SignupSuccess />}/>
                <Route path="signup/resendmail" element={<ResendMail />}/>
                <Route path="signup/mailactivated" element={<MailActivated />}/>
                <Route path="accounts/users/activate/:uid/:token" element={<ActivateMailPage />}/>
                <Route path="password-reset" element={<PasswordResetPage />}/>
                <Route path="password-reset/:uid/:token" element={<PasswordResetConfirmPage />}/>
            </Route>

            <Route path="" element={<HomeRouter />}>
                    {/* These pages are completely functional with api integration */}
                    <Route path="explore" element={<Explore />}/>
                    {/*  */}

                    {/* Partially Done */}
                    <Route path="" element={<Home />}/>

                    {/* These pages are not */}
                    <Route path="about" element={<About />}/>
                    <Route path="petinfo" element={<PetInfo />}/>
                    <Route path="profile/:id" element={<Profile />}/>
                    <Route path="offers/:id" element={<Offer />}/>
                    <Route path="search" element={<SearchPage />}/>
                    <Route path="userprofile/:id" element={<UserProfile />}/>
                    <Route path="addoffer" element={<AddOffer />}/>
                    <Route path="addpet" element={<AddPet />}/>
                    <Route path="editpet/:id" element={<EditPet />}/>
                    <Route path="chats" element={<Chat />}/>
                    <Route path="*" element={<PageNotFound />}/>
            </Route>
        </Routes>
    </Suspense>
    );
}

export default Router;