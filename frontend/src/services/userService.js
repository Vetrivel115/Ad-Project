import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getTechnicians = async () => {
    const response = await axios.get(
        `${BASE_URL}/users/technicians`
    );

    return response.data;
};

export default {
    getTechnicians
};