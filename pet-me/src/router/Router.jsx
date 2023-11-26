import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader/Loader"

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
const Explore =React.lazy(() => import('../pages/HomePages/explore-page/Explore'));
const Blog =React.lazy(() => import('../pages/HomePages/blog-page/Blog'));
const SinglePost =React.lazy(() => import('../pages/HomePages/blog-page/SinglePost'));
const PetInfo =React.lazy(() => import('../pages/HomePages/petinfo-page/PetInfo'));
const EditProfile =React.lazy(() => import('../pages/HomePages/profile-page/EditProfile'));
const UserProfile =React.lazy(() => import('../pages/HomePages/profile-page/user-profile'));
const Chat =React.lazy(() => import('../pages/HomePages/Chat/Chat'));
const PageNotFound =React.lazy(() => import('../pages/HomePages/error-pages/PageNotFound'));
const Forbidden =React.lazy(() => import('../pages/HomePages/error-pages/Forbidden'));
const Offer =React.lazy(() => import('../pages/HomePages/Offer-page/OfferPage'));
const PetForm =React.lazy(() => import('../pages/HomePages/addpet-page/PetForm'));
const AdminPanel =React.lazy(() => import('../pages/HomePages/admin-panel/AdminPanel.jsx'));
const Forbidden =React.lazy(() => import('../pages/HomePages/admin-panel/Forbidden.jsx'));

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
                <Route path="offers/:id" element={<Offer />}/>
                <Route path="profile/edit" element={<EditProfile />}/>
                <Route path="addpet" element={<PetForm />}/>
                <Route path="editpet/:id" element={<PetForm />}/>
                <Route path="blog" element={<Blog />}/>
                <Route path="posts/:id" element={<SinglePost />} />
                <Route path="explore" element={<Explore />}/>
                <Route path="profile/:id" element={<UserProfile />}/>
                <Route path="chats" element={<Chat />}/>

                <Route path="about" element={<About />}/>
                <Route path="petinfo/:id" element={<PetInfo />}/>
                <Route path="admin-panel" element={<AdminPanel />}/>
                <Route path="forbidden" element={<Forbidden />}/>
                <Route path="*" element={<PageNotFound />}/>
            </Route>
        </Routes>
    </Suspense>
    );
}

export default Router;