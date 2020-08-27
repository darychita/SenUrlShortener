import React from 'react';
import { Paper, InputBase, Typography, Grid, IconButton, makeStyles } from '@material-ui/core';
import ErrorValidation from './ErrorTextFieldLabel';

const useStyle = makeStyles(() => ({
    heading: {
        fontWeight: 700
    }
}))
const SmallTextField = ({ fieldName, value, error, onChangeHandler, xs = 6, readOnly, type,  ...otherProps }) => {
    const styles = useStyle();

    return (
        <Grid item xs={xs} {...otherProps}>
            <Typography color="textPrimary" className={styles.heading}>{fieldName}</Typography>
            <Paper elevation={1}>
                <InputBase 
                    fullWidth
                    type={type || 'text'}
                    readOnly={readOnly}
                    className="shortener__small-input" 
                    size="small" 
                    placeholder={fieldName} 
                    value={value}
                    onChange={onChangeHandler}
                    autoComplete="false"
                />
            </Paper>
            <ErrorValidation message={error} />
        </Grid>
    );
};

export default SmallTextField;
