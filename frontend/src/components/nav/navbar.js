import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    // render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="links1">
                    <Link to={'/boulders'}>All Boulders</Link>
                    <Link to={'/chat'}>Chat</Link>
                    <Link to={`/profile/${this.props.currentUser.id}`}>Profile</Link>
                    <Link to={'/new_boulder'}>Add Session</Link>
                    <Link to={'/search'}>Search for User</Link>
                    <button className="logout-button" onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="links2">
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="navbar">
                <Link className="appname" to="/"> Chalkwings </Link>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;