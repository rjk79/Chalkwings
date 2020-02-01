import React from 'react';
import {merge} from 'lodash'
import { withRouter } from 'react-router-dom';
import * as TeamAPIUtil from '../../util/team_api_util'
import '../../assets/stylesheets/standings.css'
// import BoulderBox from './boulder_box';


const BOULDER_GRADES = ["V0", "V1", "V2",
    "V3", "V4", "V5",
    "V6", "V7", "V8",
    "V9", "V10", "V11"]
const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8",
    "5.9", "5.10a", "5.10b", "5.10c",
    "5.10d", "5.11a", "5.11b", "5.11c",
    "5.11d", "5.12a", "5.12b", "5.12c",
    "5.12d", "5.13a"]

class Standings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: {}
        }
    }
    componentDidMount(){
        const {teams} = this.props
        const {fetchTeam, fetchTeamBoulders, fetchTeamRopes} = this.props
        let newState = merge({}, this.state)

        TeamAPIUtil.getTeams()
            .then(res => {
                // res.data = [{}]
                for(let i = 0;i < res.data.length;i++) {
                    newState.teams[res.data[i]._id] = res.data[i]
                }
                
                let teamId;  
                for(let i=0;i<res.data.length;i++){
                    teamId = res.data[i]._id
                    fetchTeam(teamId) //get members
                    // dont fetch if data in state (cache)
                    if (!(teams[teamId] && teams[teamId].boulders)){console.log("fetching")
                        fetchTeamBoulders(teamId)}
                    if (!(teams[teamId] && teams[teamId].ropes)) {
                        console.log("fetching")
                        fetchTeamRopes(teamId)}
                    
                    
                }
            })
            .then(res => {
                
                this.setState({teams: newState.teams})
            })
            .catch(err => console.log(err))
    }

    render() {
        // const links = <Link to="/fortytips"> Forty Tips for Bouldering </Link>
        const propTeams = this.props.teams
        if (this.state.teams.length === 0) {
            return (<div>
                {/* {links} <br/>  */}
                Current teams unavailable.</div>)
        } else {
            const {users} = this.props
            let teams = Object.values(this.state.teams).map((team, idx) => {
                
                return (
                <li key={idx}>
                    <p>{team.name}</p>
                    <div className="icon-holder">
                    <i className={`fas fa-${team.symbol}`} style={{ color: `${team.color}` }}></i>
                    </div>
                    
                    <ul className="highest">
                            Best Boulders: 
                        {propTeams[team._id] && propTeams[team._id].boulders ? propTeams[team._id].boulders.map((grade, idx) => (<li key={idx} > {grade} </li>)):null} </ul> 
                    <ul className="highest">
                        Best Ropes: 
                        { propTeams[team._id] && propTeams[team._id].ropes ? propTeams[team._id].ropes.map((grade, idx) => (<li key={idx}> {grade} </li>)) : null } </ul > 
                    
                Captain: {users[team.captain] ? users[team.captain].username : null}
                <p>Members:</p>
                <ul className="members">
                    {team.members.map((memberId, idx) => {
                        return users[memberId] ? <li key={idx}>{users[memberId].username}</li> : null
                    })}
                </ul>
                </li>
            )})
            return (
                 
                <div className="standings">
                    
                    
                    <div className="standings-title">Team Standings: (last 2 weeks)</div>
                    <ul className="teams">
                        {teams}
                    </ul>
                    
                    {/* {this.state.boulders.map(boulder => (
                        <BoulderBox key={boulder._id} name={boulder.name} grade={boulder.grade} date={boulder.date} />
                    ))} */}
                    
                </div>
            );
        }
    }
}

export default withRouter(Standings);