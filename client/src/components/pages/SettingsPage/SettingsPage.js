import React from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsPageSection from './SettingsPageSection';
import PasswordForm from '../../PasswordForm';

import './SettingsPage.scss';
import UpdatePasswordSection from './UpdatePasswordSection';
import DeleteAccountSection from './DeleteAccountSection';

const SettingsPage = () => {
    return (
        <Container className="settings-page" maxWidth="sm">
            <UpdatePasswordSection />
            <Divider />
            <DeleteAccountSection />
        </Container>
    )
};

export default SettingsPage;
