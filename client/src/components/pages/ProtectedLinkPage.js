import React from 'react';
import useRedirect from '../../hooks/redirect.hook';
import PasswordForm from '../PasswordForm';
import InfoPage from './InfoPage';

const ProtectedLinkPage = ({ match: { params: { endpoint } }}) => {
    const { requestProtectedEndpoint } = useRedirect(endpoint);

    const submitHandler = (password) => {
        return requestProtectedEndpoint(password);
    };

    const form = (
        <PasswordForm
            label="Endpoint password"
            type="password"
            submit={submitHandler}
        />
    );


    return (
        <InfoPage 
            message="Protected link"
            subMessage="Enter the password to see the link"
            render={() => form}
        />
    );
};

export default ProtectedLinkPage;
