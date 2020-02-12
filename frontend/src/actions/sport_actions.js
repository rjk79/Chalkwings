import { getSports, getUserSports, writeSport } from '../util/sport_api_util';

export const RECEIVE_SPORTS = "RECEIVE_SPORTS";
export const RECEIVE_USER_SPORTS = "RECEIVE_USER_SPORTS";
export const RECEIVE_NEW_SPORT = "RECEIVE_NEW_SPORT";

export const receiveSports = sports => ({
    type: RECEIVE_SPORTS,
    sports
});

export const receiveUserSports = sports => ({
    type: RECEIVE_USER_SPORTS,
    sports
});

export const receiveNewSport = sport => ({
    type: RECEIVE_NEW_SPORT,
    sport
})

export const fetchSports = () => dispatch => (
    getSports()
        .then(sports => dispatch(receiveSports(sports)))
        .catch(err => console.log(err))
);

export const fetchUserSports = id => dispatch => (
    getUserSports(id)
        .then(sports => dispatch(receiveUserSports(sports)))
        .catch(err => console.log(err))
);

export const composeSport = data => dispatch => {
    return (
        writeSport(data)
            .then(sport => dispatch(receiveNewSport(sport)))
            .catch(err => console.log(err))
    )
};