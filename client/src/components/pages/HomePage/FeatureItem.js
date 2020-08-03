import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import './HomePage.scss';

const FeatureItem = ({ icon, heading, text} ) => {
    return (
        <Paper elevation={3} className="feature__item">
            <div>{icon}</div>
            <Typography component="h3" variant="h6" align="center" color="textPrimary">
                {heading}
            </Typography>
            <Typography align="center" color="textPrimary">
                {text}
            </Typography>
        </Paper>
    );
};

export default FeatureItem;
