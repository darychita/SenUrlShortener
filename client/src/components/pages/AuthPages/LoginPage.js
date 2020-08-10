import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../context/auth.context';
import AuthPage from './AuthPage';
import * as yup from 'yup';
// import * as authService from '../../../service/auth.service';

const LoginPage = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const links = [
        { text: 'Forgot password?'},
        { text: 'Don\'t have an account yet? Sign up', href: '/register'}
    ];

    const primaryLabels = [
        {
            label: 'Your email',
            name: 'email'
        }, { 
            label: 'Your password',
            name: 'password'
        }];

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup
                    .string().min(7)
                    .matches(/.*[0-9].*/, 'Password must contain at least one digit')
                    .required()
    });

    const onSubmit = async (loginData) => {
        await auth.login(loginData);
        history.push('/');
    };

    return (
        <AuthPage 
            mainColor="primary" 
            title="Log in"    
            validationSchema={validationSchema}
            textFieldsLabels={primaryLabels}
            links={links}
            onSubmit={onSubmit}
        />
    );
};

export default LoginPage;
