import { getClimbs, getUserClimbs, writeClimb } from '../util/climb_api_util';

export const RECEIVE_CLIMBS = "RECEIVE_CLIMBS";
export const RECEIVE_USER_CLIMBS = "RECEIVE_USER_CLIMBS";
export const RECEIVE_NEW_CLIMB = "RECEIVE_NEW_CLIMB";

export const receiveClimbs = climbs => ({
    type: RECEIVE_CLIMBS,
    climbs
});

export const receiveUserClimbs = climbs => ({
    type: RECEIVE_USER_CLIMBS,
    climbs
});

export const receiveNewClimb = climb => ({
    type: RECEIVE_NEW_CLIMB,
    climb
})

export const fetchClimbs = () => dispatch => (
    getClimbs()
        .then(climbs => dispatch(receiveClimbs(climbs)))
        .catch(err => console.log(err))
);

export const fetchUserClimbs = id => dispatch => (
    getUserClimbs(id)
        .then(climbs => dispatch(receiveUserClimbs(climbs)))
        .catch(err => console.log(err))
);

export const composeClimb = data => dispatch => (
    writeClimb(data)
        .then(climb => dispatch(receiveNewClimb(climb)))
        .catch(err => console.log(err))
);