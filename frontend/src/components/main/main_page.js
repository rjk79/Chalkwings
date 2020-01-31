import React from 'react';
import {Link} from 'react-router-dom'
import '../../assets/stylesheets/main_page.css'

class MainPage extends React.Component {

    render() {
        return (
            <div className="main-page">
                <div className="welcome-box">
                <h2>Hello!</h2>
                <img src={require("../../assets/images/mascotstand.png")} alt="mascotstand"/>
                <Link className="btn btn-primary" to="/login">Get Started</Link>
                </div>
                <footer>
                    
                </footer>
            </div>
        );
    }
}

export default MainPage;