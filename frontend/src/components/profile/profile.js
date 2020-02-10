import React from 'react';
// import BoulderBox from '../boulders/boulder_box';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import '../../assets/stylesheets/profile.css'
import * as UserAPIUtil from '../../util/user_api_util'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            
            type: 'boulders',
        }
        this.deleteAll = this.deleteAll.bind(this)
        this.handleClickType = this.handleClickType.bind(this)
    }
    componentDidMount(){
        UserAPIUtil.getUser(this.props.match.params.userId)
            .then(res => this.setState({ username: res.data.username }))
            .catch(err => console.log(err))
        this.props.fetchUserBoulders(this.props.match.params.userId)
        this.props.fetchUserRopes(this.props.match.params.userId)

    }


    componentDidUpdate(prevProps){
        if (this.props.match.params.userId !== prevProps.match.params.userId){
            const userId = this.props.match.params.userId
            UserAPIUtil.getUser(userId)
                .then(res => this.setState({ username: res.data.username }))
                .catch(err => console.log(err))
            this.props.fetchUserBoulders(userId)
            this.props.fetchUserRopes(userId)}
    }

    createGraphData(climbs, grades) { // { grade: 'V0', count: 0 }, 
        let data = []
        for (let i = 0; i < grades.length; i++) {
            data.push({ grade: grades[i], count: 0 })
        }
        
        if (climbs.length > 0) {
            climbs.forEach(climb => {
                data.forEach(datum => {

                    if (datum.grade === climb.grade) datum.count++
                })
            })
        }
        return data
    }

    createAreaGraph(data, color){
        if (color === "#6CD09D") {
            data = data.map(({grade, count})=>{return {grade:grade.slice(1), count}}) //remove "5."
        }
        return (
        <ResponsiveContainer>
            <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" /> 
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="count" fill={color} />
            </AreaChart>
        </ResponsiveContainer>
        )
    } 
    deleteAll(){
        
        UserAPIUtil.deleteUserBoulders(this.props.match.params.userId)
        UserAPIUtil.deleteUserRopes(this.props.match.params.userId)
    }
    handleClickType(){
        this.setState({type: this.state.type === 'boulders' ? 'ropes':'boulders'})
    }
    render() {
        
        const {boulders, ropes} = this.props
        const BOULDER_GRADES = ["V0", "V1", "V2", 
                                "V3", "V4", "V5", 
                                "V6", "V7", "V8", 
                                "V9", "V10", "V11"]
        const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8",
                            "5.9", "5.10a", "5.10b", "5.10c",
                            "5.10d", "5.11a", "5.11b", "5.11c",
                            "5.11d", "5.12a", "5.12b", "5.12c",
                            "5.12d", "5.13a"]

        let boulderData = this.createGraphData(boulders, BOULDER_GRADES)
        
        let date = new Date()
        let currMonth = date.getMonth()
        let i = 0
        while (i < boulders.length && parseInt(boulders[i].date.slice(5, 7)) -1 === currMonth) i ++ //getMo is 0 indexed
        let boulderMonthlyData = this.createGraphData(boulders.slice(0, i), BOULDER_GRADES)
        i = 0
        while (i < ropes.length && parseInt(ropes[i].date.slice(5, 7)) -1 === currMonth) i ++ //getMo is 0 indexed
        let ropeMonthlyData = this.createGraphData(ropes.slice(0, i), ROPE_GRADES)
        
        let ropeMonthlyAverageIdx = ropeMonthlyData.map(datum => ROPE_GRADES.indexOf(datum.grade) * datum.count)
                                                    .reduce((a, b)=> a+b, 0)
                                    / ropeMonthlyData.map(datum => datum.count)
                                                    .reduce((a, b) => a + b, 0)
        let ropeMonthlyAverage = ROPE_GRADES[Math.floor(ropeMonthlyAverageIdx)]
        let boulderMonthlyAverageIdx = boulderMonthlyData.map(datum => BOULDER_GRADES.indexOf(datum.grade) * datum.count)
                                                    .reduce((a, b)=> a+b, 0)
                                    / boulderMonthlyData.map(datum => datum.count)
                                                    .reduce((a, b) => a + b, 0)
        let boulderMonthlyAverage = BOULDER_GRADES[Math.floor(boulderMonthlyAverageIdx)]
        
        let ropeData = this.createGraphData(ropes, ROPE_GRADES)
            

        return (
            <div className="profile">
                <h1>{this.state.username}'s Profile</h1>
                {this.state.type === 'boulders' ? <h3>Boulders</h3>:<h3>Ropes</h3>}
                <button onClick={this.handleClickType} className="profile-swap"><i className="fas fa-exchange-alt"></i>&nbsp;{this.state.type === 'boulders' ? 'View Ropes':'View Boulders'}</button>
                <h2>This Month ({new Date().toString().slice(4, 7)})</h2>
                <div>
                    # of boulders: {boulderMonthlyData.filter(el => el.count).length}<br/>
                    # of rope climbs: {ropeMonthlyData.filter(el => el.count).length}<br/>
                    Distance bouldered: approx.&nbsp;{boulderMonthlyData.filter(el => el.count).length * 15}&nbsp; feet<br/>
                    Distance rope-climbed: approx.&nbsp;{ropeMonthlyData.filter(el => el.count).length * 40}&nbsp; feet<br/>
                    Monthly average rope grade: {ropeMonthlyAverage} <br/>
                    Monthly average boulder grade: {boulderMonthlyAverage}
                </div>
                {this.state.type === 'boulders' ?
                    <>
                    <div className="climb-chart">
                        {this.createAreaGraph(boulderMonthlyData, "#8884d8")}
                    </div></> : 
                    <>
                    <div className="climb-chart">
                        {this.createAreaGraph(ropeMonthlyData, "#6CD09D")}
                    </div>
                    </>
                }


                <h2>All-time</h2>
                {this.state.type === 'boulders' ?
                <>
                <div className="climb-chart">
                    {this.createAreaGraph(boulderData, "#8884d8")}
                </div> 
                </> :
                <>
                <div className="climb-chart">
                    {this.createAreaGraph(ropeData, "#6CD09D")}
                </div>
                </> }
                {/* {this.state.boulders.map(boulder => (
                    <BoulderBox key={boulder._id} name={boulder.name} grade={boulder.grade} date={boulder.date} />
                ))} */}
                {this.props.match.params.userId === this.props.currentUser.id ? <button onClick={this.deleteAll}>Delete all</button> : null}
            </div>
        );
    
    }
}

export default Profile