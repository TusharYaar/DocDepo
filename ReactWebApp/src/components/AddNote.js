import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../context/AuthContext";
import { TIMESTAMP } from "../firebase";
const AddNote = (props) => {
  const { currentUser } = useAuth();
  const classes = useStyles();
  const [noteValue, setNoteValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleNoteChange = (event) => {
    setNoteValue(event.target.value);
  };
  const handleCancel = () => {
    setNoteValue("");
    setError("");
  };
  const validateNote = () => {
    if (noteValue.length > 0 && noteValue.length < 120) {
      handleSubmitNote();
      setLoading(true);
    } else setError("Note should be between 0 and 120 characters");
  };
  const handleSubmitNote = async () => {
    let note = {
      text: noteValue,
      createdAt: TIMESTAMP(),
      user: currentUser.uid,
      userEmail: currentUser.email,
    };
    try {
      await props.addNote(note);
      setNoteValue("");
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Paper className={classes.inputCard} elevation={3}>
      <Grid container direction="column" justify="space-between">
        <TextField
          id="outlined-multiline-static"
          label={<Typography variant="subtitle1">Add A Note</Typography>}
          multiline
          rows={error.length > 0 ? 5 : 7}
          value={noteValue}
          onChange={handleNoteChange}
          variant="outlined"
          disabled={isLoading}
          error={error.length > 0}
          helperText={error.length > 0 ? error : null}
        />
        <Grid container justify="flex-end">
          <Button disabled={isLoading} onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={validateNote}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  inputCard: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    padding: theme.spacing(1),
    margin: theme.spacing(2),
  },
}));
export default AddNote;
