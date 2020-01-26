import React from 'react';
import ClimbBox from './climb_box';

class ClimbCompose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            newClimb: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ newClimb: nextProps.newClimb.name });
    }

    handleSubmit(e) {
        e.preventDefault();
        let climb = {
            name: this.state.name
        };

        this.props.composeClimb(climb);
        this.setState({ name: '' })
    }

    update() {
        return e => this.setState({
            name: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="textarea"
                            value={this.state.name}
                            onChange={this.update()}
                            placeholder="Write your climb..."
                        />
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                <br />
                <ClimbBox name={this.state.newClimb} />
            </div>
        )
    }
}

export default ClimbCompose;