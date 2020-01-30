import axios from 'axios';

export const getUsers = query => {
    return axios.get(`/api/users/search/${query}`)
};

export const getUser = id => {
    return axios.get(`/api/users/${id}`)
};

export const deleteUserBoulders = id => {
    return axios.delete(`/api/users/${id}/boulders`)
        .then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
        });
}
export const deleteUserRopes = id => {
    return axios.delete(`/api/users/${id}/ropes`)
        .then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
        });
}
