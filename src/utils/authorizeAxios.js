import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatter';
import { logoutUserAPI } from '~/redux/user/userSlice';
import { refreshTokenAPI } from '~/apis';

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

let axiosReduxStore;
export const injectStore = mainStore => { axiosReduxStore = mainStore; }

let refreshTokenPromise = null;

authorizedAxiosInstance.interceptors.response.use((response) => {
    // 
    interceptorLoadingElements(false);
    return response;
}, (error) => {

    interceptorLoadingElements(false);

    // Automation handle refresh token
    // 1: If received 401 from BE -> call logout API
    if(error.response?.status === 401){
        axiosReduxStore.dispatch(logoutUserAPI(false));
    }

    // 2: If received 410 from BE -> call refresh token api to refresh accessToken
    const originalRequests = error.config;
    if(error.response?.status === 410 && !originalRequests._retry){
        originalRequests._retry = true;
        if(!refreshTokenPromise) {
            refreshTokenPromise = refreshTokenAPI()
                .then(data => {
                    return data?.accessToken;
                })
                .catch((_error) => {
                    axiosReduxStore.dispatch(logoutUserAPI(false))
                    return Promise.reject(_error);
                })
                .finally(() => {
                    refreshTokenPromise = null;
                });
        }
        return refreshTokenPromise.then(accessToken => {
            // If our project need to save accessToken to localStorage or somewhere -> the code be there
            // Example:
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
            return authorizedAxiosInstance(originalRequests);
        })
    }
    

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