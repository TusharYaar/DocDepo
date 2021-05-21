import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { Database } from "../firebase";
import { useHistory } from "react-router-dom";
const GiveDetails = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useAuth();
  const classes = useStyles();
  const [details, setDetails] = useState({
    displayName:
      currentUser && currentUser.displayName ? currentUser.displayName : "",
    birthDate: new Date(),
    gender: "male",
    fileLimit: 40,
  });
  const [errors, setErrors] = useState({ displayName: "", birthDate: null });
  const [isLoading, setLoading] = useState(false);
  const handleChange = (prop) => (event) => {
    setDetails({ ...details, [prop]: event.target.value });
  };
  const handleDateChange = (date) => {
    setDetails({ ...details, birthDate: date });
  };
  const handleSubmit = () => {
    setLoading(true);
    var isFine = true;
    if (details.displayName.length <= 3 || details.displayName.length >= 70) {
      isFine = false;
      setErrors({
        ...errors,
        displayName: "Name should be between 3 and 70 characters",
      });
    }
    if (details.birthDate >= Date.now()) {
      isFine = false;
      setErrors({ ...errors, birthDate: "Common Man, choose a sensible date" });
    }
    if (isFine) submitUserDetails();
  };
  const submitUserDetails = async () => {
    try {
      console.log(currentUser.uid);
      await Database.USERS.doc(currentUser.uid).set(details);
      setCurrentUser({
        ...currentUser,
        ...details,
        detailsGiven: true,
        random: true,
      });
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
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
        <Typography variant="h4" align="center">
          Just A Small Step Before You get Started
        </Typography>
        <Paper className={classes.paper}>
          <Typography variant="h3">Give Details</Typography>
          <FormControl
            error={errors.displayName.length > 0}
            className={classes.input}
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
              disabled={isLoading}
              onChange={handleChange("displayName")}
            />
            {errors.displayName.length > 0 ? (
              <FormHelperText>{errors.displayName}</FormHelperText>
            ) : null}
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              // disableToolbar\
              className={classes.datePicker}
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="birthDate"
              label="Birth Date"
              helperText={errors.birthDate ? errors.birthDate : null}
              value={details.birthDate}
              onChange={handleDateChange}
              disabled={isLoading}
              error={errors.birthDate ? true : false}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl component="fieldset" className={classes.genderRadio}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={details.gender}
              onChange={handleChange("gender")}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                disabled={isLoading}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                disabled={isLoading}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                disabled={isLoading}
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
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
    margin: theme.spacing(4, 0),
    flexGrow: 1,
  },
  input: {
    margin: theme.spacing(1),
  },
  alert: {
    margin: theme.spacing(1),
  },
  datePicker: {
    display: "block",
    padding: theme.spacing(0, 1),
    margin: theme.spacing(4, 0),
  },
  genderRadio: {
    display: "block",
    margin: theme.spacing(4, 0),
  },
}));

export default GiveDetails;
