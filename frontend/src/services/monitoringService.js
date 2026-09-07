import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getLiveFleet = async () => {
    const response = await axios.get(
        `${BASE_URL}/monitoring/live`
    );

    return response.data;
};

export default {
    getLiveFleet
};