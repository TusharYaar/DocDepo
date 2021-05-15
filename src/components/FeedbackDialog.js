import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FeedbackDialog = ({open,dialogResponse}) => {
    const [response,setResponse] = useState("");
    const [error,setError] = useState("");
    const handleResponseChange = (event) => {
        setResponse(event.target.value);
    }
  const closeWithoutSubmit = () => {
    dialogResponse(false)
  };
  const submitResponse = () => {
    if(response.length > 150 || response.length <= 3)
    {
        setError("Feedback should be 5 to 150 characters long")
        return;
    }
    dialogResponse(response)
    setResponse("");
    setError("");
  }

  return (

      <Dialog open={open} onClose={closeWithoutSubmit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Report A Problem</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can help me built a better app by reporting a problem. I will try my best to solve the issue in the quickest time possible.
            Thankyou
          </DialogContentText>
          <TextField
            error={error.length > 0 ? true : false}
            helperText = {error.length > 0 ? error : ""}
            autoFocus
            margin="dense"
            id="name"
            label="Feedback"
            type="text"
            multiline
            rows={4}
            fullWidth
            value={response}
            onChange={handleResponseChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWithoutSubmit} color="primary">
            Cancel
          </Button>
          <Button onClick={submitResponse} color="primary">
            Send Feedback
          </Button>
        </DialogActions>
      </Dialog>
  );
}
export default FeedbackDialog;