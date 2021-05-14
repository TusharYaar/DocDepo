import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import { Grid,TextField,InputAdornment } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import AddNote from "./AddNote"
import Note from "./Note";
import {Database} from "../firebase"
const Dashboard = () => {
    const classes = useStyles();
    const [filter, setFilter] = useState('All');
    const [searchValue, setSearchValue] = useState('')
    const handleFilter = (event, newFilter) => {
        setFilter(newFilter);
      };
    const handleSeachValueChange = (event) => {
        setSearchValue(event.target.value);
    }
    const addNoteToCollection = async (note) => {
        await Database.NOTEDEPO.add(note);
        
    }
    return (
        <div>
        <div className={classes.toolbar} />
        <Grid container justify="space-between" className={classes.searchGridContainer}>
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
      <ToggleButton value="All" aria-label="All Notes">
        All
      </ToggleButton>
      <ToggleButton value="important" aria-label="Important Notes">
        Important
      </ToggleButton>
    </ToggleButtonGroup>
        </Grid>
            <Grid container className={classes.gridContainer} justify="space-between">
            <AddNote addNote = {addNoteToCollection}/>
            <Note/>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            <Paper className={classes.inputCard} elevation={6}></Paper>
            </Grid>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },

      searchGridContainer:{padding: theme.spacing(2)},
    inputCard: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    },
    margin: {margin: theme.spacing(1,0)}
}));
export default Dashboard
