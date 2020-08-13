import React, { useContext } from 'react';
import AuthContext from '../../context/auth.context';
import { Paper, InputBase, Box, Chip, Typography, Grid } from '@material-ui/core';
import './Shortener.scss';

const Shortener = () => {
    const auth = useContext(AuthContext);
    console.log(auth)

    const advancedSettings = (
        <Grid container spacing={4}>
            <Grid item xs={6} className="shortener__small-input__container">
                <Typography color="textPrimary">Custom link</Typography>
                <Paper elevation={1}>
                    <InputBase className="shortener__small-input" size="small" placeholder="Custom link"/>
                </Paper>
            </Grid>
            <Grid item xs={6} className="shortener__small-input__container">
                <Typography color="textPrimary">Password</Typography>
                <Paper elevation={1}>
                    <InputBase className="shortener__small-input" size="small" placeholder="Password"/>
                </Paper>
            </Grid>
            <Grid item xs={12} className="shortener__small-input__container">
                <Typography color="textPrimary">Description</Typography>
                <Paper elevation={1}>
                    <InputBase className="shortener__small-input" size="small" placeholder="Description"/>
                </Paper>
            </Grid>
        </Grid>                    
    );

    return (
        <Box className="shortener">
            <form noValidate autoComplete="off">
                <Paper className="shortener__paper" elevation={1}>
                    <InputBase fullWidth placeholder="Paste your long URL.."  />
                </Paper>
                { auth.isAuthenticated ? advancedSettings : null }
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
