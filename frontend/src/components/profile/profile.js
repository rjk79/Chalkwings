import React from 'react';
import ClimbBox from '../climbs/climb_box';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import '../../assets/stylesheets/profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            climbs: []
        }
    }

    componentWillMount() {
        console.log(this.props.currentUser.id)
        this.props.fetchUserClimbs(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        this.setState({ climbs: newState.climbs });
    }

    render() {

        if (this.state.climbs.length === 0) {
            return (<div>This user has no Climbs</div>)
        } else {
            
            // { grade: 'V0', count: 0 }, 
            let data = []
            for (let i = 0;i < 11;i++) {
                data.push({grade: `V${i}`, count: 0})
            }
            this.state.climbs.forEach(climb => {
                data[parseInt(climb.grade)].count ++
            })
            return (
                <div className="profile">
                    <h2>All of Your Climbs</h2>
                    
                    <div className="boulder-chart">

                    <ResponsiveContainer>

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
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                    {this.state.climbs.map(climb => (
                        <ClimbBox key={climb._id} name={climb.name} grade={climb.grade} date={climb.date} />
                    ))}
                </div>
            );
        }
    }
}

export default Profile;