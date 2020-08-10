import React from 'react';
import AuthPage from './AuthPage';
import * as yup from 'yup';

const RegistrationPage = () => {
    const links = [
        { text: 'Already registered? Sign in', href: '/login'}
    ];

    const primaryLabels = [
        {
            label: 'Your username',
            name: 'username',
            type: 'text'
        }, {
            label: 'Your email',
            name: 'email'
        }, { 
            label: 'Your password',
            name: 'password'
        }
    ];

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup
                    .string().min(7)
                    .matches(/.*[0-9].*/, 'Password must contain at least one digit')
                    .required(),
        username: yup
                    .string()
                    .min(6)
                    .matches(/^[A-Za-z0-9]+$/, 'The username must contain only letters and digits.')
                    .required()
    });

    return (
        <AuthPage 
            mainColor="secondary" 
            title="Sign up"
            textFieldsLabels={primaryLabels}
            validationSchema={validationSchema}
            links={links}
        />
    );

};


export default RegistrationPage;
