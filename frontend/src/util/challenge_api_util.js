import axios from 'axios';


export const createChallenge = data => {
    return axios.post('/api/challenges/', data)
}