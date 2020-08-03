import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    root: {
        fontFamily: "'Pacifico', cursive",
        fontSize: '3.5em',
        color: '#24305E'
    }
});

const Logo = () => {
    const classes = useStyle();

    return (
        <Typography 
            variant="h1" 
            component="div"
            className={classes.root}
        >
            Sen
        </Typography>
    );
};

export default Logo;
