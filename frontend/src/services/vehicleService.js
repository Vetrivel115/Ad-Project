import api from './api';

const getAll = async (page = 0, size = 10) => {
    const response = await api.get(
        `/vehicles?page=${page}&size=${size}`
    );

    return response.data;
};

const getAvailable = async () => {
    const response = await api.get(
        '/vehicles/available'
    );

    return response.data;
};

const getById = async (id) => {
    const response = await api.get(
        `/vehicles/${id}`
    );

    return response.data;
};

const create = async (data) => {
    const response = await api.post(
        '/vehicles',
        data
    );

    return response.data;
};

const update = async (id, data) => {
    const response = await api.put(
        `/vehicles/${id}`,
        data
    );

    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(
        `/vehicles/${id}`
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