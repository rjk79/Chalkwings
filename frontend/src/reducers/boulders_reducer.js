import { RECEIVE_BOULDERS, RECEIVE_USER_BOULDERS, RECEIVE_NEW_BOULDER} from '../actions/boulder_actions';
import { REMOVE_USER_BOULDERS } from '../actions/user_actions';

const BouldersReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_BOULDERS:
            newState.all = action.boulders.data;
            return newState;
        case RECEIVE_USER_BOULDERS:
            newState.user = action.boulders.data;
            return newState;
        case RECEIVE_NEW_BOULDER:
            newState.new = action.boulder.data
            return newState;
        case REMOVE_USER_BOULDERS:
            newState.user = []
            return newState
        default:
            return state;
    }
};

export default BouldersReducer;