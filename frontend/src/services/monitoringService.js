import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getLiveFleet = async () => {

    const token = localStorage.getItem('token');

    const response = await axios.get(
        `${BASE_URL}/monitoring/live`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export default {
    getLiveFleet
};