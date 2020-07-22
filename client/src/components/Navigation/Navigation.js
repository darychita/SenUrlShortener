import React from 'react';
import { Typography, Button } from '@material-ui/core';
import './Navigation.scss';

const Navigation = () =>{
    return (
        <nav>
            <Typography variant="subtitle2" color="textPrimary">Github</Typography>
            <Typography variant="subtitle2" color="textPrimary">Sign in</Typography>
            <Button variant="contained" color="secondary" size="large">Register</Button>
       </nav>
    );
};

export default Navigation;