import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getAll = async () => {
    const response = await axios.get(
        `${BASE_URL}/maintenance`
    );

    return response.data;
};

const log = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/maintenance/log`,
        data
    );

    return response.data;
};

export default {
    getAll,
    log
};