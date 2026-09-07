import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getAll = async () => {
    const response = await axios.get(
        `${BASE_URL}/trips`
    );

    return response.data;
};

const start = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/trips/start`,
        data
    );

    return response.data;
};

const end = async (id, distance) => {
    const response = await axios.put(
        `${BASE_URL}/trips/${id}/end`,
        { distance }
    );

    return response.data;
};

export default {
    getAll,
    start,
    end
};