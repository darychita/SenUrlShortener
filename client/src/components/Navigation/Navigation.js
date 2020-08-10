import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth.context';
import { Typography, Button } from '@material-ui/core';
import './Navigation.scss';

const Navigation = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logout = async () => {
        await auth.logout();
        history.push('/');
    };

    const publicLinks = (
        <>
            <Link to="/login">
                <Typography variant="subtitle2" color="textPrimary">Log in</Typography>
            </Link>
            <Link to="/register">
                <Button variant="contained" color="secondary" size="large">Register</Button>
            </Link>
        </>
    );
    
    const privateLinks = (
        <>
            <Typography variant="subtitle2" color="textPrimary" onClick={logout}>Log out</Typography>
            <Link to="/settings">
                <Button variant="contained" color="secondary" size="large">Settings</Button>
            </Link>
        </>
    );

    return (
        <nav>
            <Typography variant="subtitle2" color="textPrimary">
                <a href="https://github.com/darychita/SenUrlShortener">Github</a>
            </Typography>
            {
                auth.isAuthenticated ? privateLinks : publicLinks
            }
       </nav>
    );
};

export default Navigation;