import { connect } from 'react-redux';
import {deleteUserBoulders, deleteUserRopes, deleteUserSports} from '../../actions/user_actions'
import Profile from './profile';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteUserBoulders: (id) => dispatch(deleteUserBoulders(id)),
        deleteUserRopes: (id) => dispatch(deleteUserRopes(id)),
        deleteUserSports: (id) => dispatch(deleteUserSports(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);