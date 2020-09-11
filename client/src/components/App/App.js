import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PublicRoute from '../wrappers/PublicRoute';
import PrivateRoute from '../wrappers/PrivateRoute';
import useAuth from '../../hooks/auth.hook';
import useLink from '../../hooks/links.hook';
import AuthContext from '../../context/auth.context';
import LinksContext from '../../context/links.context';

import AppHeader from '../AppHeader';
import { HomePage, 
        RegistrationPage, 
        LoginPage, 
        PersonalPage, 
        EmailConfirmPage, 
        ResetPasswordRequestPage, 
        ResetPasswordConfirmPage, 
        Page404,
        ProtectedLinkPage,
        SettingsPage
} from '../pages';
import './App.scss';

const App = () => {

    const { isAuthenticated, login, logout, deleteTokens } = useAuth();

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, deleteTokens }}>
            <Router>
                <AppHeader />
                <Switch>
                    <Route path="/" 
                        exact 
                        component={isAuthenticated ? PersonalPage : HomePage } 
                    />
                    <PublicRoute path="/login" component={LoginPage} />
                    <Route path="/protected/:endpoint" exact component={ProtectedLinkPage} />
                    <PublicRoute path="/register/confirm/:token" component={EmailConfirmPage} />
                    <PublicRoute path="/register" component={RegistrationPage} />
                    <PrivateRoute path="/settings" component={SettingsPage} />
                    <PublicRoute path="/password/reset" component={ResetPasswordRequestPage} />
                    <PublicRoute path="/reset/:token" component={ResetPasswordConfirmPage} />
                    <Route path="/404" exact component={Page404} />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
