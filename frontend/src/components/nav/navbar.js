import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {linksShowing: false}
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }
    handleClick(){
        this.setState({linksShowing: !this.state.linksShowing})
    }
    // render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <>
                {this.state.linksShowing ?
                    
                    <div className="links1">
                        <Link to={'/standings'}>Home</Link>
                        <Link to={'/chat'}>Channel</Link>
                        <Link to={`/profile/${this.props.currentUser.id}`}>Profile</Link>
                        <Link to={'/new_boulder'}>Session</Link>
                        <Link to={'/teams'}>Teams</Link>
                        <Link to={'/search'}><i className="fas fa-search"></i></Link>
                        <button className="logout-button" onClick={this.logoutUser}><i className="fas fa-sign-out-alt"></i></button>
                    </div>
                : null}
                </>
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
                {this.props.loggedIn ? <i className="fas fa-bars" onClick={this.handleClick}></i> : null}

                <Link className="appname" to="/"> Chalkwings </Link>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;