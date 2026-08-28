import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const login = async (username, password) => {
    const response = await axios.post(
        `${API_URL}/auth/login`,
        {
            username,
            password
        }
    );

    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export default {
    login,
    logout
};