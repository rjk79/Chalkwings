import axios from 'axios';

export const getSports = () => {
    return axios.get('/api/sports')
};

export const getUserSports = id => {
    return axios.get(`/api/sports/user/${id}`)
};

export const writeSport = data => {
    
    return axios.post('/api/sports/', data)
}