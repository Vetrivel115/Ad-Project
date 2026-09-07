import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getAvailable = async () => {
    const response = await axios.get(
        `${BASE_URL}/drivers/available`
    );

    return response.data;
};

export default {
    getAvailable
};