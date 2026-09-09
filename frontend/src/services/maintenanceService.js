import api from './api';


const getAll = async () => {

    const response = await api.get(
        '/maintenance'
    );

    return response.data;
};


const create = async (data) => {

    const response = await api.post(
        '/maintenance',
        data
    );

    return response.data;
};


export default {
    getAll,
    create
};