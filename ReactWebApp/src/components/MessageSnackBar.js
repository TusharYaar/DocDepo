import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props)=> {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const MessageSnackBar = (props) => {
    return (
        <Snackbar open={props.details.open} autoHideDuration={3200} onClose={props.handleClose}>
        <Alert onClose={props.details.handleClose} severity={props.details.severity}>
          {props.details.message}
        </Alert>
      </Snackbar>
    )
}

export default MessageSnackBar
