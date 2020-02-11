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

export const getChallenges = id => {
    return axios.get(`/api/teams/${id}/challenges`)
};


export const searchTeams = query => {
    return axios.get(`/api/teams/search/${query}`)
};

export const getWeekBoulders = id => {
    return axios.get(`/api/teams/${id}/weekboulders`)
}
export const getWeekRopes = id => {
    return axios.get(`/api/teams/${id}/weekropes`)
}

export const deleteTeam = id => {
    return axios.delete(`/api/teams/${id}`)
}

export const updateTeam = data => {
    return axios.patch(`/api/teams/${data._id}`, data)
}

