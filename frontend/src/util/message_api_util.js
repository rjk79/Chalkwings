import axios from 'axios';

export const getMessages = () => {
    return axios.get('/api/messages')
};

export const writeMessage = data => {
    return axios.post('/api/messages/', data)
}