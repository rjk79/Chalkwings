import React from 'react';
// import ClimbBox from './climb_box';
import '../../assets/stylesheets/climb_compose.css'
import {merge} from 'lodash'

class ClimbCompose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: [],
            name: "",
            grade: "",
            newClimb: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitSession = this.handleSubmitSession.bind(this)
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
    handleClick(grade){
        return () => {
            let newState = merge({}, this.state)
            newState.session.push(grade)
            this.setState(newState)
        }
    }
    handleSubmitSession(){
        
        for (let idx in this.state.session){  
            this.props.composeClimb({name: "Default", grade: `${this.state.session[idx]}`})
        }
        this.setState({session: []})
    }
    render() {
        let options = []
        for (let i = 0;i < 4;i++){
            options.push(
                <tr>
                    <td onClick={this.handleClick(3*i)}>V{3*i}</td>
                    <td onClick={this.handleClick(3 * i+1)}>V{3*i + 1}</td>
                    <td onClick={this.handleClick(3 * i+2)}>V{3*i + 2}</td>
                </tr>
            )
        }
        let session = this.state.session.map(grade =>
            <> <li>V{grade}</li> &nbsp; </>
            )
        return (
            <>
            <table className="compose-session">
                {options}
            </table>
            <ul className="session">
                {session}
            </ul>
            <button className="submit-session-button" onClick={this.handleSubmitSession}>Submit Session</button>

            {/* <div className="compose-boulder-container">
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
                <ClimbBox name={this.state.newClimb} /> TODO: show all of the sessions climbs 
            </div> */}
            </>
        )
    }
}

export default ClimbCompose;