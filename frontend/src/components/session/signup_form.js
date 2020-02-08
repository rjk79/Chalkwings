import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../../assets/stylesheets/signup_form.css'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
        this.handleBlur = this.handleBlur.bind(this)
    }
    componentDidMount(){
        document.getElementsByClassName("username")[0].addEventListener('focus', this.handleClick)
        document.getElementsByClassName("username")[0].addEventListener('blur', this.handleBlur)
        document.getElementsByClassName("password")[0].addEventListener('focus', this.handleClick)
        document.getElementsByClassName("password")[0].addEventListener('blur', this.handleBlur)
        document.getElementsByClassName("password2")[0].addEventListener('focus', this.handleClick)
        document.getElementsByClassName("password2")[0].addEventListener('blur', this.handleBlur)
    }
    componentWillUnmount(){
        document.getElementsByClassName("username")[0].removeEventListener('focus', this.handleClick)
        document.getElementsByClassName("username")[0].removeEventListener('blur', this.handleBlur)
        document.getElementsByClassName("password")[0].removeEventListener('focus', this.handleClick)
        document.getElementsByClassName("password")[0].removeEventListener('blur', this.handleBlur)
        document.getElementsByClassName("password2")[0].removeEventListener('focus', this.handleClick)
        document.getElementsByClassName("password2")[0].removeEventListener('blur', this.handleBlur)
    }
    handleClick(e) {
        let movingPlaceholder;
        switch (e.currentTarget.classList[0]) {
            case 'username':
                movingPlaceholder = document.getElementsByClassName("signup-moving-placeholder")[0]
                movingPlaceholder.style.top = '13px'
                movingPlaceholder.style.left = '5px'
                break
            case 'password':
                movingPlaceholder = document.getElementsByClassName("signup-moving-placeholder2")[0]
                movingPlaceholder.style.top = '58px'
                movingPlaceholder.style.left = '5px'
                break
            case 'password2':
                movingPlaceholder = document.getElementsByClassName("signup-moving-placeholder3")[0]
                movingPlaceholder.style.top = '103px'
                movingPlaceholder.style.left = '5px'
                break
            default:
                // movingPlaceholder = document.getElementsByClassName("signup-moving-placeholder")[0]
        }
        movingPlaceholder.style.fontSize = '10px'
        movingPlaceholder.style.WebkitTransition = 'top .1s, left .1s';
        movingPlaceholder.style.MozTransition = 'top .1s, left .1s';
    }
    handleBlur(e) {

        let movingPlaceholder
        switch (e.currentTarget.classList[0]) {
            case 'username':
                if (!this.state.username.length) {
                    movingPlaceholder = document.getElementsByClassName("signup-moving-placeholder")[0]
                    movingPlaceholder.style.top = '22px'
                    movingPlaceholder.style.left = '3px'
                    movingPlaceholder.style.fontSize = '14px'
                }
                break
            case 'password':
                if (!this.state.password.length) {
                    movingPlaceholder = document.getElementsByClassName("signup-moving-placeholder2")[0]
                    movingPlaceholder.style.top = '67px'
                    movingPlaceholder.style.left = '3px'
                    movingPlaceholder.style.fontSize = '14px'
                }
                break
            case 'password2':
                if (!this.state.password2.length) {
                    movingPlaceholder = document.getElementsByClassName("signup-moving-placeholder3")[0]
                    movingPlaceholder.style.top = '112px'
                    movingPlaceholder.style.left = '3px'
                    movingPlaceholder.style.fontSize = '14px'
                }
                break
            default:
                break
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user, this.props.history);
    }

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
            <div className="signup-form-container">
                <div className="title">CHALKWINGS</div>
                <img src={require("../../assets/images/mascotlie.png")} alt="mascotstand" />

                <form onSubmit={this.handleSubmit}>
                    <div className="signup-form">
                        <br />
                        <div className="signup-moving-placeholder">Username</div>

                        <input type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                            className="username"
                            // placeholder="Username"

                        />
                        <br />
                        <div className="signup-moving-placeholder2">Password</div>

                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            className="password"
                            // placeholder="Password"
                        />
                        <br />
                        <div className="signup-moving-placeholder3">Confirm Password</div>

                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            className="password2"
                            // placeholder="Confirm Password"
                        />
                        <br />
                        <input className="btn btn-primary" type="submit" value="Sign Up" />
                        {this.renderErrors()}
                    </div>
                </form>
                <Link className="" to="/login"> Already registered? </Link>

            </div>
        );
    }
}

export default withRouter(SignupForm);