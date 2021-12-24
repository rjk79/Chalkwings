import React from 'react';
import {Link} from 'react-router-dom'
import '../../assets/stylesheets/main_page.css'

class MainPage extends React.Component {

    render() {
        return (
            <div className="main-page">

                <div className="welcome-box">
                    {/* <div className="rotater"></div> */}
                    <div className="img-holder">
                <img src={require("../../assets/images/mascotstand.png")} alt="mascotstand"/>
                    </div>
                <div>climb socially + see your progress</div>
                <Link className="get-started btn btn-primary" to="/login">Get Started</Link>
                </div>
                <footer>
                    <div className="social-links">
                        <a className="social-link" href="https://github.com/rjk79" target="_blank" rel="noopener noreferrer">
                            <img className="icon" src={require("../../assets/images/github.png")} alt="github"/>
                        <i className="fas fa-external-alt-link" />  <i className="fas fa-external-link-alt"></i> </a>
                        <a className="social-link" href="https://www.linkedin.com/in/robert-ku-b9464461" target="_blank" rel="noopener noreferrer">
                            <img className="icon" src={require("../../assets/images/linkedin.png")} alt="linkedin"/>
                        <i className="fas fa-external-alt-link" />  <i className="fas fa-external-link-alt"></i> </a>

                    </div>
                </footer>
            </div>
        );
    }
}

export default MainPage;