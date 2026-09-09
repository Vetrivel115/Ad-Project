import api from './api';

const getAll = async () => {
    const response = await api.get('/maintenance');

    return response.data;
};

const log = async (data) => {
    const response = await api.post(
        '/maintenance',
        data
    );

    return response.data;
};

export default {
    getAll,
    log
};