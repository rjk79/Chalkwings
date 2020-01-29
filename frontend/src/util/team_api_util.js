import axios from 'axios';

export const getTeams = () => {
    return axios.get('/api/teams')
};

export const createTeam = data => {
    return axios.post('/api/teams/', data)
}

export const getTeam = id => {
    return axios.get(`/api/teams/${id}`)
};