import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const QRDialog = ({ dest, onClose }) => {
    const [ open, setOpen ] = useState(true);
    
    // const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            aria-labelledby="customized-dialog-title" 
        >
            <DialogTitle>QR for {dest}</DialogTitle>
            <DialogContent style={{margin: '0 auto'}}>
                <QRCode 
                    renderAs="canvas"
                    value={dest}
                    size={190}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default QRDialog;
