import React from 'react';
import { Container, TextField, Box, Button } from '@material-ui/core';
import AuthForm from '../../AuthForm';
import './AuthPage.scss';


const AuthPage = ({ mainColor, 
                    title,
                    textFieldsLabels, 
                    links,
                    validationSchema,
                    onSubmit
                }) => {

    const submitButton = (
        <Button 
            variant="contained" 
            color={mainColor} 
            size="large"
            onClick={(data) => onSubmit(data)}
        >
            {title}
        </Button>);
       
    return (
        <Container>
            <Box className="auth-page">
                <AuthForm 
                    mainColor={mainColor}
                    title={title} 
                    submitButton={submitButton}
                    links={links}
                    validationSchema={validationSchema}
                >
                    {
                        textFieldsLabels.map(({label, name, type}) => (
                            <TextField 
                                label={label} 
                                name={name} 
                                variant="outlined" 
                                key={label} 
                                type={type ?? name}
                            />
                        ))
                    }
                </AuthForm>
            </Box>
        </Container>
    );
};

export default AuthPage;
