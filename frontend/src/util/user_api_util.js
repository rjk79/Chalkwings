import axios from 'axios';

export const getUsers = query => {
    return axios.get(`/api/users/search/${query}`)
};

export const getUser = id => {
    return axios.get(`/api/users/${id}`)
};
