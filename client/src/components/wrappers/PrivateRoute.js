import React from 'react';
import AuthBasedRoute from './AuthBasedRoute';

const PrivateRoute = (props) => (
    <AuthBasedRoute 
        expectedAuthValue={true} 
        redirect="/login"
        exact
        {...props}
    />
);

export default PrivateRoute;
