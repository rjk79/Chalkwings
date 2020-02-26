import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { fetchUserBoulders } from '../../actions/boulder_actions';
import { fetchUserRopes } from '../../actions/rope_actions';
import { fetchUserSports } from '../../actions/sport_actions';
import {
    BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';
import '../../assets/stylesheets/data.css'
// import {merge} from 'lodash'

const mapStateToProps = (state) => {
    return {
        boulders: Object.values(state.entities.boulders.user),
        ropes: Object.values(state.entities.ropes.user),
        sports: Object.values(state.entities.sports.user),
        currentUser: state.session.user,
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        fetchUserBoulders: id => dispatch(fetchUserBoulders(id)),
        fetchUserRopes: id => dispatch(fetchUserRopes(id)),
        fetchUserSports: id => dispatch(fetchUserSports(id))
    };
};

class DataComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            graphType: 'area',
            type: 'boulders',
        }
        this.handleSwitchGraphType = this.handleSwitchGraphType.bind(this)
        this.handleClickType = this.handleClickType.bind(this)
    }
    componentDidMount(){
        console.log("fetching")
        this.props.fetchUserBoulders(this.props.match.params.userId)

        this.props.fetchUserRopes(this.props.match.params.userId)
        this.props.fetchUserSports(this.props.match.params.userId)
    
    }
    componentDidUpdate(prevProps){
        if (this.props.match.params.userId !== prevProps.match.params.userId) {

            this.props.fetchUserBoulders(this.props.match.params.userId)
        
            this.props.fetchUserRopes(this.props.match.params.userId)
            this.props.fetchUserSports(this.props.match.params.userId)

        }
    }
    handleClickType() {
        switch (this.state.type) {
            case 'ropes':
                this.setState({ type: 'sports' })
                break
            case 'sports':
                this.setState({ type: 'boulders' })
                break
            case 'boulders':
                this.setState({ type: 'ropes' })
                break
            default:
                break
        }
    }
    handleSwitchGraphType() {
        return e => {
            if (this.state.graphType === 'area') {
                this.setState({ graphType: 'bar' })
            } else if (this.state.graphType === 'bar') {
                this.setState({ graphType: 'area' })
            } 
            // else {
            //     this.setState({ graphType: 'stackedArea' })
            // }
        }
    }
    createGraphData(climbs, grades) { 
        if (!climbs.length){return []}
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
        if (data[0].grade === "5.5") {
            data = data.map(({ grade, count }) => { return { grade: grade.slice(1), count } }) //remove "5"
        }
        return data // { grade: 'V0', count: 0 }, 
    }
    createBarGraph(data, color){
        
        return (
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <defs>
                        <linearGradient id={`${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip content={this.renderTooltip}/>
                    <Legend />
                    <Bar stroke={color} dataKey="count" fill={`url(#${color})`} />
                </BarChart>
            </ResponsiveContainer>
        )
    }
    createAreaGraph(data, color) {
        
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
                    <defs>
                        <linearGradient id={`${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip content={this.renderTooltip}/>
                    <Legend />
                    <Area type="monotone" stroke={color} dataKey="count" fill={`url(#${color})`} />
                </AreaChart>
            </ResponsiveContainer>
        )
    } 
    renderTooltip = (data) => {
        // debugger
        if (!data.payload) {return null}
        if (data.payload.length) {
            let stats = data.payload[0].payload
            return (
                <div style={{
                    backgroundColor: '#fff', border: '1px solid #999', margin: 0, padding: 10, width: '70px'
                }}
                >
                    <p>{stats.grade}</p>
                    <p>
                        count: 
                        {stats.count}
                    </p>
                </div>
            );
        } else {
            return null
        }
    }
    createBubbleChart(data, color){
        // modify data
        for (let i = 0; i < data.length;i++){ 
            data[i]["index"] = 1 //merge {index: 1}
        }
        const domain = Math.max(...data.map(el=>el.count))
        const range = [16, 225];
        return (
            <ResponsiveContainer>

                <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                        top: 10, right: 0, bottom: 0, left: 0,
                    }}
                >
                    <XAxis type="category" dataKey="grade" interval={0} tick={{ fontSize: 12 }} tickLine={{ transform: 'translate(0, -6)' }} />
                    <YAxis type="number" dataKey="index" name="count" height={10} width={80} tick={false} tickLine={false} axisLine={false} 
                        // label={{ value: 'Session', position: 'insideRight' }} 
                        />
                    <ZAxis type="number" dataKey="count" domain={domain} range={range} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={this.renderTooltip} />
                    <Scatter data={data} fill={color} />
                </ScatterChart>
            </ResponsiveContainer>

        )
    }
    findPreviousSession(climbs){
        if (!climbs.length){return []}
        
        let mostRecentDate = this.mostRecentSessionDate(climbs)
        let res = []
        for (let i = 0; i < climbs.length; i++) {
            
            if (new Date(climbs[i].date).toString().slice(0, 15) === mostRecentDate) {res.push(climbs[i])}
        }
        return res
    }
    allMonthlyData(){
        
    }
    numberClimbs(data){
        return data.filter(el => el.count).reduce((a, b) => a + b.count, 0)
    }
    mostRecentSessionDate(data){
        if (!data.length) { return null }
        let mostRecentDate = new Date(data[0].date)
        
        for (let i = 0; i < data.length; i++) {
            let currDate = new Date(data[i].date)
            if (currDate > mostRecentDate) { mostRecentDate = currDate } // later is greater
        }
        // debugger
        return mostRecentDate.toString().slice(0, 15) //"Wed Feb 19 2020"
    }
    averageGrade(data, grades){
        let averageIdx = data.map(datum => grades.indexOf(datum.grade[0] === "." ? "5" + datum.grade : datum.grade) * datum.count)
            .reduce((a, b) => a + b, 0)
            / data.map(datum => datum.count).reduce((a, b) => a + b, 0) 
            // total / sum
        return grades[Math.floor(averageIdx)]
    }
    monthlySessionGraphData(data, grades){
        let newData = {}
        // {date: {date:, v0: , v1: }}
        // {date: , v0: , v1: }
        for(let i = 0;i<data.length;i++){
            let {date, grade} = data[i]
            date = date.slice(5,10)
            if (!(date in newData)){
                newData[date] = {date}
                for (let j = 0;j<grades.length;j++){
                    newData[date][grades[j]] = 0
                }
            }
            newData[date][grade] += 1
        }
        // debugger
        newData = Object.values(newData)
        newData.reverse()
        return newData
    }
    createMonthlySessionGraph(data, grades, color){
        const newData = this.monthlySessionGraphData(data, grades)
        // debugger
        const areas = grades.map((grade, idx) => (
            <Area type="monotone" dataKey={grade} stackId="1" stroke={color} fill={color}
                fillOpacity={`${(grades.length - 1 - idx) /(grades.length-1)}`}
            />
        ))
        return (
            <ResponsiveContainer>
            <AreaChart
                width={500}
                height={200}
                data={newData}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={this.monthlySessionGraphTooltip}/>
                {areas}
            </AreaChart>
            </ResponsiveContainer>
        )
    }
    monthlySessionGraphTooltip(data){
        if (!data.payload) { return null }
        if (data.payload.length) {
            let stats = data.payload[0].payload
            //stat.date
            let statLis = Object.keys(stats).map((stat,idx)=>{
                if (stat === 'date' || !stats[stat]){return null}
                else {
                    return (
                        <p key={idx}>{stat}: {stats[stat]}</p>
                    )
                }
            })
            return (
                <div style={{
                    backgroundColor: '#fff', border: '1px solid #999', margin: 0, padding: 10, width: '80px'
                }}
                >
                    
                    {statLis}
                    
                </div>
            );
        } else {
            return null
        }
    }
    render(){

        const { boulders, ropes, sports } = this.props
        
        const {type} = this.state
        const BOULDER_GRADES = ["V0", "V1", "V2",
            "V3", "V4", "V5",
            "V6", "V7", "V8",
            "V9", "V10", "V11"]
        const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8",
            "5.9", "5.10a", "5.10b", "5.10c",
            "5.10d", "5.11a", "5.11b", "5.11c",
            "5.11d", "5.12a", "5.12b", "5.12c",
            "5.12d", "5.13a"]
        let GRADES
        let climbs
        let color
        let currentType
        
        switch(type){
            case 'boulders':
                GRADES = BOULDER_GRADES; climbs = boulders; color = "#8884d8"; currentType = "Boulders";
                break
            case 'ropes':
                GRADES = ROPE_GRADES; climbs = ropes; color = "#6CD09D"; currentType = "Top-Rope Climbs"
                break
            case 'sports':
                GRADES = ROPE_GRADES; climbs = sports; color = "#83a6ed"; currentType = "Sport Climbs"
                break
            default:

        }

        let sessionRawData = this.findPreviousSession(climbs)
        let sessionData = this.createGraphData(sessionRawData, GRADES)

        let climbData = this.createGraphData(climbs, GRADES) // {grade: count: }

        let date = new Date()
        let currMonth = date.getMonth()
        let i = 0
        while (i < climbs.length && parseInt(climbs[i].date.slice(5, 7)) - 1 === currMonth) i++ //getMo is 0 indexed
        let monthlyClimbs = climbs.slice(0, i)
        let monthlyData = this.createGraphData(monthlyClimbs, GRADES)
        
  
        let monthlyGraph 
        let alltimeGraph = this.state.graphType === 'area' ? this.createAreaGraph(climbData, color) : this.createBarGraph(climbData, color) 
        switch(this.state.graphType){
            // case "stackedArea":
            //     monthlyGraph = this.createMonthlySessionGraph(monthlyData, color)
            case "area":
                monthlyGraph = this.createAreaGraph(monthlyData, color)
                break
            case "bar":
                monthlyGraph = this.createBarGraph(monthlyData, color) 
        }
        let sessionGraph = this.createBubbleChart(sessionData, color)
        return(
            <>
                <div className="current-type" style={{background: color, color: 'white'}}>{currentType}</div>
                <div className="profile-controls">
                    <button onClick={this.handleClickType} className="bw-button"><i className="fas fa-exchange-alt"></i>&nbsp;Climb Type</button>
                </div>
                {/* <div> */}
                    <h3>Most Recent Session</h3>
                    <strong>Date: </strong>{this.mostRecentSessionDate(sessionRawData)}<br/>
                    <strong># of climbs:</strong> {this.numberClimbs(sessionData)}<br />
                    <strong>Average grade climbed:</strong> {this.averageGrade(sessionData, GRADES) || "n/a"} <br />
                    
                    <div className="session-chart">
                        {sessionGraph}
                    </div>
                {/* </div> */}
                {/* <div> */}
                    <h3>This Month ({new Date().toString().slice(4, 7)})</h3>
                    <div>
                        <strong># of climbs:</strong> {this.numberClimbs(monthlyData)}<br />
                        {/* <strong>Distance climbed:</strong> approx.&nbsp;{monthlyCount * 15} ft. | {Math.floor(monthlyCount * 15 * .3048)} m.<br /> */}
                        <strong>Average grade climbed:</strong> {this.averageGrade(monthlyData, GRADES) || "n/a"} <br />
                    </div>
                        
                    <div className="climb-chart">
                        {this.createMonthlySessionGraph(monthlyClimbs, GRADES, color)}
                    </div>
                        <button className="bw-button" onClick={this.handleSwitchGraphType()}><i className="fas fa-exchange-alt"></i> Graph Type</button>
                        <div className="climb-chart">
                            {monthlyGraph}
                        </div>
                {/* </div> */}
                {/* <div> */}
                <h3>Lifetime</h3>                    
                    
                        <div className="climb-chart">
                            {alltimeGraph}
                        </div>
                {/* </div>     */}
                {/* {this.state.boulders.map(boulder => (
                    <BoulderBox key={boulder._id} name={boulder.name} grade={boulder.grade} date={boulder.date} />
                ))} */}
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataComponent))