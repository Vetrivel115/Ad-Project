import api from './api';


const getAvailable = async () => {

    const response = await api.get(
        '/drivers/available'
    );

    return response.data;

};


export default {
    getAvailable
};