import React from 'react'
import * as UserAPIUtil from '../../util/user_api_util'
import {Link} from 'react-router-dom'
import '../../assets/stylesheets/search.css'
class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {query: "",
            results: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault()
        
        UserAPIUtil.getUsers(this.state.query)
            .then(res => this.setState({results: res.data}))
            .catch(err => console.log(err))
        this.setState({query: ""})
        
    }
    handleChange(){
        return e => this.setState({
            query: e.currentTarget.value
        })
    }
    render(){
        let users = this.state.results.map(result => (
            <li><Link to={`/profile/${result.id}`}>{result.username}</Link></li>
        ))
        return (
            <div className="search">
                <h1>Search</h1>
                <form onSubmit={this.handleSubmit}>
                    <input autoFocus onChange={this.handleChange()} value={this.state.query} placeholder="Enter username" />
                    <input type="submit" value="Search"/>
                </form>
                {this.state.results.length !== 0 ? <h3>Search Results:</h3> : null}
                <ul>
                    {users}
                </ul>
                {/* <img src={require("../../assets/images/mascotfly.png")} alt="mascotstand" /> */}

            </div>
        )
    }
}

export default Search