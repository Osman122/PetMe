import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/'
})

axiosInstance.interceptors.request.use(function (config) {
    let access = Cookies.get('access')
    let refresh = Cookies.get('refresh')
    console.log(config)
    
    if (access) {
        config.headers['Authorization']="Bearer " + access

      } else if ((refresh) && !(config.url === '/accounts/jwt/refresh/')) {
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
    return response;

}, function (error) {
    console.log(error)
    if ((error.response.status < 500) && !(error.config.url.includes('accounts'))) {
        document.getElementById("fail-auth").hidden = false;
        document.getElementById("fail-auth").innerText = error.response.data.detail
        setTimeout(() => {
            document.getElementById("fail-auth").hidden = true;
        }, 3000);
    }
    return Promise.reject(error);
});