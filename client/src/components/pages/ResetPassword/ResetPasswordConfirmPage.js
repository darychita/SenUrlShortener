import React, { useEffect, useState } from 'react';
import useAccount from '../../../hooks/account.hook';
import { passwordSchema } from '../../../validation';
import ResetPasswordPage from './ResetPasswordPage';
import InfoPage from '../InfoPage';

const ResetPasswordConfirmPage = ({ match: { params: { token } }}) => {
    const [ tokenExists, setTokenExists ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);

    const account = useAccount();

    useEffect(() => {
        account
            .resetPasswordExists(token)
            .catch((e) => { 
                    setTokenExists(false); 
                    setErrorMessage(e.message)
                });
    }, [ ]);

    if(!tokenExists) {
        return <InfoPage 
                    message={errorMessage}
                />
    }

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
