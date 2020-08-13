import React, { useState } from 'react';
import InfoPage from '../InfoPage';
import ResetPasswordForm from '../../ResetPasswordForm';
import { Typography } from '@material-ui/core';

const ResetPasswordPage = ({ 
                getData, type, 
                validationSchema, inputLabel, 
                pageMessage, pageSubmessage 
}) => {
    const [ submitted, setSubmitted ] = useState('');

    const submit = async (value) => {
        try {
            await validationSchema.validate({ [type]: value });
        } catch(e) {
            throw new Error(e.message);
        }
        try {
            const resp = await getData(value);
            setSubmitted(resp);
        } catch(e) {
            throw new Error(e.message);
        }
    }; 

    const renderForm = () => <ResetPasswordForm 
                            type={type}
                            label={inputLabel} 
                            submit={submit}
                        />;
     
    const renderReady = () => <Typography align="center" variant="h4">
                                {submitted}
                            </Typography>
    return (
        <InfoPage 
            // message=
            message={pageMessage}
            // subMessage="Enter your email and we'll send you a password reset link."
            subMessage={pageSubmessage}
            render={submitted ? renderReady : renderForm}
        />
    )
};  

export default ResetPasswordPage;
