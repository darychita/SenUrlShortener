import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth.context';
import { Typography, Button, useMediaQuery } from '@material-ui/core';
import './Navigation.scss';

const MobileNavigationItem = ({ to, label, onClick }) => {
    if (onClick) {
        return <Button size="small" onClick={onClick}>{label}</Button>;
    }

    const isLocal = !to.includes('http');

    if (isLocal) {
        return (
            <Link to={to}>
              <Button size="small">{label}</Button>
            </Link>            
        );
    }
    return (
        <a href={to}>
            <Button size="small">{label}</Button>
        </a>
    );

};

const Navigation = () => {
    const matches = useMediaQuery('(max-width:600px)');
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logout = async () => {
        await auth.logout();
        history.push('/');
    };

    let links;
    if (auth.isAuthenticated) {
        if (matches) {
            links = (
                <>
                    <MobileNavigationItem label="Github" to="https://github.com/darychita/SenUrlShortener"/>
                    <MobileNavigationItem label="Log out" onClick={logout}/>
                    <MobileNavigationItem label="Settings" to="/settings"/>
                </>
            );
        } else {
            links = (
                <>
                    <Typography variant="subtitle2" color="textPrimary">
                        <a href="https://github.com/darychita/SenUrlShortener">Github</a>
                    </Typography>
                    <Typography variant="subtitle2" color="textPrimary" onClick={logout}>Log out</Typography>
                    <Link to="/settings">
                        <Button variant="contained" color="secondary" size="large">Settings</Button>
                    </Link>
                </>
            );
        }
    } else {
        if (matches) {
            links = (
                <>
                    <MobileNavigationItem label="Github" to="https://github.com/darychita/SenUrlShortener"/>
                    <MobileNavigationItem label="Log in" to="/login"/>
                    <MobileNavigationItem label="Register" to="/register"/>
                </>
            );
        } else {
            links = (
                <>
                    <Typography variant="subtitle2" color="textPrimary">
                        <a href="https://github.com/darychita/SenUrlShortener">Github</a>
                    </Typography>
                    <Link to="/login">
                        <Typography variant="subtitle2" color="textPrimary">Log in</Typography>
                    </Link>
                    <Link to="/register">
                        <Button variant="contained" color="secondary" size="large">Register</Button>
                    </Link>
                </>
            );
        }
    }

   return (
        <nav>
            {
                links
            }
       </nav>
    );
};

export default Navigation;