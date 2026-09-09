import api from './api';

const getAll = async () => {
    const response = await api.get(
        '/trips'
    );

    return response.data;
};

const start = async (data) => {
    const response = await api.post(
        '/trips/start',
        data
    );

    return response.data;
};

const end = async (id, distance) => {
    const response = await api.put(
        `/trips/${id}/end`,
        {
            distanceCovered: distance
        }
    );

    return response.data;
};

export default {
    getAll,
    start,
    end
};