import api from './api';

const getTechnicians = async () => {

    const response = await api.get(
        '/users/technicians'
    );

    return response.data;
};

export default {
    getTechnicians
};