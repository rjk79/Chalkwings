import { connect } from 'react-redux';
import { fetchUserClimbs } from '../../actions/climb_actions';
import Profile from './profile';

const mapStateToProps = (state) => {
    return {
        climbs: Object.values(state.climbs.user),
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserClimbs: id => dispatch(fetchUserClimbs(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);