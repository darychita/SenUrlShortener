import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import Shortener from '../../Shortener';
import LinksList from '../../LinksList';
import useLink from '../../../hooks/links.hook';
import LinksContext from '../../../context/links.context';
import './PersonalPage.scss';

const PersonalPage = () => {
    
    const links = useLink();

    return (
        <LinksContext.Provider value={links}>
            <Box className="personal-page">
                <Typography variant="h3" align="center" className="personal-page__header" color="textPrimary">
                    Find your shortened links here or create new
                </Typography>
                <Container maxWidth="sm" className="shortener-box">
                    <Shortener addLink={links.addLink}/>
                </Container>
                <Typography variant="h4" align="center" className="personal-page__subheader" color="textPrimary">
                    Recent links
                </Typography>
                <Container className="links-list-box">
                    <LinksList />
                </Container>
            </Box>
        </LinksContext.Provider>

    );
};

export default PersonalPage;
