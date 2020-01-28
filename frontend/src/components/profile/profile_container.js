import { connect } from 'react-redux';
import { fetchUserBoulders } from '../../actions/boulder_actions';
import { fetchUserRopes} from '../../actions/rope_actions';
import Profile from './profile';

const mapStateToProps = (state) => {
    return {
        boulders: Object.values(state.boulders.user),
        ropes: Object.values(state.ropes.user),
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserBoulders: id => dispatch(fetchUserBoulders(id)),
        fetchUserRopes: id => dispatch(fetchUserRopes(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);