import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeleteDialog(props) {


  return (
      <Dialog
        open={props.details.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=> {props.handleClose(false,"anan")}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Are you sure you want to Delete ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           The content will be permanently be removed from your depo and you won't be able to retrieve it.'
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> {props.handleClose(false,"anan")}} color="primary">
            Cancel
          </Button>
          <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={()=> {props.handleClose(true,props.details.elementId)}}
      >
        Delete
      </Button>
        </DialogActions>
      </Dialog>
  );
}