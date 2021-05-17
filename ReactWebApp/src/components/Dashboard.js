import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import MessageSnackBar from "./MessageSnackBar";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import AddNote from "./AddNote";
import Note from "./Note";
import { Database } from "../firebase";
const Dashboard = ({ userNotes }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [snackbarValues, setSnackbarValues] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dialogValues, setDialogValues] = useState({
    open: false,
    type: "",
    elementId: "",
  });
  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };
  const handleSeachValueChange = (event) => {
    setSearchValue(event.target.value);
  };
  const addNoteToCollection = async (note) => {
    try {
      await Database.NOTESDEPO.add(note);
      setSnackbarValues({
        open: true,
        message: "Note Uploaded to your Depo",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setSnackbarValues({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };
  const toggleIsImportant = async (noteId,value) => {
    try {
      await Database.NOTESDEPO.doc(noteId).update({isImportant: value});
    }
    catch (err) {
      setSnackbarValues({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  }
  const handleDeleteNote = (note) => {
    setDialogValues({
      open: true,
      type: "Note",
      elementId: note,
    });
  };
  const deleteNoteFromCollection = async (note) => {
    try {
      console.log(note);
      await Database.NOTESDEPO.doc(note).delete();
      console.log("done");
      setSnackbarValues({
        open: true,
        message: "Note Deletd from your Depo",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const copyTextFromNote = (noteText) => {
    navigator.clipboard.writeText(noteText);

    setSnackbarValues({
      open: true,
      message: "Note Copied",
      severity: "success",
    });
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarValues({ open: false, message: "", severity: "success" });
  };
  const dialogClose = (value, note) => {
    console.log(value, note);
    if (value) deleteNoteFromCollection(note);
    setDialogValues({
      open: false,
      type: "Note",
      elementId: "",
    });
  };
  const showNotes = () => {
    let filteredList = [...userNotes];
    if(filter !== "all")
    filteredList= filteredList.filter(notes=>notes.isImportant===true )
    if (searchValue.length > 0)
      filteredList = filteredList.filter((notes) =>
        notes.text.includes(searchValue)
      );
    return filteredList.map((note, index) => (
      <Note
        date={note.createdAt}
        text={note.text}
        key={note.id}
        id={note.id}
        isImportant={note.isImportant}
        deleteNote={handleDeleteNote}
        copyNote={copyTextFromNote}
        delay={`${index * 200}ms`}
        toggleIsImportant={toggleIsImportant}
      />
    ));
  };
  return (
    <div className={classes.pageDiv}>
      <div className={classes.toolbar} />
      <Grid
        container
        justify="space-between"
        className={classes.searchGridContainer}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={searchValue}
            onChange={handleSeachValueChange}
            className={classes.margin}
            variant="filled"
            id="search"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <ToggleButtonGroup
          value={filter}
          exclusive
          className={classes.margin}
          onChange={handleFilter}
          aria-label="text alignment"
        >
          <ToggleButton value="all" aria-label="All Notes">
            All
          </ToggleButton>
          <ToggleButton value="important" aria-label="Important Notes">
            Important
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid container className={classes.gridContainer} justify="flex-start">
        <AddNote addNote={addNoteToCollection} />
        {userNotes.length > 0 && showNotes()}
      </Grid>
      <MessageSnackBar handleClose={snackbarClose} details={snackbarValues} />
      <ConfirmDeleteDialog handleClose={dialogClose} details={dialogValues} />
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  searchGridContainer: { padding: theme.spacing(2) },
  inputCard: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  margin: { margin: theme.spacing(1, 0) },
  pageDiv: { flexGrow: 1 },
}));
export default Dashboard;
