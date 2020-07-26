import React from 'react';
import AppHeader from '../AppHeader';
import { HomePage, RegistrationPage, LoginPage } from '../pages';
import './App.scss';

const App = () => {
    return (
        <>
            <AppHeader />
            <LoginPage />
            {/* <HomePage /> */}
        </>
    );
};

export default App;
