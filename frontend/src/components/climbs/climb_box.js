import React from 'react';

class ClimbBox extends React.Component {
    render() {
        const date = `${this.props.date.slice(5, 7)}/${this.props.date.slice(0, 4)}`
        return (
            <div>
                <h4>{this.props.name} V{this.props.grade} {date}</h4>
            </div>
        );
    }
}

export default ClimbBox;