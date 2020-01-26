import { connect } from 'react-redux';
import { composeClimb } from '../../actions/climb_actions';
import ClimbCompose from './climb_compose';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        newClimb: state.climbs.new
    };
};

const mapDispatchToProps = dispatch => {
    return {
        composeClimb: data => dispatch(composeClimb(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClimbCompose);