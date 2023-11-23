import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import './app.css'

import Router from "./router/Router";
import { Alert } from "react-bootstrap";
import Cookies from "js-cookie";
import { axiosInstance } from "./api/config";
import {useDispatch} from 'react-redux';
import {setCurrUser} from './store/Slices/UserSlice';
import { useEffect } from "react";

function App() {
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
      }).catch((err)=>{
        Cookies.remove('access')
        console.log(err)})

    } else if (refresh) {
      axiosInstance.post('/accounts/jwt/refresh/', {'refresh':refresh}).then((res)=>{
        Cookies.set('access', res.data.access, { expires: 1})
        authenticate()

    }).catch(err => {
      Cookies.remove('refresh')
      console.log(err)
    })}
  
  };

  useEffect(()=>{
    authenticate()
  })

  return (
    <BrowserRouter>

      <Router />

      <Alert id="fail" variant="danger" className="m-2 float" hidden={true}>
        <p>message</p>
      </Alert>
      <Alert id="success" variant="success" className="m-2 float" hidden={true}>
        <p>message</p>
      </Alert>
    </BrowserRouter>
  );
}

export default App;

// -----------------------------------------------