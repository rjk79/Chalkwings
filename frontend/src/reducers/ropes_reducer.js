import { RECEIVE_ROPES, RECEIVE_USER_ROPES, RECEIVE_NEW_ROPE } from '../actions/rope_actions';
import {REMOVE_USER_ROPES} from '../actions/user_actions'


const RopesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ROPES:
            newState.all = action.ropes.data;
            return newState;
        case RECEIVE_USER_ROPES:
            newState.user = action.ropes.data;
            return newState;
        case RECEIVE_NEW_ROPE:
            newState.new = action.rope.data
            return newState;
        case REMOVE_USER_ROPES:
            newState.user = []
            return newState
        default:
            return state;
    }
};

export default RopesReducer;