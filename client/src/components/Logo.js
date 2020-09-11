import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        fontFamily: "'Pacifico', cursive",
        fontSize: '3.5em',
        color: '#24305E',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5em',
        }
    }
}));

const Logo = () => {
    const classes = useStyle();

    return (
        <Link to="/" className="logo">
            <Typography 
                variant="h1" 
                component="div"
                className={classes.root}
            >
                Sen
            </Typography>
        </Link>
    );
};

export default Logo;
