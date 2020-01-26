import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer'
import climbs from './climbs_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    climbs
});

export default RootReducer;