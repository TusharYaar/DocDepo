import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {TIMESTAMP } from "../firebase"
import Paper from '@material-ui/core/Paper'
import Typography  from '@material-ui/core/Typography';
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
        <Grid container className={classes.fileDetailContainer}><Typography varient="h6">Uploading</Typography></Grid>
        <ProgressBar value={progress} url={url} error={error}/>
        </Grid>
    </Paper>
    )
}
const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1),
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
