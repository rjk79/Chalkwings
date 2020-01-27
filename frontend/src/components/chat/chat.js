import React from 'react';
import io from "socket.io-client";
import {merge} from 'lodash'
import '../../assets/stylesheets/chat.css'

const socket = io()

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            draft: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateMessages = this.updateMessages.bind(this)
    }
    componentDidMount(){
        // let el;

        // socket.on('time', function (timeString) {
        //     el = document.getElementById('server-time')
        //     el.innerHTML = 'Server time: ' + timeString;
        // });

        socket.on('receive', this.updateMessages)
    }

    updateMessages(message){
        let newState = merge({}, this.state)
        newState.messages.push(message)
        this.setState(newState)
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
        socket.emit('send', this.state.draft)
        this.setState({draft: ""})
    }
    render() {
        let messages = this.state.messages.map(message => (
            <li>{message}</li>
        ))
        return (
            <div>
                {/* <div id='server-time'>
                </div>   */}
                <ul className="messages">
                {messages} 
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.draft} onChange={this.handleChange()} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Chat;