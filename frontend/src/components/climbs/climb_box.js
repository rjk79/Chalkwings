import React from 'react';

class BoulderBox extends React.Component {
    render() {
        const date = `${this.props.date.slice(5, 7)}/${this.props.date.slice(0, 4)}`
        return (
            <div>
                <h4>V{this.props.grade} {date}</h4>
            </div>
        );
    }
}

export default BoulderBox;