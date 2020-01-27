import React from 'react';

class ClimbBox extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.name} V{this.props.grade}</h3>
            </div>
        );
    }
}

export default ClimbBox;