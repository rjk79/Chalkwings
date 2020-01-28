import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer'
import boulders from './boulders_reducer'
import ropes from './ropes_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    boulders,
    ropes,
});

export default RootReducer;