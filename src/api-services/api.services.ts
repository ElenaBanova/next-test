import axios from "axios";
import {getCookies} from "@/api-services/helper";


export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(async (reqObj) => {
    const token = await getCookies('accessToken');
    if (reqObj.method?.toUpperCase() === 'GET') {
        reqObj.headers.Authorization = 'Bearer ' + token;

    }
    return reqObj;
});




