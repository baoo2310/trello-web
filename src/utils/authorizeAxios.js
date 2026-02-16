import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatter';

// Init Axios (authorizedAxiosInstance) to custom and configuration.

let authorizedAxiosInstance = axios.create();

// Maxium waiting time of a request = 10 min
authorizedAxiosInstance.defaults.timeout = 1000*60*10;

// withCredentials: Allow axios auto send cookie in every request to BE
authorizedAxiosInstance.defaults.withCredentials = true;

/*
 * Configuration interceptors 
*/

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use((config) => {
    // Block spam click
    interceptorLoadingElements(true);
    return config;
}, (error) => {
    return Promise.reject(error);
});

authorizedAxiosInstance.interceptors.response.use((response) => {
    // 
    interceptorLoadingElements(false);
    return response;
}, (error) => {

    interceptorLoadingElements(false);

    let errorMessage = error?.message;
    if(error.response?.data?.message){
        errorMessage = error.response?.data?.message;
    }

    // Use toastify to display every error status code except of 410 - GONE 
    if(error.response?.status !== 410){
        toast.error(errorMessage);
    }

    return Promise.reject(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Every http status code outside 200-299 will be error here

    // Handle error notifications return from every API here

});

export default authorizedAxiosInstance;