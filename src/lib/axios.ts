import { envVars } from '@/config/env.config';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: envVars.baseUrl,
    withCredentials: true
})

axiosInstance.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
})

// let isRefreshing = false;

// let pendingQueue: {
//     resolve: (value: unknown) => void
//     reject: (value: unknown) => void    
// }[] = [];

// const proccessQueue = (error: unknown) => {
//     pendingQueue.forEach(promise => {
//         if(error) {
//             promise.reject(error);
//         } else {
//             promise.resolve(null);
//         }
//     })

//     pendingQueue = [];
// }

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // if(isRefreshing) {
        //     return new Promise((resolve, reject) => {
        //         pendingQueue.push({resolve, reject})
        //     }).then(() => axiosInstance(originalRequest))
        //     .catch(error => Promise.reject(error))
        // }

        if(error.status === 500 && error.response.data.message === 'jwt expired' && !originalRequest._retry) {
            originalRequest._retry = true;
            // isRefreshing = true;
           try {
            const res = await axiosInstance.post("/auth/refresh-token");
            console.log("token retrived", res);
            
            // proccessQueue(null);
            
            return axiosInstance(originalRequest);
           } catch (error) {
            console.log(error);
            // proccessQueue(error);
            return Promise.reject(error);
           }
        //     finally {
        //     isRefreshing = false;
        //    }
        }


        return Promise.reject(error);
    }
)