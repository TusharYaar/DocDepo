import React, { useState } from "react";
import {useAuth} from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
const GiveDetails = () => {
  const {currentUser} = useAuth();
  const classes = useStyles();

  // console.log(currentUser.displayName);

  const [details,setDetails] = useState({displayName: currentUser.displayName ? currentUser.displayName : ""});
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <div className={classes.toolbar} />
      <Grid>
        <Typography variant="h4" align="center">Just A Small Step Before You get Started</Typography>
        <Paper className={classes.paper}>
          <Typography variant="h3">Give Details</Typography>
        <FormControl
            // error={errors.email.length > 0}
            // className={classes.input}
            variant="outlined"
            required
            fullWidth
          >
            <InputLabel htmlFor="displayName">Name</InputLabel>
            <OutlinedInput
              id="displayName"
              type="text"
              label="Name"
              value={details.displayName}
              autoComplete="name"
              // onChange={handleChange("email")}
            />
            {/* {errors.email.length > 0 ? ( */}
              {/* <FormHelperText>{errors.email}</FormHelperText> */}
            {/* ) : null} */}
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.toolbar,
    padding: theme.spacing(3, 0),
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  gridContainer: {
    flexGrow: 1,
  },
  image: {
    flexGrow: 1,
    minHeight: 200,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  input: {
    margin: theme.spacing(1),
  },
  alert: {
    margin: theme.spacing(1),
  },
}));

export default GiveDetails;
