import React from 'react';
import io from "socket.io-client";
import {merge} from 'lodash'
import '../../assets/stylesheets/chat.css'
import { connect } from 'react-redux';

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
            draft: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateMessages = this.updateMessages.bind(this)
    }
    componentDidMount(){

        socket.on('receive', this.updateMessages)
    }

    updateMessages(message){
        let newState = merge({}, this.state)
        newState.messages.push(message)
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
        socket.emit('send', {username: this.props.currentUser.username, text: this.state.draft})
        this.setState({draft: ""})
    }
    render() {
        let messages = this.state.messages.map((message, idx) => (
            <li key={idx}><strong>{message.username}:</strong> {message.text}</li>
        ))
        return (
            <div className="chat">
                <h2>Discussion</h2>
                <ul className="messages">
                {messages} 
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input className="draft" type="text" value={this.state.draft} onChange={this.handleChange()} />
                    <input className="send-button" type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Chat);