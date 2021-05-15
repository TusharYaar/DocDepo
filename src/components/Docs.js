import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Paper from '@material-ui/core/Paper'

const File = ()=>  {
    const classes  = useStyles();
    return (
        <Paper elevation={3} className={classes.paper}>
            This is a paper
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
    input: {
      display: 'none',
    },
  }));
  export default File;
