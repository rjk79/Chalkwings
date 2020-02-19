import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { fetchUserBoulders } from '../../actions/boulder_actions';
import { fetchUserRopes } from '../../actions/rope_actions';
import { fetchUserSports } from '../../actions/sport_actions';
import {
    BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../../assets/stylesheets/data.css'

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
    createBarGraph(data, color){
        if (color === "#6CD09D") {
            data = data.map(({ grade, count }) => { return { grade: grade.slice(1), count } }) //remove "5."
        }
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
                    <Tooltip />
                    <Legend />
                    <Bar stroke={color} dataKey="count" fill={`url(#${color})`} />
                </BarChart>
            </ResponsiveContainer>
        )
    }
    createAreaGraph(data, color) {
        if (color === "#6CD09D") {
            data = data.map(({ grade, count }) => { return { grade: grade.slice(1), count } }) //remove "5."
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
                    <defs>
                        <linearGradient id={`${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" stroke={color} dataKey="count" fill={`url(#${color})`} />
                </AreaChart>
            </ResponsiveContainer>
        )
    } 
    handleSwitchGraphType(){
        return e => {
            if (this.state.graphType === 'area'){
            this.setState({graphType: 'bar'})
            } else {
                this.setState({graphType: 'area'})
            }
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
                GRADES = BOULDER_GRADES
                climbs = boulders
                color = "#8884d8"
                currentType = "Boulders"
                break
            case 'ropes':
                GRADES = ROPE_GRADES
                climbs = ropes
                color = "#6CD09D"
                currentType = "Top-Rope Climbs"
                break
            case 'sports':
                GRADES = ROPE_GRADES
                climbs = sports
                color = "#83a6ed"
                currentType = "Sport Climbs"
                break
            default:

        }

        let climbData = this.createGraphData(climbs, GRADES) // {grade: count: }

        let date = new Date()
        let currMonth = date.getMonth()
        let i = 0
        while (i < climbs.length && parseInt(climbs[i].date.slice(5, 7)) - 1 === currMonth) i++ //getMo is 0 indexed
        let monthlyData = this.createGraphData(climbs.slice(0, i), GRADES)
       
        let monthlyAverageIdx = monthlyData.map(datum => GRADES.indexOf(datum.grade) * datum.count)
            .reduce((a, b) => a + b, 0)
            / monthlyData.map(datum => datum.count)
                .reduce((a, b) => a + b, 0)
        let monthlyAverage = GRADES[Math.floor(monthlyAverageIdx)]
        
        let monthlyCount = monthlyData.filter(el => el.count).reduce((a, b) => a + b.count, 0)
        let monthlyGraph = this.state.graphType === 'area' ? this.createAreaGraph(monthlyData, color) : this.createBarGraph(monthlyData, color) 
        let alltimeGraph = this.state.graphType === 'area' ? this.createAreaGraph(climbData, color) : this.createBarGraph(climbData, color) 

        return(
            <>
                <h2 style={{background: color, color: 'white'}}>{currentType}</h2>
                <button onClick={this.handleClickType} className="bw-button"><i className="fas fa-exchange-alt"></i>&nbsp;Climb Type</button>

                <button className="bw-button" onClick={this.handleSwitchGraphType()}><i className="fas fa-exchange-alt"></i> Graph Type</button>
                <h3>This Month ({new Date().toString().slice(4, 7)})</h3>
                <div>
                    <strong># of climbs:</strong> {monthlyCount}<br />
                    {/* <strong>Distance climbed:</strong> approx.&nbsp;{monthlyCount * 15} ft. | {Math.floor(monthlyCount * 15 * .3048)} m.<br /> */}
                    <strong>Average  grades climbed:</strong> {monthlyAverage || "n/a"} <br />
                </div>
                    
                        <div className="climb-chart">
                            {monthlyGraph}
                        </div>
                    
                


                <h3>All-time</h3>                    
                    
                        <div className="climb-chart">
                            {alltimeGraph}
                        </div>
                    
                {/* {this.state.boulders.map(boulder => (
                    <BoulderBox key={boulder._id} name={boulder.name} grade={boulder.grade} date={boulder.date} />
                ))} */}
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataComponent))