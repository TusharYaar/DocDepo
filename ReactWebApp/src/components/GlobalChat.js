import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
const GlobalChat = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageDiv}>
      <div className={classes.toolbar} />
      <Grid
        container
        direction="column"
        // className={classes.pageDiv}
        justify="space-between" flexGrow={1}
      >
       
        <TextField />
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
  pageDiv: { flexGrow: 1},
}));
export default GlobalChat;
