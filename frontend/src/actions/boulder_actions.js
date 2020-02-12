import { getBoulders, getUserBoulders, writeBoulder } from '../util/boulder_api_util';

export const RECEIVE_BOULDERS = "RECEIVE_BOULDERS";
export const RECEIVE_USER_BOULDERS = "RECEIVE_USER_BOULDERS";
export const RECEIVE_NEW_BOULDER = "RECEIVE_NEW_BOULDER";

export const receiveBoulders = boulders => ({
    type: RECEIVE_BOULDERS,
    boulders
});

export const receiveUserBoulders = boulders => ({
    type: RECEIVE_USER_BOULDERS,
    boulders
});

export const receiveNewBoulder = boulder => ({
    type: RECEIVE_NEW_BOULDER,
    boulder
})

export const fetchBoulders = () => dispatch => (
    getBoulders()
        .then(boulders => dispatch(receiveBoulders(boulders)))
        .catch(err => console.log(err))
);

export const fetchUserBoulders = id => dispatch => (
    getUserBoulders(id)
        .then(boulders => dispatch(receiveUserBoulders(boulders)))
        .catch(err => console.log(err))
);

export const composeBoulder = data => dispatch => {
    return (
    writeBoulder(data)
        .then(boulder => dispatch(receiveNewBoulder(boulder)))
        .catch(err => console.log(err))
)};


