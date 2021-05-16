import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {TIMESTAMP } from "../firebase"
import Paper from '@material-ui/core/Paper'

import {useAuth} from "../context/AuthContext"
import {useStorage } from "../hooks/useStorage"
import { Grid } from '@material-ui/core';
import ProgressBar from "./ProgressBar"
const UploadDocs = (props) => {
    const {currentUser} = useAuth();
    const classes  = useStyles();
    var{ progress, url,error } = useStorage(props.file,currentUser.uid);
    const addToCollection = () => {
      let docDetails = {
        name: props.file.name,
        url: url,
        user: currentUser.uid,
        createdAt: TIMESTAMP(),
        userEmail: currentUser.email,
        path:`${currentUser.uid}/${props.file.name}`,
        type: props.file.type
      }
      props.uploadDocDetails(docDetails);
  }
    if(progress === 100 && url ) {
      addToCollection();
    }
    return (
        <Paper elevation={3} className={classes.paper}>
        <Grid container className={classes.gridContainer} direction="column" justify="space-between">
        <Grid contianer className={classes.fileDetailContainer}> This s a upload file component</Grid>
        <ProgressBar value={progress} error={error}/>
        </Grid>
    </Paper>
    )
}
const useStyles = makeStyles((theme) => ({
    paper: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        margin: theme.spacing(2),
        display: "flex"
    },
    gridContainer: {
      flexGrow: 1
    },
    fileDetailContainer: {
      padding: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));
export default UploadDocs;
