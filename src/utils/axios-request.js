import axios from 'axios';
import Cookies from 'js-cookie';

const axiosRequest = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    timeout: 30000,
    signal: new AbortController().signal,
});

axiosRequest.interceptors.request.use((config) => {
    const token = Cookies.get('access_token') || null;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axiosRequest.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    throw error;
})

export default axiosRequest;