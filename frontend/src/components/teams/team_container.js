import { connect } from 'react-redux';
import Team from './team'
import {fetchTeam, updateTeam, deleteTeam} from '../../actions/team_actions'

const mapStateToProps = (state) => {
    
    let teams
    if (state.entities.teams){
        teams = state.entities.teams
    } else {
        teams = {}
    }
    return {
        teams,
        users: state.entities.users
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchTeam: id => dispatch(fetchTeam(id)),
        updateTeam: team => dispatch(updateTeam(team)),
        deleteTeam: id => dispatch(deleteTeam(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Team);