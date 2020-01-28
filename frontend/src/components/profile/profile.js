import React from 'react';
// import BoulderBox from '../boulders/boulder_box';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import '../../assets/stylesheets/profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boulders: [],
            ropes: [],
        }
    }

    componentWillMount() {
        console.log(this.props.currentUser.id)
        this.props.fetchUserBoulders(this.props.currentUser.id);
        this.props.fetchUserRopes(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        this.setState({ boulders: newState.boulders });
        this.setState({ ropes: newState.ropes });
        
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
        return (<ResponsiveContainer>
            <BarChart
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
                <Bar dataKey="count" fill={color} />
            </BarChart>
        </ResponsiveContainer>)
    }

    render() {
            
        const BOULDER_GRADES = ["V0", "V1", "V2", 
                                "V3", "V4", "V5", 
                                "V6", "V7", "V8", 
                                "V9", "V10", "V11"]
        const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8",
                            "5.9", "5.10a", "5.10b", "5.10c",
                            "5.10d", "5.11a", "5.11b", "5.11c",
                            "5.11d", "5.12a", "5.12b", "5.12c",
                            "5.12d", "5.13a"]

        let boulderData = this.createGraphData(this.state.boulders, BOULDER_GRADES)

        let date = new Date()
        let currMonth = date.getMonth()
        let i = 0
        while (i < this.state.boulders.length && parseInt(this.state.boulders[i].date.slice(5, 7)) -1 === currMonth) i ++ //getMo is 0 indexed
        let boulderMonthlyData = this.createGraphData(this.state.boulders.slice(0, i), BOULDER_GRADES)
        i = 0
        while (i < this.state.ropes.length && parseInt(this.state.ropes[i].date.slice(5, 7)) -1 === currMonth) i ++ //getMo is 0 indexed
        let ropeMonthlyData = this.createGraphData(this.state.ropes.slice(0, i), ROPE_GRADES)



        let ropeData = this.createGraphData(this.state.ropes, ROPE_GRADES)

            return (
                <div className="profile">
                    <h2>Your Profile</h2>
                    <h3>This Week - Boulders</h3> 
                    <div className="climb-chart">
                        {this.createBarGraph(boulderMonthlyData, "#8884d8")}
                    </div>
                    
                    <h3>This Week - Ropes</h3> 
                    <div className="climb-chart">
                        {this.createBarGraph(ropeMonthlyData, "#6CD09D")}
                    </div>

                    <h3>All Boulders</h3>                
                    <div className="climb-chart">
                        {this.createBarGraph(boulderData, "#8884d8")}
                    </div>

                    <h3>All Ropes</h3>
                    <div className="climb-chart">
                        {this.createBarGraph(ropeData, "#6CD09D")}
                    </div>

                    {/* {this.state.boulders.map(boulder => (
                        <BoulderBox key={boulder._id} name={boulder.name} grade={boulder.grade} date={boulder.date} />
                    ))} */}
                </div>
            );
        
    }
}

export default Profile;