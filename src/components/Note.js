import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography  from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import Zoom from '@material-ui/core/Zoom';

import {makeStyles } from '@material-ui/core/styles';
const Note = (props) => {
    const classes = useStyles();
    const handleDelete = () => {
        props.deleteNote(props.id);
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(props.text)
    }
    return (
        <Zoom in={true} style={{ transitionDelay: props.delay || "200ms"}}>   
        <Paper className={classes.card} elevation={3}>
            <Grid container justify="space-between" direction="column" alignItems="flex-start" className={classes.gridContainer}>
<div>
<Typography variant="caption">{props.date ? props.date.toDate().toDateString() : "NoDate"}</Typography>     
            <Typography variant="body1" className={classes.noteText}>{props.text}</Typography> 
            </div>
            <Grid item container justify="flex-end">
            <IconButton color="primary" aria-label="Copy" component="span" onClick={handleCopy}>
          <FileCopyRoundedIcon />
            </IconButton>
            <IconButton color="primary" aria-label="Delete Note" component="span" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
            </Grid>
        </Grid> 
        </Paper >
        </Zoom>
    )
}
const useStyles = makeStyles((theme) => ({
  
    card: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        display: "flex"
    },
    gridContainer: {
        FlexGrow: 1
    },noteText: {marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)}
    ,textContainer: {
        flexGrow: 1
    }
}));

export default Note
