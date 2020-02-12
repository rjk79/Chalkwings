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
export const deleteUserSports = id => {
    return axios.delete(`/api/users/${id}/sports`)
        .then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
        });
}

export const getWeekBoulders = id => {
    return axios.get(`/api/users/${id}/weekboulders`)
}
export const getWeekRopes = id => {
    return axios.get(`/api/users/${id}/weekropes`)
}

export const updatePhoto = (id, formData, config) => {
    return axios.post(`/api/users/${id}/photo`, formData, config)
}

export const getPhoto = id => {
    return axios.get(`/api/users/${id}/photo`)
}