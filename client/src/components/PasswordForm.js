import React, { useState } from 'react';
import { TextField, Button, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto'
    },
    margin: {
        marginRight: theme.spacing(1)
    }
}));

const PasswordForm = ({ label, submit, type }) => {
    const styles = useStyles();
    const [ value, setValue ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    const formHandler = (e) => {
        console.log(e);
        e.preventDefault();
        return submit(value)
                .then(() => !!errorMessage ? setErrorMessage('') : null)
                .catch((e) => {
                    const error = typeof e === 'string' ? e : e.message;
                    setErrorMessage(error)
                });
    };

    return (
        <Box>
            <form className={styles.form}  onSubmit={formHandler} >
                <TextField 
                    type={type ?? 'text'}
                    error={!!errorMessage}
                    label={label} 
                    variant="outlined"
                    className={styles.margin}
                    value={value ?? ''}
                    onChange={(e) => setValue(e.target.value)}
                    helperText={errorMessage ?? ''}
                />
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    size="large"
                    style={{height: '56px'}}
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default PasswordForm;
