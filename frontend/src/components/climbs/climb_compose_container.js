import { connect } from 'react-redux';
import { composeBoulder } from '../../actions/boulder_actions';
import { composeRope } from '../../actions/rope_actions';
import { composeSport } from '../../actions/sport_actions';
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
        composeRope: data => dispatch(composeRope(data)),
        composeSport: data => dispatch(composeSport(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClimbCompose);