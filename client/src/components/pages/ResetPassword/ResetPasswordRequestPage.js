import React from 'react';
import useAccount from '../../../hooks/account.hook';
import { emailSchema } from '../../../validation';
import ResetPasswordPage from './ResetPasswordPage';

const ResetPasswordRequestPage = () => {
    const account = useAccount();

    return <ResetPasswordPage 
            type="email"
            inputLabel="Your email"
            pageMessage="Forgot your password?"
            pageSubmessage="Enter your email and we'll send you a password reset link."
            validationSchema={emailSchema}
            getData={account.resetPassword}
    />
};  

export default ResetPasswordRequestPage;
