import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteAccountConfirmAlert from './DeleteAccountConfirmAlert';
import SettingsPageSection from './SettingsPageSection';
import useAccount from '../../../hooks/account.hook';
import AuthContext from '../../../context/auth.context';

const useStyles = makeStyles((theme) => ({
    deleteBtn: {
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: theme.palette.error.dark,
        }
    }
}));


const DeleteAccountSection = () => {
    const styles = useStyles();
    const [ open, setOpen ] = useState(false);
    const account = useAccount();
    const history = useHistory();
    const { deleteTokens } = useContext(AuthContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submit = () => {
        return account.deleteUser()
            .then(() => {
                deleteTokens();
                history.push('/register');
            });
    };

    return (
        <>
            <SettingsPageSection 
                header="Delete account"
                subheader="All data about you will be deleted."
                action={() => (
                    <Button
                        startIcon={<DeleteIcon />}
                        size="large"
                        variant="contained"
                        color="primary"   
                        className={styles.deleteBtn}   
                        onClick={handleOpen}          
                    >
                        Delete account
                    </Button>
                )}
            />
            <DeleteAccountConfirmAlert
                open={open}
                handleClose={handleClose}
                handleAgree={submit}
            />
        </>
    );
};

export default DeleteAccountSection;
