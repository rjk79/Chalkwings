import React from 'react'
import * as TeamAPIUtil from '../../util/team_api_util'
import '../../assets/stylesheets/dashboard.css'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {query: "",
                    results: [],
                    discipline: "",
                    duration: "",
                    wager: "",
                    }
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(e){
        e.preventDefault()

        TeamAPIUtil.searchTeams(this.state.query)
            .then(res => {
                this.setState({ results: res.data })})
            .catch(err => {
                console.log(err)})
        this.setState({ query: "" })
    }
    handleChange(){
        return e => this.setState({query: e.currentTarget.value})
    }

    render(){
        let results = this.state.results.map((result, idx)=>(
            <li key={idx}>{result.name}</li>
        ))
        
        return (
           <div className="dashboard">
            <h1>Team Dashboard</h1>
            <h3>Edit Teammates</h3>
            <h3>Challenge Team</h3>
            <form onSubmit={this.handleSearch}>
                1. Find Team:
                <input onChange={this.handleChange()} placeholder="Start typing team name" value={this.state.query} />
                <button>Search for Teams</button>
                {results}

                2. Select Discipline:
                <input placeholder=""/>
                3. Choose Duration:
                <input placeholder=""/>
                4. Choose Wager:
                <input placeholder=""/>
                <input type="submit" value="Search" />
            </form>
            
            <button>Delete Team</button>
         </div>
       
        )
    }
}

export default Dashboard