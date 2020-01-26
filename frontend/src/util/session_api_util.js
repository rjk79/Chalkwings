import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else { //when user logs out or token expires
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const signup = (userData) => {
    return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
    return axios.post('/api/users/login', userData);
};