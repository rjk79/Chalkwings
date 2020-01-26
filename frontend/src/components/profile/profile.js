import React from 'react';
import ClimbBox from '../climbs/climb_box';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            climbs: []
        }
    }

    componentWillMount() {
        console.log(this.props.currentUser.id)
        this.props.fetchUserClimbs(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        this.setState({ climbs: newState.climbs });
    }

    render() {
        if (this.state.climbs.length === 0) {
            return (<div>This user has no Climbs</div>)
        } else {
            return (
                <div>
                    <h2>All of This User's Climbs</h2>
                    {this.state.climbs.map(climb => (
                        <ClimbBox key={climb._id} name={climb.name} />
                    ))}
                </div>
            );
        }
    }
}

export default Profile;