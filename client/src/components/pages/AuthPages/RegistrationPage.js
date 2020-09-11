import React, { useState } from 'react';
import useAccount from '../../../hooks/account.hook';
import AuthPage from './AuthPage';
import RegistrationSuccessful from './RegistrationSuccessful';
import { registrationSchema } from '../../../validation';

const RegistrationPage = () => {
    console.log('registration')
    const [ formCompletedMessage, setFormCompleted ] = useState(null);
    const account = useAccount();

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

    const onSubmit = (data) => {
        return account
            .register(data)
            .then(message => setFormCompleted(message));
    };

    if (formCompletedMessage) {
        return <RegistrationSuccessful message={formCompletedMessage} />
    }

    return (
        <AuthPage 
            mainColor="secondary" 
            title="Sign up"
            textFieldsLabels={primaryLabels}
            validationSchema={registrationSchema}
            links={links}
            onSubmit={onSubmit}
        />
    );

};


export default RegistrationPage;
