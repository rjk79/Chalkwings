import { combineReducers } from 'redux';
import boulders from './boulders_reducer'
import ropes from './ropes_reducer'
import sports from './sports_reducer'
import users from './users_reducer'
import teams from './teams_reducer'

export default combineReducers({
    boulders,
    ropes,
    sports,
    users,
    teams,
})