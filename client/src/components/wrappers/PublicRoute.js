import React from 'react';
import AuthBasedRoute from './AuthBasedRoute';

const PublicRoute = (props) => (
    <AuthBasedRoute 
        expectedAuthValue={false} 
        redirect="/"
        exact
        {...props}
    />
);

export default PublicRoute;
