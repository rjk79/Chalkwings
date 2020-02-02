import React from 'react'
import '../../assets/stylesheets/create_team.css'
import * as UserAPIUtil from '../../util/user_api_util'
import * as TeamAPIUtil from '../../util/team_api_util'
import {merge} from 'lodash'
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
    }
}
class CreateTeam extends React.Component {
    constructor(props){
        super(props)
        const {id, username} = this.props.currentUser
        this.state = {
            symbol: "",
            color: "",
            name: "",
            query: "",
            results: [],
            teammates: [{id, username}]
        }
        console.log(id, username)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleBlur = this.handleBlur.bind(this)
    }
    componentDidMount(){

        const debounce = (func, delay) => {
            let debounceTimer
            return function () {
                const context = this
                const args = arguments
                clearTimeout(debounceTimer)
                debounceTimer = setTimeout(() => func.apply(context, args), delay)
            }
        }

        const self = this
        var input = document.getElementsByClassName("debounce")[0];
        
        input.addEventListener('keydown', 
            debounce(function () {
            UserAPIUtil.getUsers(self.state.query)
                .then(res => {
                    console.log("searched")
                    self.setState({ results: res.data })})
                .catch(err => console.log(err))
            
            
            }, 1000)
        ); 
    }
    handleClick(type, value){
        return e => this.setState({
            [type]: value //literal syntax for key
        // }, () => {
        //     if (type === 'symbol') {
        //         document.getElementsByClassName('dropdown-content')[0].style.display = "none"
        //     }
        //     else if (type === 'color') {
        //         document.getElementsByClassName('dropdown2-content')[0].style.display = "none"
        //     }
        })
        
    }
    handleChangeName() {
        return e => this.setState({ name: e.currentTarget.value })
    }
    handleChangeQuery(){
        return e => this.setState({ query: e.currentTarget.value })
    }
    handleClickResult(value){
        return e => {
            let newState = merge({}, this.state)
            newState.teammates.push(value)
            if(newState.teammates.length > 5) newState.teammates.pop()
            this.setState(newState)
            this.setState({results: []})
        }
    }
    handleSubmit(e){
        e.preventDefault()
        const {name, symbol, color, teammates} = this.state
        
        TeamAPIUtil.createTeam({
            name,
            captain: this.props.currentUser.id,
            symbol,
            color,
            members: teammates.map(teammate => teammate.id)
        }).then(res => {
            this.props.history.push('/standings')
        })
    }
    handleBlur(){
        // this.setState({results: []})
    }
    render(){
        let symbols = ["cat", "crow", "dog", "dove", "dragon", "fish", "frog", "hippo", "horse", "kiwi-bird", "otter", "spider", 
                    "ice-cream", "hotdog", "drumstick-bite", "bacon", "cheese", "pepper-hot", "pizza-slice", "hamburger",
            "ghost", "heart", "sun", "baby-carriage", "beer", "carrot", "hiking", "bug", "mountain", "rocket"]
        symbols = symbols.map((symbol, idx) => (
            <li key={idx} onClick={this.handleClick("symbol", symbol)} ><i className={`fas fa-${symbol}`}></i></li>)
        )
        let colors = ["red", "orange", "gold", "green", "blue", "purple", "pink", "brown", "black"]
        colors = colors.map((color, idx) => (
            <li key={idx} onClick={this.handleClick("color", color)} className="color" style={{background: color}}> </li>)
        )
        let results = this.state.results.map((result, idx) => (
            <li key={idx} onClick={this.handleClickResult(result)}>{result.username}</li>
        ))
        let teammates = this.state.teammates.map((teammate, idx) => (            
            <li key={idx}>{teammate.username}</li>
        ))
        return (
            <div className="create-team">
                <h2>Create Team</h2>
                <form onSubmit={this.handleSubmit}>
                    <p>Name:</p>
                    <input onChange={this.handleChangeName()} value={this.state.name} />
                    <p>Captain:</p>(You!)
                    <p>Symbol:</p>
                    <div className="dropdown">
                        {this.state.symbol === "" ? "Choose..." : this.state.symbol}
                        <ul className="dropdown-content">
                            {symbols}
                        </ul>
                    </div>

                    <p>Color:</p>
                    <div className="dropdown2">
                        {this.state.color === "" ? "Choose..." : this.state.color}

                        <ul className="dropdown2-content">
                            {colors}
                        </ul>
                    </div>
                    {this.state.symbol !== "" && this.state.color !== "" ? <i style={{ color: this.state.color }} className={`fas fa-${this.state.symbol} preview`}></i> : null}

                    <p>Members: (limit 5)</p>
                    <ul>{teammates}</ul><input onBlur={this.handleBlur} onChange={this.handleChangeQuery()} className="debounce" value={this.state.query} placeholder="Start typing..." />
                    {this.state.results.length > 0 ? 
                    <div>
                        <ul className="results">{results}</ul>
                    </div> : null}
                    <input type="submit" value="Submit" />
                </form>

            </div>
        )
    }
}
export default connect(mapStateToProps, null)(CreateTeam)