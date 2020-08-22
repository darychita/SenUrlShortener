import React, { useState } from 'react';
import SettingsPageSection from './SettingsPageSection';
import PasswordForm from '../../PasswordForm';
import useAccount from '../../../hooks/account.hook';
import passwordSchema from '../../../validation/password';

const UpdatePasswordSection = () => {
    const account = useAccount();
    const [ subHeader, setSubheader ] = useState('Enter a new password to change your current password.');

    const submitHandler = async (password) => {
        try {
            await passwordSchema.validate({ password });
            const message = await account.updatePassword(password);
            setSubheader(message);
            return Promise.resolve();
        } catch(e) {
            throw new Error(e.message);
        }
    };

    return (
        <SettingsPageSection 
            header="Change password"
            subheader={subHeader}
            action={() => (
                <PasswordForm 
                    label="Your new password"
                    type="password"
                    submit={submitHandler}
                    submitLabel="Update"
                />)
            }
        />
    );
};

export default UpdatePasswordSection;
