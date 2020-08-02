import React from 'react';
import AppHeader from '../AppHeader';
import { HomePage, RegistrationPage, LoginPage, PersonalPage } from '../pages';
import './App.scss';

const App = () => {
    return (
        <>
            <AppHeader />
            {/* <LoginPage /> */}
            <HomePage />
            {/* <PersonalPage /> */}
        </>
    );
};

export default App;
