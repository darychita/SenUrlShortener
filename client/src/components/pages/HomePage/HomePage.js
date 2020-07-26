import React from 'react';
import { Container, Box, Typography, Paper, Button, InputBase } from '@material-ui/core';
import { QrcodeOutlined, AreaChartOutlined, SnippetsOutlined } from '@ant-design/icons';
import Footer from '../../Footer';
import './HomePage.scss';

const Divider = () => {
    return (
        <div class="custom-shape-divider-bottom">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
        </div>     
    );
};

const FeatureItem = ({ icon, heading, text} ) => {
    return (
        <Paper elevation={3} className="feature__item">
            <div>{icon}</div>
            <Typography component="h3" variant="h6" align="center" color="textPrimary">
                {heading}
            </Typography>
            <Typography align="center" color="textPrimary">
                {text}
            </Typography>
        </Paper>
    );
};

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
                    <Paper className="url-input">
                            {/* <IconButton type="submit">
                                <ScissorOutlined />
                            </IconButton> */}
                        <form noValidate autoComplete="off">
                            <InputBase fullWidth placeholder="Paste your long URL.."  />
                        </form>
                    </Paper>
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
                <Container className="home__features__items">
                    {/* <FeatureItem icon="na" heading="bla" text="lorem" /> */}
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

                </Container>
                <Button variant="contained" color="secondary" size="large">Get started</Button>
            </section>
            <Footer />
        </Box>
    );
};

export default HomePage;
