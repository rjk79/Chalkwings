import React from 'react';
// import ClimbBox from './climb_box';
import '../../assets/stylesheets/climb_compose.css'

class ClimbCompose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            grade: "",
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
            name: this.state.name,
            grade: this.state.grade
        };
        
        this.props.composeClimb(climb);
        this.setState({ name: '', grade: '' })
    }

    updateName() {
        return e => this.setState({
            name: e.currentTarget.value
        });
    }
    updateGrade() {
        return e => this.setState({
            grade: e.currentTarget.value
        });
    }
 
    render() {
        return (
            <div className="compose-boulder-container">
                <form onSubmit={this.handleSubmit} className="compose-boulder-form">
                    <div className="compose-boulder">
                        <p>Log a Boulder</p>
                        <input type="textarea"
                            value={this.state.name}
                            onChange={this.updateName()}
                            placeholder="Name (e.g Welcome Boulder)"
                        />
                        <input type="textarea"
                            value={this.state.grade}
                            onChange={this.updateGrade()}
                            placeholder="Grade  (e.g 0)"
                        />
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                <br />
                {/* <ClimbBox name={this.state.newClimb} /> TODO: show all of the sessions climbs */} 
            </div>
        )
    }
}

export default ClimbCompose;