import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth.context';

const AuthBasedRoute = ({component: Component, expectedAuthValue, redirect, ...rest}) => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route 
            {...rest}
            render={props => (
                isAuthenticated === expectedAuthValue 
                ? <Component {...props} />
                : <Redirect to={redirect} />
            )}
        />
    );
};

export default AuthBasedRoute;
