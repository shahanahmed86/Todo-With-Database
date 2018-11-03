import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

class AlertDialogSlide extends Component {
    render() {
        const { open, close, title, message } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={close} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialogSlide;