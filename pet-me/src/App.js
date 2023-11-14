import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import './app.css'

import Router from "./router/Router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { axiosInstance } from './api/config';
import Cookies from "js-cookie";
import {useSelector, useDispatch} from 'react-redux'
import {setCurrUser} from './store/Slices/UserSlice'
import { Alert } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const {currentUser, synced} = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const authenticate = () => {
    let access = Cookies.get('access')
    let refresh = Cookies.get('refresh')

    if (access) {
      axiosInstance.get('/accounts/users/me/',  {
        headers: {
            'Authorization': 'JWT '+access,
        }}).then(res => {
          dispatch(setCurrUser(res.data))
          document.getElementById("success-auth").hidden = false;
          setTimeout(() => {
            document.getElementById("success-auth").hidden = true;
          }, 3000);

      }).catch((err)=>{
              console.log(err)
      })
    } else if (refresh) {
      axiosInstance.post('/accounts/jwt/refresh/', {'refresh':refresh}).then((res)=>{
        Cookies.set('access', res.data.access, { expires: 1})
        authenticate()

    }).catch(err => {console.log(err)})
    }
   
  };

  useEffect(() => {
      authenticate();
    }, []);

  return (
    <BrowserRouter>
      <Header />

      <Router />
      <Alert id="success-auth" variant="success" className="m-2" hidden={true}>
          Welcome back {currentUser.username}! You're logged in!
      </Alert>
      <Alert id="fail-auth" variant="danger" className="m-2" hidden={true} dismissible>
          You need to be <Link to="/login">logged in</Link> to perform this action
      </Alert>
      <Footer/> 
      
    </BrowserRouter>
  );
}

export default App;
