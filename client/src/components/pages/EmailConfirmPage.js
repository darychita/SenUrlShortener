import React, { useEffect, useState } from 'react';
import useAccount from '../../hooks/account.hook';
import InfoPage from './InfoPage';

const EmailConfirmPage = ({ match: { params: { token } }}) => {
    const account = useAccount();
    const [ message, setMessage ] = useState(null);

    useEffect(() => {
        account
            .confirmRegistartion(token)
            .then(message => setMessage(message));
    }, []);

    return <InfoPage message={message} />;
};  

export default EmailConfirmPage;
