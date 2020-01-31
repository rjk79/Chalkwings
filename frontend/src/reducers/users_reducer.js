import {RECEIVE_TEAM} from '../actions/team_actions'
import {merge} from 'lodash'

const UsersReducer = (state = {}, action) => {
    Object.freeze(state);
    // let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_TEAM:  
            return merge({}, state, action.members);
        default:
            return state;
    }
};

export default UsersReducer;
