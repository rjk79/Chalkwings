import React from 'react'
import * as UserAPIUtil from '../../util/user_api_util'
import {Link} from 'react-router-dom'

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
            <>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange()} value={this.state.query}/>
                    <input type="submit" value="Search for User"/>
                </form>
                <ul>
                    {users}
                </ul>
            </>
        )
    }
}

export default Search