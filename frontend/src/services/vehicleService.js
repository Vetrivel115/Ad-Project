import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';


const getAuthConfig = () => {

    const token = localStorage.getItem('token');

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


const getAll = async (page = 0, size = 10) => {

    const response = await axios.get(
        `${BASE_URL}/vehicles?page=${page}&size=${size}`,
        getAuthConfig()
    );

    return response.data;
};


const getAvailable = async () => {

    const response = await axios.get(
        `${BASE_URL}/vehicles/available`,
        getAuthConfig()
    );

    return response.data;
};


const getById = async (id) => {

    const response = await axios.get(
        `${BASE_URL}/vehicles/${id}`,
        getAuthConfig()
    );

    return response.data;
};


const create = async (data) => {

    const response = await axios.post(
        `${BASE_URL}/vehicles`,
        data,
        getAuthConfig()
    );

    return response.data;
};


const update = async (id, data) => {

    const response = await axios.put(
        `${BASE_URL}/vehicles/${id}`,
        data,
        getAuthConfig()
    );

    return response.data;
};


const remove = async (id) => {

    const response = await axios.delete(
        `${BASE_URL}/vehicles/${id}`,
        getAuthConfig()
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