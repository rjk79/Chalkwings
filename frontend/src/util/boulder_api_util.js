import axios from 'axios';

export const getBoulders = () => {
    return axios.get('/api/boulders')
};

export const getUserBoulders = id => {
    return axios.get(`/api/boulders/user/${id}`)
};

export const writeBoulder = data => {
    return axios.post('/api/boulders/', data)
}