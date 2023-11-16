import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader/Loader"
// import { ChatProvider } from "../pages/HomePages/Chat/ChatProvider.jsx";

const RegisterPagesTemplate =React.lazy(() => import('../pages/RegisterPages/RegisterPagesTemplate'));
const HomePagesTemplate =React.lazy(() => import('../pages/HomePages/HomePagesTemplate'));

const Login =React.lazy(() => import('../pages/RegisterPages/login-page/Login'));
const SocialLoginAuth =React.lazy(() => import('../pages/RegisterPages/login-page/SocialLoginAuth'));
const Signup =React.lazy(() => import('../pages/RegisterPages/signup-page/Signup'));
const SignupSuccess =React.lazy(() => import('../pages/RegisterPages/signup-page/SignupSuccess'));
const ActivateMailPage =React.lazy(() => import('../pages/RegisterPages/signup-page/ActivateMailPage'));
const PasswordResetPage =React.lazy(() => import('../pages/RegisterPages/login-page/PasswordResetPage'));
const PasswordResetConfirmPage =React.lazy(() => import('../pages/RegisterPages/login-page/PasswordResetConfirmPage'));
const ResendMail =React.lazy(() => import('../pages/RegisterPages/signup-page/ResendMail'));

const Home =React.lazy(() => import('../pages/HomePages/home-page/Home'));
const About =React.lazy(() => import('../pages/HomePages/about-page/About'));
const Blog =React.lazy(() => import('../pages/HomePages/blog-page/Blog'));
const Explore =React.lazy(() => import('../pages/HomePages/explore-page/Explore'));
const PetInfo =React.lazy(() => import('../pages/HomePages/petinfo-page/PetInfo'));
const Profile =React.lazy(() => import('../pages/HomePages/profile-page/Profile'));
const UserProfile =React.lazy(() => import('../pages/HomePages/profile-page/user-profile'));
const Chat =React.lazy(() => import('../pages/HomePages/Chat/Chat'));
const PageNotFound =React.lazy(() => import('../pages/HomePages/notfound-page/PageNotFound'));
const Offer =React.lazy(() => import('../pages/HomePages/Offer-page/OfferPage'));
const AddOffer =React.lazy(() => import('../pages/HomePages/addoffer-page/Addoffer'));
const AddPet =React.lazy(() => import('../pages/HomePages/addpet-page/Addpet'));
const EditPet =React.lazy(() => import('../pages/HomePages/editpet-page/Editpet'));
const SearchPage =React.lazy(() => import('../pages/HomePages/search-page/Search.jsx'));

const Router = () => {
    return ( 
    <Suspense fallback={<Loader />}>
        <Routes>
            <Route path="register" element={<RegisterPagesTemplate />}>
                <Route path="login" element={<Login />}/>
                <Route path="social/complete/:provider" element={<SocialLoginAuth />}/>
                <Route path="signup" element={<Signup />}/>
                <Route path="signup/success" element={<SignupSuccess />}/>
                <Route path="signup/resendmail" element={<ResendMail />}/>
                <Route path="activate/:uid/:token" element={<ActivateMailPage />}/>
                <Route path="password-reset" element={<PasswordResetPage />}/>
                <Route path="password-reset/:uid/:token" element={<PasswordResetConfirmPage />}/>
            </Route>

            <Route path="/" element={<HomePagesTemplate />}>
                <Route index={true} element={<Home />}/>
                <Route path="explore" element={<Explore />}/>
                <Route path="blog" element={<Blog />}/>
                <Route path="about" element={<About />}/>
                <Route path="petinfo/:id" element={<PetInfo />}/>
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