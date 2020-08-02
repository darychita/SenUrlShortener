import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import Shortener from '../../Shortener';
import LinksList from '../../LinksList';
import './PersonalPage.scss';

const PersonalPage = () => {
    return (
        <Box className="personal-page">
            <Typography variant="h3" align="center" className="personal-page__header" color="textPrimary">
                Find your shortened links here or create new
            </Typography>
            <Container maxWidth="sm" className="shortener-box">
                <Shortener />
            </Container>
            <Typography variant="h4" align="center" className="personal-page__subheader" color="textPrimary">
                Recent links
            </Typography>
            <Container className="links-list-box">
                <LinksList />
            </Container>
        </Box>
    );
};

export default PersonalPage;
