import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const login = async (credentials) => {
    const response = await axios.post(
        `${BASE_URL}/auth/login`,
        credentials
    );

    const data = response.data;

    if (data?.token) {
        localStorage.setItem(
            'user',
            JSON.stringify(data)
        );

        localStorage.setItem(
            'token',
            data.token
        );

        if (data.role) {
            localStorage.setItem(
                'role',
                data.role
            );
        }
    }

    return data;
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

export default {
    login,
    logout
};