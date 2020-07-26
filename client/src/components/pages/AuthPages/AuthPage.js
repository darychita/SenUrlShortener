import React from 'react';
import { Container, TextField, Box, Button } from '@material-ui/core';
import AuthForm from '../../AuthForm';
import './AuthPage.scss';


const AuthPage = ({ mainColor, 
                    title,
                    textFieldsLabels, 
                    links
                }) => {

    const submitButton = (
        <Button 
            variant="contained" 
            color={mainColor} 
            size="large"
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
                >
                    {
                        textFieldsLabels.map((label) => (
                            <TextField label={label} variant="outlined" key={label} />
                        ))
                    }
                </AuthForm>
            </Box>
        </Container>
    );
};

export default AuthPage;
