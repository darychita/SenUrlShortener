import React from 'react';
import { Paper, InputBase, Box, Chip, Typography, Grid } from '@material-ui/core';
import './Shortener.scss';

const Shortener = ({ isAuthorized = false }) => {
    const advancedSettings = (
        <Grid container spacing={4}>
            <Grid item xs={6} className="shortener__small-input__container">
                <Typography>Custom link</Typography>
                <Paper>
                    <InputBase className="shortener__small-input" size="small"/>
                </Paper>
            </Grid>
            <Grid item xs={6} className="shortener__small-input__container">
                <Typography>Password</Typography>
                <Paper>
                    <InputBase className="shortener__small-input" size="small"/>
                </Paper>
            </Grid>
            <Grid item xs={12} className="shortener__small-input__container">
                <Typography>Description</Typography>
                <Paper>
                    <InputBase className="shortener__small-input" size="small"/>
                </Paper>
            </Grid>
        </Grid>                    
    );

    return (
        <Box className="shortener">
            <form noValidate autoComplete="off">
                <Paper className="shortener__paper">
                    <InputBase fullWidth placeholder="Paste your long URL.."  />
                </Paper>
                { isAuthorized ? advancedSettings : null }
            </form>

        </Box>
    );
};

export default Shortener;

/* 
                <Box className="shortener__chip__container">
                    <Chip 
                        color="secondary"
                        className="shortener__result"
                        label="https://www.youtube.com/watch?v=R55oJFtv2OU"
                        // variant="outlined"
                    /> 
                </Box> */
