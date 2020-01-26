import axios from 'axios';

export const getClimbs = () => {
    return axios.get('/api/climbs')
};

export const getUserClimbs = id => {
    return axios.get(`/api/climbs/user/${id}`)
};

export const writeClimb = data => {
    return axios.post('/api/climbs/', data)
}