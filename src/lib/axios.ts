import { envVars } from '@/config/env.config';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? envVars.prodUrl : envVars.baseUrl,
    withCredentials: true
})

axiosInstance.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function(config) {
    return config;
}, function onReject(error) {
    return Promise.reject(error);
})