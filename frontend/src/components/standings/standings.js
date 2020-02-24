import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../../assets/stylesheets/standings.css'
// import BoulderBox from './boulder_box';

 
// const BOULDER_GRADES = ["V0", "V1", "V2",
//     "V3", "V4", "V5",
//     "V6", "V7", "V8",
//     "V9", "V10", "V11"]
// const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8",
//     "5.9", "5.10a", "5.10b", "5.10c",
//     "5.10d", "5.11a", "5.11b", "5.11c",
//     "5.11d", "5.12a", "5.12b", "5.12c",
//     "5.12d", "5.13a"]

class Standings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: {}
        }
    }
    componentDidMount(){
        const {fetchTeams, fetchTeam, fetchTeamBoulders, fetchTeamRopes} = this.props

        fetchTeams().then(() => {
            const { teams } = this.props

            let teamId;
            
            for (let i = 0; i < Object.keys(teams).length; i++) {

                teamId = Object.keys(teams)[i]
                
                fetchTeam(teamId) //get members
                // dont fetch if data in state (cache)
                if (!(teams[teamId] && teams[teamId].boulders)) {
                    console.log("fetching")
                    fetchTeamBoulders(teamId)
                }
                if (!(teams[teamId] && teams[teamId].ropes)) {
                    console.log("fetching")

                    fetchTeamRopes(teamId)
                }

            }
        })
                
 
    }

    render() {
        // const links = <Link to="/fortytips"> Forty Tips for Bouldering </Link>
        const {teams} = this.props
        const sortedTeamIds = Object.keys(teams).sort((x, y) => {
            // + => y comes first
            const teamX = teams[x]
            const teamY = teams[y]
            const xAgg = teamX.ropeScore + teamX.boulderScore
            const yAgg = teamY.ropeScore + teamY.boulderScore
            if (xAgg > yAgg) {
                return -1
            }
            if (xAgg < yAgg) {
                return 1
            }
            else {
                return 0
            }
        })
        
        if (this.state.teams.length === 0) {
            return (<div>
                {/* {links} <br/>  */}
                Current teams unavailable.</div>)
        } else {
            const {users, currentUser} = this.props
            let teamLis = sortedTeamIds.map(id => teams[id]).map((team, idx) => {
                
                return (
                <li key={idx}>
                    <p>{team.name}</p> {currentUser.id === team.captain ? <Link to={`/teams/${team._id}`}>Edit your team</Link> : null}
                    <div className="icon-holder">
                    <i className={`fas fa-${team.symbol}`} style={{ color: `${team.color}` }}></i>
                    </div>
                    
                    <ul className="highest">
                        Best Boulders: 
                        {teams[team._id] && teams[team._id].boulders ? teams[team._id].boulders.map((grade, idx) => (<li key={idx} > {grade} </li>)): null} </ul> 
                    <ul className="highest">
                        Best Ropes: 
                        { teams[team._id] && teams[team._id].ropes ? teams[team._id].ropes.map((grade, idx) => (<li key={idx}> {grade} </li>)) : null } </ul > 
                    
                        Captain: {users[team.captain] ? users[team.captain].username : null}
                    <p>Members:</p>
                    <ul className="members">
                        {team.members.map((memberId, idx) => {
                            return users[memberId] ? <li key={idx}><Link to={`/profile/${memberId}`}>{users[memberId].username}</Link></li> : null
                        })}
                    </ul>
                </li>
            )})
            return (
                 
                <div className="standings">
                    {/* <div className="changelog">
                        <div >Changelog:</div>
                        <div>2/19: Added most recent session data.</div>
                        <div>2/19: Changed headers to match climb type in profile.</div>
                    </div> */}
                    
                    <div className="standings-title">Team Rankings: (last 2 weeks)</div>
                    <ul className="teams">
                        {teamLis}
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