import React from 'react';
import useAccount from '../../../hooks/account.hook';
import { passwordSchema } from '../../../validation';
import ResetPasswordPage from './ResetPasswordPage';

const ResetPasswordConfirmPage = ({ match: { params: { token } }}) => {
    const account = useAccount();

    return <ResetPasswordPage 
                type="password"
                inputLabel="Your new password"
                pageMessage="Last step..."
                pageSubmessage="Enter your new strong password at least 7 chars long and has one digit."
                validationSchema={passwordSchema}
                getData={(value) => account.confirmResetPassword(token, value)}
            />

};  

export default ResetPasswordConfirmPage;
