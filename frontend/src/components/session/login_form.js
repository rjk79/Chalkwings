import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../../assets/stylesheets/login_form.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.handleBlur = this.handleBlur.bind(this)
        this.handleDemo = this.handleDemo.bind(this)
    }
    handleDemo(){
        let user = {
            username: "Guest",
            password: "password"
        };
        this.props.login(user);
    }
    handleFocus(e){
        let movingPlaceholder
        switch (e.currentTarget.classList[0]){
            case 'input-username':
                movingPlaceholder = document.getElementsByClassName("moving-placeholder")[0]
                break
            case 'input-password':
                movingPlaceholder = document.getElementsByClassName("moving-placeholder2")[0]
                break
            default:
        }
        movingPlaceholder.style.top = '-30%'
        movingPlaceholder.style.left = '5%'
        movingPlaceholder.style.fontSize = '10px'
        movingPlaceholder.style.color = 'rgb(0, 223, 223)'

        movingPlaceholder.style.WebkitTransition = 'top .1s, left .1s';
        movingPlaceholder.style.MozTransition = 'top .1s, left .1s';
    }
    handleBlur(e){

        let movingPlaceholder
        switch (e.currentTarget.classList[0]) {
            case 'input-username':
                movingPlaceholder = document.getElementsByClassName("moving-placeholder")[0]
                if (!this.state.username.length) {
                    movingPlaceholder.style.top = '11%'
                    movingPlaceholder.style.left = '5%'
                    movingPlaceholder.style.fontSize = '14px'
                }
                break
            case 'input-password':
                movingPlaceholder = document.getElementsByClassName("moving-placeholder2")[0]
                if (!this.state.password.length) {
                movingPlaceholder.style.top = '11%'
                movingPlaceholder.style.left = '5%'
                movingPlaceholder.style.fontSize = '14px'
                }
                break
            default:
        }
        movingPlaceholder.style.color = 'gray'

    }

    componentDidMount(){
        document.getElementsByClassName("input-username")[0].addEventListener('focus', this.handleFocus)
        document.getElementsByClassName("input-username")[0].addEventListener('blur', this.handleBlur)
        document.getElementsByClassName("input-password")[0].addEventListener('focus', this.handleFocus)
        document.getElementsByClassName("input-password")[0].addEventListener('blur', this.handleBlur)
    }
    componentWillUnmount() {
        document.getElementsByClassName("input-username")[0].removeEventListener('focus', this.handleFocus)
        document.getElementsByClassName("input-username")[0].removeEventListener('blur', this.handleBlur)
        document.getElementsByClassName("input-password")[0].removeEventListener('focus', this.handleFocus)
        document.getElementsByClassName("input-password")[0].removeEventListener('blur', this.handleBlur)
    }
    // Once the user has been authenticated, redirect to the index page
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push(`/guide`);
        }

        // Set or clear errors
        this.setState({ errors: nextProps.errors })
    }

    // Handle field updates (called in the render method)
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(user);
    }

    // Render the session errors if there are any
    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="login-form-container">
                <div className="title">CHALKWINGS</div>
                <img src={require("../../assets/images/mascotlie.png")} alt="mascotstand" />

                <form onSubmit={this.handleSubmit}>
                    <div className="login-form">
                        <div>
                            <div className="moving-placeholder">Username</div>
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                placeholder=""
                                className = "input-username"
                            />
                        </div>
                        <br />
                        <div>
                            <div className="moving-placeholder2">Password</div>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder=""
                                className="input-password"

                            />
                        </div>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Log In" />
                        {this.renderErrors()}
                    <Link className="" to="/signup"> Are you a new user? </Link>
                    <button className="demo-button" onClick={this.handleDemo}>Skip Log In</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);