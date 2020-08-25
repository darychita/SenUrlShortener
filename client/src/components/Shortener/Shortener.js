import React, { useContext } from 'react';
import { Paper, InputBase, Box, Chip, Typography, Grid, IconButton, Link } from '@material-ui/core';
import Loader from '../Loader';
import SendIcon from '@material-ui/icons/Send';
import AuthContext from '../../context/auth.context';
import useShortener from '../../hooks/shortener.hook';
import Copiable from '../wrappers/Copiable';
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
const MainTextField = ({ value, error, onChangeHandler, submit, readOnly }) => (
    <Box>
        <Paper className="shortener__paper" elevation={1}>
            <InputBase 
                readOnly={readOnly}
                placeholder="Paste your long URL.."  
                value={value}
                onChange={onChangeHandler}
            />
            {
                readOnly 
                ? <Loader /> 
                : (
                    <IconButton color="primary" onClick={submit}>
                        <SendIcon />
                    </IconButton>            
                )
            }
        </Paper>
        <ErrorValidation message={error} />
    </Box>
);

const SmallTextField = ({ fieldName, value, error, onChangeHandler, xs=6, readOnly }) => (
    <Grid item xs={xs} className="shortener__small-input__container">
        <Typography color="textPrimary">{fieldName}</Typography>
        <Paper elevation={1}>
            <InputBase 
                readOnly={readOnly}
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
            <Link>
                <Copiable textToCopy={link}>
                    <Chip 
                        color="secondary"
                        label={link}
                    />
                </Copiable>
            </Link>
        </Box>
    );
};

const Shortener = () => {
    const auth = useContext(AuthContext);
    const shortener = useShortener(auth.isAuthenticated);

    const onChangeHandler = (name) => (e) => {
        return shortener.setValue(name, e.target.value);
    };

    const readOnly = shortener.isLoading;

    let advancedSettings = null;
    if (auth.isAuthenticated) {
        advancedSettings = (
            <Grid container spacing={4}>
                <SmallTextField 
                    readOnly={readOnly}
                    fieldName="Custom link"
                    value={shortener.endpoint.value}
                    error={shortener.endpoint.error}
                    onChangeHandler={onChangeHandler('endpoint')}
                />
                <SmallTextField 
                    readOnly={readOnly}
                    fieldName="Password"
                    value={shortener.password.value}
                    error={shortener.password.error}
                    onChangeHandler={onChangeHandler('password')}
                />
                <SmallTextField 
                    xs={12} 
                    readOnly={readOnly}
                    fieldName="Description"
                    value={shortener.description.value}
                    error={shortener.description.error}
                    onChangeHandler={onChangeHandler('description')}
                />
            </Grid>                    
        );
    }

    return (

        <Box className="shortener">
            <form noValidate autoComplete="off">

                <MainTextField 
                    readOnly={readOnly}
                    value={shortener.origin.value} 
                    error={shortener.origin.error}
                    onChangeHandler={onChangeHandler('origin')}
                    submit={shortener.create}
                />
                {
                    !shortener.isLoading && shortener.finalEndpoint
                        ? <ShortenedLinkBadge link={shortener.finalEndpoint} />
                        : null
                }
                { advancedSettings }
            </form>
        </Box>
    );

};

export default Shortener;


