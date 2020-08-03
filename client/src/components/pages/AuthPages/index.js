import React from 'react';
import AuthPage from './AuthPage';

const primaryLabels = ['Your email', 'Your password'];

const LoginPage = () => {
    const links = [
        { text: 'Forgot password?'},
        { text: 'Don\'t have an account yet? Sign up'}
    ];
    return (
        <AuthPage 
            mainColor="primary" 
            title="Log in"    
            textFieldsLabels={primaryLabels}
            links={links}
        />
    );
};

const RegistrationPage = () => {
    const links = [
        { text: 'Already registered? Sign in'}
    ];
    return (
        <AuthPage 
            mainColor="secondary" 
            title="Sign up"
            textFieldsLabels={['Your username', ...primaryLabels]}
            links={links}
        />
    );

};

export {
    RegistrationPage,
    LoginPage
};