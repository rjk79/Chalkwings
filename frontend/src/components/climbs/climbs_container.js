import { connect } from 'react-redux';
import { fetchClimbs } from '../../actions/climb_actions';
import Climbs from './climbs';

const mapStateToProps = (state) => {
    return {
        climbs: Object.values(state.climbs.all)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClimbs: () => dispatch(fetchClimbs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Climbs);