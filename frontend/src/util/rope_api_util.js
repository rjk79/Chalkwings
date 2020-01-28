import axios from 'axios';

export const getRopes = () => {
    return axios.get('/api/ropes')
};

export const getUserRopes = id => {
    return axios.get(`/api/ropes/user/${id}`)
};

export const writeRope = data => {
    return axios.post('/api/ropes/', data)
}