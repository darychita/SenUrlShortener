import React from 'react';
import { Container, Box } from '@material-ui/core';
import Logo from '../Logo';
import Navigation from '../Navigation';
import './AppHeader.scss';

const AppHeader = () => {
    return (
        <header className="header">
            <Container >
                <Box className="header__container">
                    <Logo />
                    <Navigation />
                </Box>
            </Container>
        </header>
    );
};

export default AppHeader;
