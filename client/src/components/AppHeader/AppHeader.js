import React from 'react';
import { Container, Box, Paper} from '@material-ui/core';
import Logo from '../Logo';
import Navigation from '../Navigation';
import './AppHeader.scss';

const AppHeader = () => {
    return (
        <header className="header">
            <Paper elevation={0} style={{background: 'none'}}>
                <Container >
                    <Box className="header__container">
                        <Logo />
                        <Navigation />
                    </Box>
                </Container>
            </Paper>
        </header>
    );
};

export default AppHeader;
