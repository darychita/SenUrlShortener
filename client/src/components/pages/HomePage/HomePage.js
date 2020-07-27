import React from 'react';
import { Container, Box, Typography, Paper, Button, InputBase } from '@material-ui/core';
import Features from './Features';
import Footer from '../../Footer';
import Divider from './Divider';
import Shortener from '../../Shortener/Shortener';
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
                {/* <Container className="home__features__items">
                    <FeatureItem 
                        icon={<SnippetsOutlined />}
                        heading="Link Managment" 
                        text="Manage all your links that you have ever shortened." 
                    />
                    <FeatureItem 
                        icon={<AreaChartOutlined />}
                        heading="Statistics"
                        text="You can get info about quantity of clicks, counties, devices, systems." 
                    />
                    <FeatureItem 
                        icon={<QrcodeOutlined />} 
                        heading="QR Code" 
                        text="Get beautiful QR code for your link." 
                    />

                </Container> */}
                <Button variant="contained" color="secondary" size="large">Get started</Button>
            </section>
            <Footer />
        </Box>
    );
};

export default HomePage;
