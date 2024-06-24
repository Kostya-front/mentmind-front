import axios  from "axios";
import {useAuthStore} from "@/features/auth/store";


const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true
})

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('accessToken')
    config.headers['authorization'] = `Bearer ${token}`
    return config
},   (error) => {
    return Promise.reject(error);
})
instance.interceptors.response.use((config) => {
    return config
},  async (error) => {
    const authStore = useAuthStore();
    const originalRequest = error.config

    if (error.response.status === 401 ) {
        const data = await instance.get('auth/refresh');
        // Обновление токена прошло успешно
        // Повторяем оригинальный запрос
        error.config.headers.authorization = `Bearer ${data.data.accessToken}`
        localStorage.setItem('accessToken', data.data.accessToken)
        return axios(originalRequest);
    }
    throw error;
})
export default instance