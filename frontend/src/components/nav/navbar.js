import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {linksShowing: false}
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.handleClickHamburger = this.handleClickHamburger.bind(this)
        this.handleClickLink = this.handleClickLink.bind(this)
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }
    handleClickHamburger(){
        this.setState({linksShowing: !this.state.linksShowing})
    }
    handleClickLink(){
        this.setState({ linksShowing: false })
    }
    // render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <>
                {this.state.linksShowing ?
                    
                    <div className="links1">
                        <Link onClick={this.handleClickLink} to={'/standings'}><i className="fas fa-home"></i></Link>
                        <Link onClick={this.handleClickLink} to={'/chat'}>Channel</Link>
                        <Link onClick={this.handleClickLink} to={`/profile/${this.props.currentUser.id}`}>Profile</Link>
                        <Link onClick={this.handleClickLink} to={'/new_boulder'}>Session</Link>
                        <Link onClick={this.handleClickLink} to={'/teams'}>Teams</Link>
                        <Link onClick={this.handleClickLink} to={'/search'}><i className="fas fa-search"></i></Link>
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
                {this.props.loggedIn ? <i className="fas fa-bars" onClick={this.handleClickHamburger}></i> : null}

                <Link className="appname" to="/"> Chalkwings </Link>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;