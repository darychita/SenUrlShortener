import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
        color: 'white'
    }
});
const Footer = () => {
    const { root } = useStyles();
    return (
        <footer className={root}>
            <Typography>
                Made with <span role="img" aria-label="heart">❤️</span> by @darychita
            </Typography>
        </footer>
    );
};

export default Footer;
