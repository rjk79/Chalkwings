import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import ClimbsContainer from './climbs/climbs_container';
import ProfileContainer from './profile/profile_container';
import ClimbComposeContainer from './climbs/climb_compose_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

import FortyTips from './guides/fortyTips'
import Chat from './chat/chat'

const App = () => (
    <div>
    
    <NavBarContainer />

    <Switch className="container-fluid">
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <Route exact path="/fortytips" component={FortyTips} />
        <Route exact path="/chat" component={Chat} />

        <ProtectedRoute exact path="/climbs" component={ClimbsContainer} />
        <ProtectedRoute exact path="/profile" component={ProfileContainer} />
        <ProtectedRoute exact path="/new_climb" component={ClimbComposeContainer} />
    </Switch>
    </div>
);

export default App;