
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/'
})

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("REQUEST CONFIG",config)
    config.headers['Authorization'] = "TOEKEEEN SENT FROM INTERCEPTOR";
    
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use(function (response) {
    console.log("RESPONSE", response)
    // Check if the response is saying that the cookie expired, then send request to refresh token
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
});