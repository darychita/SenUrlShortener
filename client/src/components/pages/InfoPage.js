import React from 'react';
import { Typography, Container, Button, makeStyles, Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    marginMain: {
        margin: '200px auto 50px auto',
    },
    buttonBox: {
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center'
    },
    marginSub: {
        margin: '1em auto 3em auto',
    }
});

const InfoPage = ({ message, subMessage, render }) => {
    const styles = useStyles();

    return (
        <Container maxWidth="sm" className={styles.marginMain}>
            <Typography variant="h3" align="center">
                {message}
            </Typography>
            { subMessage ? 
                <Typography variant="subtitle1" align="center" className={styles.marginSub}>
                    {subMessage}
                </Typography>
                : null
            }
            { typeof render === 'function' ? render() : null }
            <Box className={styles.buttonBox}>
                <Link to="/">
                    <Button 
                        variant="outlined" 
                        size="large" 
                        startIcon={<ArrowBackIcon />}
                    >
                        Back to home
                    </Button>
                </Link>
            </Box>
        </Container>
    );

};  

export default InfoPage;
