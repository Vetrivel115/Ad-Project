import axios from 'axios';

const getAll = async (page = 0, size = 10) => {
    const response = await axios.get(
        `/vehicles?page=${page}&size=${size}`
    );

    return response.data;
};

const getAvailable = async () => {
    const response = await axios.get('/vehicles/available');
    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`/vehicles/${id}`);
    return response.data;
};

const create = async (data) => {
    const response = await axios.post('/vehicles', data);
    return response.data;
};

const update = async (id, data) => {
    const response = await axios.put(`/vehicles/${id}`, data);
    return response.data;
};

const remove = async (id) => {
    const response = await axios.delete(`/vehicles/${id}`);
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