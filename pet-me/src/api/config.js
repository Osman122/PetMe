import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/'
})

axiosInstance.interceptors.request.use(function (config) {
    let access = Cookies.get('access')
    let refresh = Cookies.get('refresh')

    if (access) {
        config.headers['Authorization']="Bearer " + access

      } else if (refresh) {
        axiosInstance.post('/accounts/jwt/refresh/', {'refresh':refresh}).then((res)=>{
          Cookies.set('access', res.data.access, { expires: 1})
          config.headers['Authorization']="Bearer " + access
  
      }).catch(err => {console.log(err)})
      }
    
    return config;

}, function (error) {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use(function (response) {
    
    // Check if the response is saying that the cookie expired, then send request to refresh token
    // Check if response is 401 unauthorized, then redirect user to login page
    
    return response;
}, function (error) {
    if (error.response.status === 401) {
        document.getElementById("fail-auth").hidden = false;
        setTimeout(() => {
          document.getElementById("fail-auth").hidden = true;
        }, 3000);
    }
    return Promise.reject(error);
});