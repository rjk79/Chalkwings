import React from 'react';
// import BoulderBox from './boulder_box';
import '../../assets/stylesheets/climb_compose.css'
import {merge} from 'lodash'

class BoulderCompose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: [],
            name: "",
            grade: "",
            newBoulder: "",
            type: "boulder"
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitSession = this.handleSubmitSession.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSwitchType = this.handleSwitchType.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ newBoulder: nextProps.newBoulder.name });
    }

    handleSubmit(e) {   
        e.preventDefault();
        let boulder = {
            name: this.state.name,
            grade: this.state.grade
        };
        
        this.props.composeBoulder(boulder);
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
    handleClickClimb(grade){
        return () => {
            let newState = merge({}, this.state)
            newState.session.push(grade)
            this.setState(newState)
        }
    }

    handleRemove(){
        let newState = merge({}, this.state)
        newState.session.pop()
        this.setState(newState)
    }
    handleSubmitSession(){
        if (this.state.type === 'boulder') {
            for (let idx in this.state.session){  
                this.props.composeBoulder({name: "Default", grade: `${this.state.session[idx]}`})
            }
        }
        else {
            for (let idx in this.state.session) {
                this.props.composeRope({ name: "Default", grade: `${this.state.session[idx]}` })
            }
        }
        this.setState({session: []})
    }
    handleSwitchType(){
        if (this.state.type === 'boulder'){
            this.setState({type: 'rope'})}
        else {
            this.setState({type: 'boulder'}) 
        }
        this.setState({session: []})
    }
    render() {
        let options = []
        if (this.state.type === 'boulder'){
            const BOULDER_GRADES = ["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11"]

            for (let i = 0;i < 4;i++){
                options.push(
                    <tr className="boulder-grades">
                        <td onClick={this.handleClickClimb(BOULDER_GRADES[3 * i])}>{BOULDER_GRADES[3*i]}</td>
                        <td onClick={this.handleClickClimb(BOULDER_GRADES[3 * i + 1])}>{BOULDER_GRADES[3 * i + 1]}</td>
                        <td onClick={this.handleClickClimb(BOULDER_GRADES[3 * i + 2])}>{BOULDER_GRADES[3 * i + 2]}</td>
                    </tr>
                )
            }
        }
        else {
            const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8", 
                                "5.9", "5.10a", "5.10b", "5.10c", 
                                "5.10d", "5.11a", "5.11b", "5.11c", 
                                "5.11d", "5.12a", "5.12b", "5.12c", 
                                "5.12d", "5.13a"]
            for (let i = 0;i < 5;i++) {
                options.push(<tr className="rope-grades">
                    <td onClick={this.handleClickClimb(ROPE_GRADES[4 * i])}>{ROPE_GRADES[4*i]}</td>
                    {4 * i + 1 < ROPE_GRADES.length ? <td onClick={this.handleClickClimb(ROPE_GRADES[4 * i + 1])}>{ROPE_GRADES[4 * i + 1]}</td> : null}
                    {4 * i + 2 < ROPE_GRADES.length ? <td onClick={this.handleClickClimb(ROPE_GRADES[4 * i + 2])}>{ROPE_GRADES[4 * i + 2]}</td> : null}
                    {4 * i + 3 < ROPE_GRADES.length ? <td onClick={this.handleClickClimb(ROPE_GRADES[4 * i + 3])}>{ROPE_GRADES[4 * i + 3]}</td> : null}
                </tr>)
            }
        }
        let session = this.state.session.map((grade, idx) => <> <li key={idx}>{grade}</li> &nbsp; </> )
        return (
            <div className="compose-session">
                {this.state.type === 'boulder' ? <h3>Bouldering</h3>: <h3>Rope Climbing</h3>}
                <button className="switch-button" onClick={this.handleSwitchType}><i className="fas fa-exchange-alt"></i></button>
            <table className="options">
                <tbody>
                    {options}
                </tbody>
            </table>
                <button className="remove-button" onClick={this.handleRemove}><i className="fas fa-eraser"></i> </button>
            <button className="submit-session-button" onClick={this.handleSubmitSession}>Submit Session</button>
            <h4>Session:</h4>
            <ul className="session">
                {session}
            </ul>
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
                <BoulderBox name={this.state.newBoulder} /> TODO: show all of the sessions boulders 
            </div> */}
            </div>
        )
    }
}

export default BoulderCompose;