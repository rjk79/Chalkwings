import {
    getUserFollowed,
    getUserFollowers,
    composeFollow,
    destroyFollow
} from '../util/follow_api_util'

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const RECEIVE_USER_FOLLOWERS = "RECEIVE_USER_FOLLOWERS";
export const RECEIVE_USER_FOLLOWED = "RECEIVE_USER_FOLLOWED";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

export const receiveUserFollowers = followers => ({
    type: RECEIVE_USER_FOLLOWERS,
    followers
});

export const receiveUserFollowed = followed => ({
    type: RECEIVE_USER_FOLLOWED,
    followed
})
export const receiveFollow = follow => ({
    type: RECEIVE_FOLLOW,
    follow
});

export const removeFollow = id => ({
    type: REMOVE_FOLLOW,
    id
})

export const fetchUserFollowers = () => dispatch => (
    getUserFollowers()
        .then(followers => dispatch(receiveUserFollowers(followers)))
        .catch(err => console.log(err))
);

export const fetchUserFollowed = () => dispatch => (
    getUserFollowed()
        .then(followers => dispatch(receiveUserFollowed(followers)))
        .catch(err => console.log(err))
);

export const createFollow = data => dispatch => {
    return (
        composeFollow(data)
            .then(boulder => dispatch(receiveNewBoulder(boulder)))
            .catch(err => console.log(err))
    )
};

export const destroyFollow = data => dispatch => {
    return (
        deleteFollow(data)
            .then(id => dispatch(removeFollow(id)))
            .catch(err => console.log(err))
    )
}


