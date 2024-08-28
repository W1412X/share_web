import axios from 'axios';
//import { getCookie } from '@/utils/cookie';
const axiosInstance = axios.create({
    baseURL: 'https://api.com',//api基地址
    withCredentials: true //跨域请求时发送cookies
});
//添加请求头的参数
/*
axiosInstance.interceptors.request.use(config => {
    const tmp=getCookie('cookie')
    const token ='SSSSSSSSSSSSSSSSSSSSSSSSSSSS';
    console.log(tmp);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});*/
export default axiosInstance;