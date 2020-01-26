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
                    <Link to={'/climbs'}>All Climbs</Link>
                    <Link to={'/profile'}>Profile</Link>
                    <Link to={'/new_climb'}>Create A Climb</Link>
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