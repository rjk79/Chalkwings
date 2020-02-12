import { RECEIVE_SPORTS, RECEIVE_USER_SPORTS, RECEIVE_NEW_SPORT } from '../actions/sport_actions';
import {REMOVE_USER_SPORTS} from '../actions/user_actions'

const SportsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_SPORTS:
            newState.all = action.sports.data;
            return newState;
        case RECEIVE_USER_SPORTS:
            newState.user = action.sports.data;
            return newState;
        case RECEIVE_NEW_SPORT:
            newState.new = action.sport.data
            return newState;
        case REMOVE_USER_SPORTS:
            newState.user = []
            return newState
        default:
            return state;
    }
};

export default SportsReducer;