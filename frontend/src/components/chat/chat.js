import React from 'react';
import io from "socket.io-client";
import {merge} from 'lodash'
import '../../assets/stylesheets/chat.css'
import { connect } from 'react-redux';
import * as MessageAPIUtil from '../../util/message_api_util'

const socket = io()

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
    };
};
 

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            messages: [{username: "Chalkwings", text: "Welcome to chat!"}],
            draft: "",
            timestamps: [],
            chatters: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateMessages = this.updateMessages.bind(this)
    }
    formatTime(date){
        date = new Date(Date.parse(date))
        date = date.toString()
        let hours = parseInt(date.slice(16, 18))
        let oldHours = hours
        if (hours > 12) hours -= 12
        if (hours === 0) hours += 12
        hours = hours.toString()
        return (
            <div className="timestamp">
                {date.slice(0, 10) }&nbsp; 
                {hours}:
                {date.slice(19, 21)}
                {oldHours < 12 ? "am" : "pm"}
                &nbsp;EST
            </div>
        )
    }
    componentDidMount(){
        const { currentUser } = this.props

        MessageAPIUtil.getMessages().then(res => {
            
            this.setState({ messages: res.data }, () => {
                let timestamps = []
                timestamps.push(0)
                let i = 1
                while (i < this.state.messages.length) {
                    if (this.state.messages[i].date.slice(11, 13) !== this.state.messages[i-1].date.slice(11, 13)) { //by hour
                        timestamps.push(i)
                    }
                    i++
                }
                this.setState({timestamps})
            })})
        socket.on('receive', this.updateMessages)

        socket.emit('send chatter', currentUser.username)
        socket.on('receive chatter', chatters => this.setState({chatters}))
        
    }

    updateMessages(message){
        let newState = merge({}, this.state)
        newState.messages.push(message)
        const len = newState.messages.length
        let prevTimestamps = [...this.state.timestamps]
        if (newState.messages[len - 1].date.slice(16, 18) !== newState.messages[len - 2].date.slice(16, 18)){
            this.setState({timestamps: prevTimestamps.concat([len-1])})
        }
        this.setState(newState)
        let messages = document.getElementsByClassName("messages")[0]
        messages.scrollTop = messages.scrollHeight;
    }

    componentWillUnmount(){
        socket.off('receive')
    }
    handleChange(){
        return e => this.setState({
            draft: e.currentTarget.value
        });
    }
    handleSubmit(e){
        e.preventDefault()
        const {currentUser} = this.props
        if (this.state.draft.length > 0){
        socket.emit('send', {username: currentUser.username, text: this.state.draft, date: new Date() + ""})
        // post to db so later users can load the msg
        MessageAPIUtil.writeMessage({text: this.state.draft, username: currentUser.username})
        this.setState({draft: ""})}
    }

    render() {
        
        const {currentUser} = this.props
        console.log(this.state.messages)
        let messages = this.state.messages.map((message, idx) => (
            <>
                <li key={idx}>
                {this.state.timestamps.includes(idx) ? this.formatTime(message.date) : null}

                <strong className="sender" data-currentUser={currentUser.username === message.username}>
                        {idx > 0 && message.username === this.state.messages[idx - 1].username ? <>&nbsp;&nbsp;&nbsp;&nbsp;</>: message.username + ": " }
                </strong> 
                    {message.text}
                </li>
            </>
        ))
        return (
            <div className="chat">
                <h2>Discussion </h2>
                <ul className="messages">
                {messages} 
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input className="draft" type="text" value={this.state.draft} onChange={this.handleChange()} />
                    <input className="send-button" type="submit" value="Send" />
                </form>
                {/* <h4>Online:</h4>
                <ul>
                    {this.state.chatters.map((chatter,idx)=>(
                        <li key={idx}>{chatter}</li>
                    ))}
                </ul> */}
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Chat);