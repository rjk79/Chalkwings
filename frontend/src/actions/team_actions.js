import * as TeamAPIUtil from '../util/team_api_util'

export const RECEIVE_TEAM = "RECEIVE_TEAM";
export const RECEIVE_TEAMS = "RECEIVE_TEAMS";
export const RECEIVE_TEAM_BOULDERS = "RECEIVE_TEAM_BOULDERS";
export const RECEIVE_TEAM_ROPES = "RECEIVE_TEAM_ROPES";
export const REMOVE_TEAM = "REMOVE_TEAM";


export const removeTeam = id => {
    return {
        type: REMOVE_TEAM,
        id
    }
}

export const receiveTeam = ({team, members}) => {
    
    return {
    type: RECEIVE_TEAM,
    team,
    members
}};

export const receiveTeams = teams => ({
    type: RECEIVE_TEAMS,
    teams,
});

export const receiveTeamBoulders = (boulders, id) => ({
    type: RECEIVE_TEAM_BOULDERS,
    boulders,
    id
});
export const receiveTeamRopes = (ropes, id) => ({
    type: RECEIVE_TEAM_ROPES,
    ropes,
    id
});


export const fetchTeams = () => dispatch => (
    TeamAPIUtil.getTeams()
        .then(res => {
            dispatch(receiveTeams(res.data))
        })
        .catch(err => console.log(err))
)


export const fetchTeam = id => dispatch => {
    
    return (
    TeamAPIUtil.getTeam(id)
        .then(res => {
            
            dispatch(receiveTeam(res.data))})
        .catch(err => console.log(err))
)};

export const fetchTeamBoulders = id => dispatch => (
    TeamAPIUtil.getWeekBoulders(id)
        .then(res => {
            dispatch(receiveTeamBoulders(res.data, id))
        })
        .catch(err => console.log(err))
)
export const fetchTeamRopes = id => dispatch => (
    TeamAPIUtil.getWeekRopes(id)
        .then(res => {
            dispatch(receiveTeamRopes(res.data, id))
        })
        .catch(err => console.log(err))
)

export const updateTeam = team => dispatch => {
    
    TeamAPIUtil.updateTeam(team)
        .then(res => {
            
            dispatch(receiveTeam({team: res.data}))
        })
        .catch(err => console.log(err))
}

export const deleteTeam = id => dispatch => {
    TeamAPIUtil.deleteTeam(id)
        .then(res => {
            
            dispatch(removeTeam(res.data._id))})
        .catch(err => console.log(err))

}

