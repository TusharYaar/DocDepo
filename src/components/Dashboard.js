import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import AddNote from "./AddNote";
import Note from "./Note";
import { Database } from "../firebase";
import { useAuth } from "../context/AuthContext";
const Dashboard = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [userNotes, setUserNotes] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const getNotes = async () => {
      try {
        var notes = [];
        Database.NOTESDEPO.where("user", "==", currentUser.uid).onSnapshot(
          (snapshot) => {
            notes = [];
            snapshot.forEach((doc) => {
              notes.push({ ...doc.data(), id: doc.id });
            });
            setUserNotes(notes);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    getNotes();
  }, [currentUser.uid]);

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };
  const handleSeachValueChange = (event) => {
    setSearchValue(event.target.value);
  };
  const addNoteToCollection = async (note) => {
    await Database.NOTESDEPO.add(note);
  };
  const deleteNoteFromCollection = async (note) => {
    try {
      console.log(note);
      await Database.NOTESDEPO.doc(note).delete();
      console.log("done");
    } catch (err) {
      console.log(err);
    }
  };
  // const showNotes = userNotes.map((note, index) => (
  //   <Note
  //     date={note.createdAt}
  //     text={note.text}
  //     key={note.id}
  //     id={note.id}
  //     deleteNote={deleteNoteFromCollection}
  //     delay={`${index * 200}ms`}
  //   />
  // ));
  const showNotes = () => {
   let filteredList = [...userNotes];
    // if(filter !== "all")
      // filteredNotes.filter(notes=>notes.text.includes(filter) )
    if(searchValue.length > 0)
      filteredList= filteredList.filter((notes)=> notes.text.includes(searchValue));
      return filteredList.map((note,index) => (
        <Note
            date={note.createdAt}
            text={note.text}
            key={note.id}
            id={note.id}
            deleteNote={deleteNoteFromCollection}
            delay={`${index * 200}ms`}
          />
        ));
  }
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
          {/* <ToggleButton value="important" aria-label="Important Notes">
            Important
          </ToggleButton> */}
        </ToggleButtonGroup>
      </Grid>
      <Grid container className={classes.gridContainer} justify="flex-start">
        <AddNote addNote={addNoteToCollection} />
        {userNotes.length > 0 && showNotes()}
      </Grid>
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
