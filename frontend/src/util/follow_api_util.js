import axios from 'axios';

export const getUserFollowed = id => {
    return axios.get(`/api/follows/followed/user/${id}`)
};

export const getUserFollowers = id => {
    return axios.get(`/api/follows/followers/user/${id}`)
};

export const composeFollow = data => {
    return axios.post('/api/follows/', data)
}

export const deleteFollow = id => {
    return axios.delete(`/api/follows/${id}`)
}