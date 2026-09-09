import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';


const getAuthConfig = () => {

    const token =
        localStorage.getItem('token');

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


const getLiveFleet = async () => {

    const response = await axios.get(
        `${BASE_URL}/monitoring/live`,
        getAuthConfig()
    );

    return response.data;
};


export default {
    getLiveFleet
};