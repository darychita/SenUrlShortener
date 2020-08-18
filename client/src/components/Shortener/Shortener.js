import React, { useContext } from 'react';
import { Paper, InputBase, Box, Chip, Typography, Grid, IconButton, Link } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AuthContext from '../../context/auth.context';
import useLink from '../../hooks/link.hook';
import './Shortener.scss';

const ErrorValidation = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <Typography variant="caption" display="block" className="shortener__input-error" >
            { message }
        </Typography>
    )
};
const MainTextField = ({ value, error, onChangeHandler, submit }) => (
    <Box>
        <Paper className="shortener__paper" elevation={1}>
            <InputBase 
                placeholder="Paste your long URL.."  
                value={value}
                onChange={onChangeHandler}
            />
            <IconButton color="primary" onClick={submit}>
                <SendIcon />
            </IconButton>        
        </Paper>
        <ErrorValidation message={error} />
    </Box>
);

const SmallTextField = ({ fieldName, value, error, onChangeHandler, xs=6 }) => (
    <Grid item xs={xs} className="shortener__small-input__container">
        <Typography color="textPrimary">{fieldName}</Typography>
        <Paper elevation={1}>
            <InputBase 
                className="shortener__small-input" 
                size="small" 
                placeholder={fieldName} 
                value={value}
                onChange={onChangeHandler}
            />
        </Paper>
        <ErrorValidation message={error} />
    </Grid>
);

const ShortenedLinkBadge = ({ link }) => {
    return (
        <Box className="shortener__chip__container">
            <Link href={link}>
                <Chip 
                    color="secondary"
                    className="shortener__result"
                    label={link}
                /> 
            </Link>
        </Box>
    );
};

const Shortener = () => {
    const auth = useContext(AuthContext);
    const link = useLink(auth.isAuthenticated);

    const onChangeHandler = (name) => (e) => {
        return link.setValue(name, e.target.value);
    };

    let advancedSettings = null;
    if (auth.isAuthenticated) {
        advancedSettings = (
            <Grid container spacing={4}>
                <SmallTextField 
                    fieldName="Custom link"
                    value={link.endpoint.value}
                    error={link.endpoint.error}
                    onChangeHandler={onChangeHandler('endpoint')}
                />
                <SmallTextField 
                    fieldName="Password"
                    value={link.password.value}
                    error={link.password.error}
                    onChangeHandler={onChangeHandler('password')}
                />
                <SmallTextField 
                    xs={12} 
                    fieldName="Description"
                    value={link.description.value}
                    error={link.description.error}
                    onChangeHandler={onChangeHandler('description')}
                />
            </Grid>                    
        );
    }


    if (link.isLoading) {
        return 'LOADING....';
    }

    return (

        <Box className="shortener">
            <form noValidate autoComplete="off">

                <MainTextField 
                    value={link.origin.value} 
                    error={link.origin.error}
                    onChangeHandler={onChangeHandler('origin')}
                    submit={link.create}
                />
                {
                    !link.isLoading && link.finalEndpoint
                        ? <ShortenedLinkBadge link={link.finalEndpoint} />
                        : null
                    }
                { advancedSettings }
            </form>
        </Box>
    );

};

export default Shortener;


