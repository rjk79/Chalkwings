import { RECEIVE_CLIMBS, RECEIVE_USER_CLIMBS, RECEIVE_NEW_CLIMB } from '../actions/climb_actions';

const ClimbsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CLIMBS:
            newState.all = action.climbs.data;
            return newState;
        case RECEIVE_USER_CLIMBS:
            newState.user = action.climbs.data;
            return newState;
        case RECEIVE_NEW_CLIMB:
            newState.new = action.climb.data
            return newState;
        default:
            return state;
    }
};

export default ClimbsReducer;