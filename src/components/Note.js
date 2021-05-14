import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography  from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles } from '@material-ui/core/styles';
const Note = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.card} elevation={6}>
            <Typography variant="caption">{props.date}23rd december</Typography>     
            <Typography variant="body1">lorem203shks; wukfbskdubslidc khb lbliyvlgj </Typography>  
        </Paper >
    )
}
const useStyles = makeStyles((theme) => ({
  
    card: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
    gridContainer: {
        FlexGrow: 1
    }
}));

export default Note
