import { connect } from 'react-redux';
import { fetchBoulders } from '../../actions/boulder_actions';
import Standings from './standings';
import {fetchTeam} from '../../actions/team_actions'

const mapStateToProps = (state) => {
    
    return {
        boulders: Object.values(state.entities.boulders.all),
        users: state.entities.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBoulders: () => dispatch(fetchBoulders()),
        fetchTeam: id => dispatch(fetchTeam(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Standings);