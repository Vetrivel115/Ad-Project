import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');

    console.log('JWT Token:', token);

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const getAll = async (page = 0, size = 10) => {
    const response = await axios.get(
        `${BASE_URL}/vehicles?page=${page}&size=${size}`,
        getAuthHeaders()
    );

    return response.data;
};

const getAvailable = async () => {
    const response = await axios.get(
        `${BASE_URL}/vehicles/available`,
        getAuthHeaders()
    );

    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(
        `${BASE_URL}/vehicles/${id}`,
        getAuthHeaders()
    );

    return response.data;
};

const create = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/vehicles`,
        data,
        getAuthHeaders()
    );

    return response.data;
};

const update = async (id, data) => {
    const response = await axios.put(
        `${BASE_URL}/vehicles/${id}`,
        data,
        getAuthHeaders()
    );

    return response.data;
};

const remove = async (id) => {
    const response = await axios.delete(
        `${BASE_URL}/vehicles/${id}`,
        getAuthHeaders()
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