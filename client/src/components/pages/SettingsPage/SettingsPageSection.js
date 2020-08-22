import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import './SettingsPage.scss';

const SettingsPageSection = ({ header, subheader, action }) => {
    return (
        <Box className="settings-page__section">
            <Typography variant="h4" className="settings-page__section-header">
                {header}
            </Typography>
            <Typography variant="body1" className="settings-page__section-subheader">
                {subheader}
            </Typography>
            { action() }
        </Box>
    );
};

export default SettingsPageSection;
