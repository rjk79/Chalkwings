import React from 'react';
import { withRouter } from 'react-router-dom';
import * as TeamAPIUtil from '../../util/team_api_util'
import '../../assets/stylesheets/standings.css'
// import BoulderBox from './boulder_box';

class Standings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: []
        }
    }
    componentDidMount(){
        const {fetchTeam} = this.props
        TeamAPIUtil.getTeams()
            .then(res => {
                
                this.setState({ teams: res.data }, () => {
                    
                    for(let i=0;i<this.state.teams.length;i++){
                        fetchTeam(this.state.teams[i]._id)
                    }
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        // const links = <Link to="/fortytips"> Forty Tips for Bouldering </Link>
        
        if (this.state.teams.length === 0) {
            return (<div>
                {/* {links} <br/>  */}
                There is no recent activity.</div>)
        } else {
            const {users} = this.props
            let teams = this.state.teams.map((team, idx) => (
                <li key={idx}>
                <p>{team.name} &nbsp;
                    <div>
                    <i className={`fas fa-${team.symbol}`} style={{ color: `${team.color}` }}></i>
                    </div>
                </p>
                Captain: {users[team.captain] ? users[team.captain].username : null}
                <p>Members:</p>
                <ul className="members">
                    {team.members.map((memberId, idx) => {
                        return users[memberId] ? <li key={idx}>{users[memberId].username}</li> : null
                    })}
                </ul>
                </li>
            ))
            return (
                 
                <div className="standings">
                    
                    
                    <div className="standings-title">Teams:</div>
                    <ul className="teams">
                        {teams}
                    </ul>
                    {/* {this.state.boulders.map(boulder => (
                        <BoulderBox key={boulder._id} name={boulder.name} grade={boulder.grade} date={boulder.date} />
                    ))} */}
                    <h3>Changelog:</h3>
                    <div>Added timestamps to chat</div>
                    <div>Navbar is now hideable</div>
                </div>
            );
        }
    }
}

export default withRouter(Standings);