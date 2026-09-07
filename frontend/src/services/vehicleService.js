import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getAll = async (page = 0, size = 10) => {
    const response = await axios.get(
        `${BASE_URL}/vehicles?page=${page}&size=${size}`
    );

    return response.data;
};

const getAvailable = async () => {
    const response = await axios.get(
        `${BASE_URL}/vehicles/available`
    );

    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(
        `${BASE_URL}/vehicles/${id}`
    );

    return response.data;
};

const create = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/vehicles`,
        data
    );

    return response.data;
};

const update = async (id, data) => {
    const response = await axios.put(
        `${BASE_URL}/vehicles/${id}`,
        data
    );

    return response.data;
};

const remove = async (id) => {
    const response = await axios.delete(
        `${BASE_URL}/vehicles/${id}`
    );

    return response.data;
};

export default {
    getAll,
    getAvailable,
    getById,
    create,
    update,
    delete: remove
};