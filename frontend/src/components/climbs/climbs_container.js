import { connect } from 'react-redux';
import { fetchBoulders } from '../../actions/boulder_actions';
import Climbs from './climbs';

const mapStateToProps = (state) => {
    return {
        boulders: Object.values(state.boulders.all)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBoulders: () => dispatch(fetchBoulders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Climbs);