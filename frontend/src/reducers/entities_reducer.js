import { combineReducers } from 'redux';
import boulders from './boulders_reducer'
import ropes from './ropes_reducer'
import users from './users_reducer'

export default combineReducers({
    boulders,
    ropes,
    users
})