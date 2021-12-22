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

        this.node = React.createRef();
    }

    componentDidMount(){
        // window.addEventListener('click', (e) => {
        //     if (!this.node || !this.node.current) return;
        //     if (!this.node.current.contains(e.target)) {
        //         this.setState({linksShowing: false})
        //     }
        // })
    }

    componentWillUnmount(){

    }

    handleBlur(){

        this.setState({ linksShowing: false })
    }
    logoutUser(e) {
        e.preventDefault();
        this.setState({ linksShowing: false }, this.props.logout)

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
            if ( this.state.linksShowing ){
                return (
                    <>
                        <div className="links1" ref={this.node}>
                                <Link onClick={this.handleClickLink} to={`/profile/${this.props.currentUser.id}`}><i className="fas fa-user"></i>&nbsp;Profile</Link>
                                <Link onClick={this.handleClickLink} to={'/new_boulder'}><i className="fas fa-edit"></i>&nbsp;Add Session</Link>
                            <Link onClick={this.handleClickLink} to={'/guide'}><i className="fas fa-book"></i>&nbsp;Workout Guides</Link>
                            {/* <Link onClick={this.handleClickLink} to={'/dashboard'}>Dashboard</Link> */}
                                <Link onClick={this.handleClickLink} to={'/search'}><i className="fas fa-search"></i>&nbsp;Find User</Link>
                                <Link onClick={this.handleClickLink} to={'/chat'}><i className="fas fa-comment"></i>&nbsp;Need Help?</Link>
                                <Link onClick={this.handleClickLink} to={'/teams'}>Create Team</Link>
                                <Link onClick={this.handleClickLink} to={'/standings'}>
                                    {/* <i className="fas fa-home"></i> */}
                                    View Teams</Link>
                                <button className="logout-button" onClick={this.logoutUser}><i className="fas fa-sign-out-alt"></i>&nbsp;Log out</button>
                        </div>

                    </>
                );
            } else {
                return null
            }
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
        const topbunClass = this.state.linksShowing ? " clock" : ""
        const pattyClass = this.state.linksShowing ? " hidden" : ""
        const botbunClass = this.state.linksShowing ? " counterclock" : ""
        const hamburger = <div onClick={this.handleClickHamburger} className="hamburger">
            <div className={'topbun' + topbunClass}></div>
            <div className={'patty' + pattyClass}></div>
            <div className={'botbun' + botbunClass}></div>
            </div>
        return (
            <div className="navbar">
                <div className="navbar-half1">
                {this.props.loggedIn ? hamburger : null}

                <Link className="appname" to="/"> Chalkwings </Link>
                </div>
                {this.getLinks()}
                {this.props.loggedIn ? <div className="navbar-half2">{this.props.currentUser.username} </div> : null}
            </div>
        );
    }
}

export default NavBar;