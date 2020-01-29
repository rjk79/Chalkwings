import * as TeamAPIUtil from '../util/team_api_util'

export const RECEIVE_TEAM = "RECEIVE_TEAM";


export const receiveTeam = ({team, members}) => ({
    type: RECEIVE_TEAM,
    team,
    members
});


export const fetchTeam = id => dispatch => (
    TeamAPIUtil.getTeam(id)
        .then(res => {
            
            dispatch(receiveTeam(res.data))})
        .catch(err => console.log(err))
);