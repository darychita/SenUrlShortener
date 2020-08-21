import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicRoute from '../wrappers/PublicRoute';
import useAuth from '../../hooks/auth.hook';
import AuthContext from '../../context/auth.context';
import AppHeader from '../AppHeader';
import { HomePage, 
        RegistrationPage, 
        LoginPage, 
        PersonalPage, 
        EmailConfirmPage, 
        ResetPasswordRequestPage, 
        ResetPasswordConfirmPage, 
        Page404,
        ProtectedLinkPage
} from '../pages';
import './App.scss';

const App = () => {

    const { isAuthenticated, login, logout } = useAuth();

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            <Router>
                <AppHeader />
                <Switch>
                    <Route path="/" 
                        exact 
                        component={isAuthenticated ? PersonalPage : HomePage} 
                    />
                    <Route path="/protected/:endpoint" component={ProtectedLinkPage} />
                    <PublicRoute path="/login" component={LoginPage} />
                    <PublicRoute path="/register" component={RegistrationPage} />
                    <PublicRoute path="/register/confirm/:token" component={EmailConfirmPage} />
                    <PublicRoute path="/password/reset" component={ResetPasswordRequestPage} />
                    <PublicRoute path="/reset/:token" component={ResetPasswordConfirmPage} />
                    <Route path="/404" exact component={Page404} />
                    <Route path="*" component={Page404} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
