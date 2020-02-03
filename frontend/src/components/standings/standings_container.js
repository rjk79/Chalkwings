import { connect } from 'react-redux';
import { fetchBoulders } from '../../actions/boulder_actions';
import Standings from './standings';
import {fetchTeam} from '../../actions/team_actions'
import { fetchTeams, fetchTeamBoulders, fetchTeamRopes } from '../../actions/team_actions'

const mapStateToProps = (state) => {
    
    return {
        boulders: Object.values(state.entities.boulders.all),
        users: state.entities.users,
        teams: state.entities.teams,
        currentUser: state.session.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBoulders: () => dispatch(fetchBoulders()),
        fetchTeam: id => dispatch(fetchTeam(id)),
        fetchTeamBoulders: id => dispatch(fetchTeamBoulders(id)),
        fetchTeamRopes: id => dispatch(fetchTeamRopes(id)),
        fetchTeams: () => dispatch(fetchTeams())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Standings);