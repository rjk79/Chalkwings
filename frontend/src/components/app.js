import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { 
    // Route, 
    Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import StandingsContainer from './standings/standings_container';
import ProfileContainer from './profile/profile_container';
import ClimbComposeContainer from './climbs/climb_compose_container';
import SearchComponent from './search/search'
import TeamsComponent from './teams/create_team'
import TeamComponent from './teams/team_container'
import DashboardComponent from './dashboard/dashboard'
import TrainingGuideComponent from './guides/training_guide'

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

// import FortyTips from './guides/fortyTips'
import Chat from './chat/chat'
import '../assets/stylesheets/app.css'
const App = () => (
    <div className="app">
    
    <NavBarContainer />

    <Switch className="container-fluid">
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        {/* <Route exact path="/fortytips" component={FortyTips} /> */}
        
        <ProtectedRoute exact path="/chat" component={Chat} />

        <ProtectedRoute exact path="/standings" component={StandingsContainer} />
        <ProtectedRoute exact path={`/profile/:userId`} component={ProfileContainer} />
        <ProtectedRoute exact path="/new_boulder" component={ClimbComposeContainer} />
        <ProtectedRoute exact path="/search" component={SearchComponent} />
        <ProtectedRoute exact path="/teams" component={TeamsComponent} />
        <ProtectedRoute exact path="/teams/:teamId" component={TeamComponent} />
        <ProtectedRoute exact path="/dashboard" component={DashboardComponent} />
        <ProtectedRoute exact path="/guide" component={TrainingGuideComponent} />
    </Switch>
    </div>
);

export default App;