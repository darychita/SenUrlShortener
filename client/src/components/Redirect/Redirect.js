import React from 'react';
import { Redirect as RouterRedicrect } from 'react-router-dom';
import useRedirect from '../../hooks/redirect.hook';

const Redirect = ({ match: { params: { endpoint } }}) => {
    const redirect = useRedirect(endpoint);
    console.log(redirect);

    // if (redirect.redirecting) {
    //     return null;

    //     // return <RouterRedicrect to={redirect.redirecting} />;
    // }
    return (
        <div>REDIRECT :))0</div>
    );
};

export default Redirect;
