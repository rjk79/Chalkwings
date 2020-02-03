import React from 'react'
import '../../assets/stylesheets/team.css'
class Team extends React.Component {
    constructor(props){
        super(props)
        this.handleDeleteMember = this.handleDeleteMember.bind(this)
        this.handleDeleteTeam = this.handleDeleteTeam.bind(this)

    }
    componentDidMount(){
        this.props.fetchTeam(this.props.match.params.teamId)
        
    }
    handleDeleteMember(idx){
        return () => {
            let team = this.props.teams[this.props.match.params.teamId]
            team.members.splice(idx, 1)
            this.props.updateTeam(team)
        }
    }
    handleDeleteTeam(){
        this.props.deleteTeam(this.props.match.params.teamId)
        this.props.history.push('/standings');
    }
    render(){
        const {teams, users} = this.props
        
        let teamDiv
        if (teams[this.props.match.params.teamId]) {
            let team = teams[this.props.match.params.teamId]
            teamDiv = <div>
                        <div className="team-category">Name:</div>
                        {team.name} <br/>
                        <div className="team-category">Captain:</div>
                        {users[team.captain].username} <br />
                        <div className="team-category">Members:</div>
                        
                        {team.members.map((memberId, idx) => 
                            <li key={idx}>{users[memberId].username}{memberId !== team.captain ? <button onClick={this.handleDeleteMember(idx)}>Remove</button>:null}</li>
                        )}
                    <button onClick={this.handleDeleteTeam}>Delete Team</button>
                    </div>}
       
        
        return (
            <>
            <div className="team">
                <div>
                    Team Dashboard
                </div>
                {teamDiv}
            </div>
            </>
        )
    }
}

export default Team