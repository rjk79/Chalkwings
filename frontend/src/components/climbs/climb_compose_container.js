import { connect } from 'react-redux';
import { composeBoulder } from '../../actions/boulder_actions';
import { composeRope } from '../../actions/rope_actions';
import ClimbCompose from './climb_compose';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        newBoulder: state.entities.boulders.new
    };
};

const mapDispatchToProps = dispatch => {
    return {
        composeBoulder: data => dispatch(composeBoulder(data)),
        composeRope: data => dispatch(composeRope(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClimbCompose);