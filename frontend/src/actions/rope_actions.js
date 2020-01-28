import { getRopes, getUserRopes, writeRope } from '../util/rope_api_util';

export const RECEIVE_ROPES = "RECEIVE_ROPES";
export const RECEIVE_USER_ROPES = "RECEIVE_USER_ROPES";
export const RECEIVE_NEW_ROPE = "RECEIVE_NEW_ROPE";

export const receiveRopes = ropes => ({
    type: RECEIVE_ROPES,
    ropes
});

export const receiveUserRopes = ropes => ({
    type: RECEIVE_USER_ROPES,
    ropes
});

export const receiveNewRope = rope => ({
    type: RECEIVE_NEW_ROPE,
    rope
})

export const fetchRopes = () => dispatch => (
    getRopes()
        .then(ropes => dispatch(receiveRopes(ropes)))
        .catch(err => console.log(err))
);

export const fetchUserRopes = id => dispatch => (
    getUserRopes(id)
        .then(ropes => dispatch(receiveUserRopes(ropes)))
        .catch(err => console.log(err))
);

export const composeRope = data => dispatch => {
    return (
        writeRope(data)
            .then(rope => dispatch(receiveNewRope(rope)))
            .catch(err => console.log(err))
    )
};