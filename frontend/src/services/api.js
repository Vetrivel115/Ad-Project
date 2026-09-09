import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

if (
    api &&
    api.interceptors &&
    api.interceptors.request
) {
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');

            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}

export default api;