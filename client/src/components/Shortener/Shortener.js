import React, { useContext } from 'react';
import { Paper, InputBase, Box, Chip, Typography, Grid, IconButton, Link } from '@material-ui/core';
import Loader from '../Loader';
import SendIcon from '@material-ui/icons/Send';
import SmallTextField from '../SmallTextField';
import AuthContext from '../../context/auth.context';
import useShortener from '../../hooks/shortener.hook';
import Copiable from '../wrappers/Copiable';
import ErrorValidation from '../ErrorTextFieldLabel';
import './Shortener.scss';

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

const Shortener = ({ addLink }) => {

    const auth = useContext(AuthContext);
    const shortener = useShortener(auth.isAuthenticated, addLink);

    const onChangeHandler = (name) => (e) => {
        return shortener.setValue(name, e.target.value);
    };

    const readOnly = shortener.isLoading;

    let advancedSettings = null;
    if (auth.isAuthenticated) {
        advancedSettings = (
            <Grid container spacing={4}>
                <SmallTextField 
                    className="shortener__small-input__container"
                    readOnly={readOnly}
                    fieldName="Custom link"
                    value={shortener.endpoint.value}
                    error={shortener.endpoint.error}
                    onChangeHandler={onChangeHandler('endpoint')}
                />
                <SmallTextField 
                    className="shortener__small-input__container"
                    readOnly={readOnly}
                    type="password"
                    fieldName="Password"
                    value={shortener.password.value}
                    error={shortener.password.error}
                    onChangeHandler={onChangeHandler('password')}
                />
                <SmallTextField 
                    xs={12}
                    className="shortener__small-input__container" 
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


