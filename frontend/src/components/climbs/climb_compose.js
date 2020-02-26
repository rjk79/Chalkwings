import React from 'react';
// import BoulderBox from './boulder_box';
import '../../assets/stylesheets/climb_compose.css'
import {merge} from 'lodash'
import { 
    // Legend, 
    Tooltip, PieChart, Pie, 
    // Sector, 
    Cell, 
    // ResponsiveContainer
    } from 'recharts'
const BOULDER_GRADES = ["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11"]
const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8",
    "5.9", "5.10a", "5.10b", "5.10c",
    "5.10d", "5.11a", "5.11b", "5.11c",
    "5.11d", "5.12a", "5.12b", "5.12c",
    "5.12d", "5.13a"]


class ClimbCompose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: [],
            name: "",
            grade: "",
            newBoulder: "",
            type: "Bouldering",
        }

        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitSession = this.handleSubmitSession.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSwitchType = this.handleSwitchType.bind(this)
    }



    // handleSubmit(e) {   
    //     e.preventDefault();
    //     let boulder = {
    //         name: this.state.name,
    //         grade: this.state.grade
    //     };
        
    //     this.props.composeBoulder(boulder);
    //     this.setState({ name: '', grade: '' })
    // }

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

    handleRemove(idx){
        return () => {
            let newState = merge({}, this.state)
            newState.session.splice(idx, 1)
            this.setState(newState)
        }
    }
    handleSubmitSession(){ //TODO: refactor using insertMany([])
        if (this.state.type === 'Bouldering') {
            for (let idx in this.state.session){  
                this.props.composeBoulder({name: "Default", grade: `${this.state.session[idx]}`})
                    .catch(err => {
                        console.log(err)})
            }
        }
        else if (this.state.type === 'Top-Roping') {
            for (let idx in this.state.session) {
                this.props.composeRope({ name: "Default", grade: `${this.state.session[idx]}` })
                    .catch(err => {
                        alert(err)
                        console.log(err)})
            }
        }
        else if (this.state.type === 'Sport Climbing') {
            
            for (let idx in this.state.session) {
                this.props.composeSport({ name: "Default", grade: `${this.state.session[idx]}` })
                    .catch(err => {
                        alert(err)
                        console.log(err)
                    })
            }
        }
        this.setState({session: []})
        const button = document.getElementsByClassName("submit-session-button")[0]
        button.innerText = "Added!"
        setTimeout(()=>{
            button.innerText = "Submit Session"
        }, 1000)
        // this.props.history.push(`/profile/${this.props.currentUser.id}`)

    }
    
    handleSwitchType(){
        if (this.state.type === 'Bouldering'){
            this.setState({type: 'Top-Roping'})}
        else if (this.state.type === 'Top-Roping') {
            this.setState({type: 'Sport Climbing'}) }
        else if (this.state.type === 'Sport Climbing') {
            this.setState({ type: 'Bouldering' }) 
        }
        this.setState({session: []})
    }

    createGraph(data){
        const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
        
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index,}) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN); //splays them in circle
            
            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {percent > 0? data[index].name:null}
                    {/* {`${(percent * 100).toFixed(0)}%`} */}
                </text>
            );
            // return (
            //     <text fill="white" x={x} y={y} dominantBaseline="central" offset="10">
            //         {data[index].name}: &nbsp;
            //     </text>
            // )
        };
        return (
            <PieChart width={250} height={250}>
                <Pie
                    data={data}
                    cx={125}
                    cy={125} //center coords
                    labelLine={false}
                    label={renderCustomizedLabel}
                    // label
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />)
                    }
                    
                </Pie>
                    <Tooltip />
                    {/* <Legend /> */}
            </PieChart>
            )
    }
    render() {
        let options = []
        const{session} = this.state
        if (this.state.type === 'Bouldering'){

            for (let i = 0;i < 4;i++){
                options.push(
                    <tr className="boulder-grades">
                        {4 * i < BOULDER_GRADES.length ? <td onClick={this.handleClickClimb(BOULDER_GRADES[4 * i])}>{BOULDER_GRADES[4*i]}</td> : null}
                        {4 * i+1 < BOULDER_GRADES.length ? <td onClick={this.handleClickClimb(BOULDER_GRADES[4 * i+1])}>{BOULDER_GRADES[4*i+1]}</td> : null}
                        {4 * i+2 < BOULDER_GRADES.length ? <td onClick={this.handleClickClimb(BOULDER_GRADES[4 * i+2])}>{BOULDER_GRADES[4*i+2]}</td> : null}
                        {4 * i+3 < BOULDER_GRADES.length ? <td onClick={this.handleClickClimb(BOULDER_GRADES[4 * i+3])}>{BOULDER_GRADES[4*i+3]}</td> : null}
                    </tr>
                )
            }
        }
        else {
        
            for (let i = 0;i < 5;i++) {
                options.push(<tr className={this.state.type === 'Top-Roping' ? 'rope-grades':'sport-grades'}>
                    {5 * i  < ROPE_GRADES.length ? <td onClick={this.handleClickClimb(ROPE_GRADES[5 * i ])}>{ROPE_GRADES[5 * i ]}</td> : null}
                    {5 * i + 1 < ROPE_GRADES.length ? <td onClick={this.handleClickClimb(ROPE_GRADES[5 * i + 1])}>{ROPE_GRADES[5 * i + 1]}</td> : null}
                    {5 * i + 2 < ROPE_GRADES.length ? <td onClick={this.handleClickClimb(ROPE_GRADES[5 * i + 2])}>{ROPE_GRADES[5 * i + 2]}</td> : null}
                    {5 * i + 3 < ROPE_GRADES.length ? <td onClick={this.handleClickClimb(ROPE_GRADES[5 * i + 3])}>{ROPE_GRADES[5 * i + 3]}</td> : null}
                    {5 * i + 4 < ROPE_GRADES.length ? <td onClick={this.handleClickClimb(ROPE_GRADES[5 * i + 4])}>{ROPE_GRADES[5 * i + 4]}</td> : null}
                </tr>)
            }
        }
        let sessionLis = session.map((grade, idx) => <> <li key={idx} onClick={this.handleRemove(idx)}>{grade}</li> &nbsp; </> )

        let counts = {}
        const allGrades = this.state.type === 'Bouldering' ? BOULDER_GRADES : ROPE_GRADES
        for (let i=0;i < allGrades.length; i ++){ //populate default dict
            counts[allGrades[i]] = 0
        }
        for (let i = 0; i < session.length; i++) {
            let currClimb = session[i]
            counts[currClimb]++
        }
        let data = []
        const grades = Object.keys(counts)
        for (let i = 0; i < grades.length; i++) {
            let grade = grades[i]
            data.push({ name: grade, value: counts[grade] })
        }

        return (
            <div className="compose-session">
                <div className="type">
                    {<h3>{this.state.type}</h3>} &nbsp;
                    <button className="switch-button" onClick={this.handleSwitchType}><i className="fas fa-exchange-alt"></i>&nbsp;</button>

                </div>
            <table className="options">
                <tbody>
                    {options}
                </tbody>
            </table>
            <div className="controls">
                <button className="remove-button" onClick={this.handleRemove(this.state.session.length-1)}><i className="fas fa-eraser"></i> </button>
                <button className="submit-session-button" onClick={this.handleSubmitSession}>Submit</button>
            </div>    
            {/* <h4>Session:</h4> */}
            <ul className="session">
                {sessionLis}
            </ul>
            {this.createGraph(data)}

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

export default ClimbCompose;