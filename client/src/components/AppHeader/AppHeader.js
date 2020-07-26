import React from 'react';
import { Container, Box, Paper} from '@material-ui/core';
import Logo from '../Logo';
import Navigation from '../Navigation';
import './AppHeader.scss';

const AppHeader = () => {
    // if user is on home page, header must be displayed without shadow
    const elevation = window.location.pathname === '/' ? 0 : 3;
    return (
        <header className="header">
            <Paper elevation={elevation} style={{background: 'none'}}>
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
