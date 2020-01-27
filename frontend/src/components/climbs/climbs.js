import React from 'react';
import { withRouter } from 'react-router-dom';
import ClimbBox from './climb_box';

class Climb extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            climbs: []
        }
    }

    componentWillMount() {
        this.props.fetchClimbs();
    }

    componentWillReceiveProps(newState) {
        this.setState({ climbs: newState.climbs });
    }

    render() {
        // const links = <Link to="/fortytips"> Forty Tips for Climbing </Link>

        if (this.state.climbs.length === 0) {
            return (<div>
                {/* {links} <br/>  */}
                There are no Climbs</div>)
        } else {
            return (
                 
                <div>
                    {/* {links} */}
                    <h2>All Climbs</h2>
                    {this.state.climbs.map(climb => (
                        <ClimbBox key={climb._id} name={climb.name} grade={climb.grade} date={climb.date} />
                    ))}
                </div>
            );
        }
    }
}

export default withRouter(Climb);