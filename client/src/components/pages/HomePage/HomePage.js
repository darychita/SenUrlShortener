import React from 'react';
import { Container, Box, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Features from './Features';
import Footer from '../../Footer';
import Divider from './Divider';
import Shortener from '../../Shortener';
import './HomePage.scss';



const HomePage = () => {
    return (
        <Box className="home">
            <section className="home__banner">
                <Container className="home__banner__container">
                    <Typography variant="h1">
                        Robust URL Shortener
                    </Typography>
                    <Typography variant="h3">
                        Make your links nice-to-see
                    </Typography>
                    <Shortener />
                </Container>
                <Divider />
            </section>
            <section className="home__features">
                <Typography 
                    variant="h3" 
                    align="center" 
                    color="textPrimary"
                >
                    Key Features
                </Typography>
                <Features />
                <Link to="/login">
                    <Button variant="contained" color="secondary" size="large">
                        Get started
                    </Button>
                </Link>
            </section>
            <Footer />
        </Box>
    );
};

export default HomePage;
