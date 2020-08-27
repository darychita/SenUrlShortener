import React from 'react';
import Typography from '@material-ui/core/Typography';

const ErrorTextFieldLabel = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <Typography variant="caption" display="block" className="shortener__input-error" >
            { message }
        </Typography>
    )
};

export default ErrorTextFieldLabel;
