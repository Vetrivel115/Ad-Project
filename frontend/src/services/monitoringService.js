import api from './api';

const getLiveFleet = async () => {
    const response = await api.get(
        '/monitoring/live'
    );

    return response.data;
};

export default {
    getLiveFleet
};