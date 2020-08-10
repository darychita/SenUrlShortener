import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthBasedRoute from '../wrappers/AuthBasedRoute';
import useAuth from '../../hooks/auth.hook';
import AuthContext from '../../context/auth.context';
import AppHeader from '../AppHeader';
import { HomePage, RegistrationPage, LoginPage, PersonalPage } from '../pages';
import './App.scss';

const App = () => {

    const { isAuthenticated, login, logout } = useAuth();

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            <Router>
                <AppHeader />
                <Route path="/" 
                    exact 
                    component={isAuthenticated ? PersonalPage : HomePage} 
                />
                <AuthBasedRoute 
                    path="/login" 
                    expectedAuthValue={false} 
                    redirect="/" 
                    exact component={LoginPage} 
                />
                <AuthBasedRoute 
                    path="/register" 
                    expectedAuthValue={false} 
                    redirect="/" 
                    exact component={RegistrationPage} 
                />
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
