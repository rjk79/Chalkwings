import React from 'react';
import { withRouter } from 'react-router-dom';
// import BoulderBox from './boulder_box';

class Boulders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boulders: []
        }
    }

    componentWillMount() {
        this.props.fetchBoulders();
    }

    componentWillReceiveProps(newState) {
        this.setState({ boulders: newState.boulders });
    }

    render() {
        // const links = <Link to="/fortytips"> Forty Tips for Bouldering </Link>

        if (this.state.boulders.length === 0) {
            return (<div>
                {/* {links} <br/>  */}
                There are no Boulders</div>)
        } else {
            return (
                 
                <div>
                    {/* {links} */}
                    <h2>All Boulders</h2>
                    {/* {this.state.boulders.map(boulder => (
                        <BoulderBox key={boulder._id} name={boulder.name} grade={boulder.grade} date={boulder.date} />
                    ))} */}
                </div>
            );
        }
    }
}

export default withRouter(Boulders);