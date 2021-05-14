import React, { useState,useEffect } from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useAuth } from "../context/AuthContext";
import Alert from "@material-ui/lab/Alert"
import IconButton from '@material-ui/core/IconButton';
import {
  Grid,
  Button,
  Link,
  Typography,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GoogleButton from "react-google-button";
import { Link as RouterLink,useHistory  } from "react-router-dom";



const EMAIL_REGEX = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const LogIn = () => {
  let history = useHistory();
  const { currentUser, loginWithEmail, signInWithGoogle } = useAuth();
  const classes = useStyles();
  // const theme = useTheme();
  const [values, setValues] = useState({
    email:'',
    password: '',
  });
  const [errors,setErrors] = useState({
    email: '',
    password: '',
  })
  const [isLoading,setLoading] = useState(false);
  const [loginError,setLoginError] = useState("");
  useEffect(() => {
    if(currentUser !== "NoUser") {
      setLoading(true);
    }
    else setLoading(false)
    
  },[currentUser])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleLogin =async () => {
    if(!values.email.match(EMAIL_REGEX))
      setErrors({...errors,email: "Invalid Email"})
    if(!values.password.match(PASSWORD_REGEX))
      setErrors({...errors,password: "Minimum eight characters, at least one letter and one number"})
    if(values.email.match(EMAIL_REGEX) && values.password.match(PASSWORD_REGEX)) {
      setErrors({password:'',email:''});
      try {
        setLoading(true);
       await loginWithEmail(values.email, values.password);
       history.push("/dashboard");
    } catch (err) {
      setLoginError(err.message);
      setLoading(false);
    }
  }
  }
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    }
    catch (err) {
      setLoginError(err.message);
      setLoading(false);
    }
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <div className={classes.toolbar} />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={10}>
        <div className={classes.paper}>

          <Typography variant="h3">Sign In</Typography>
          {loginError.length > 0 ? <Alert severity="error" className={classes.alert}>{loginError}</Alert> : null} 
          <FormControl error={errors.email.length > 0}
            className={classes.input}
            variant="outlined"
            required
            fullWidth
          >
            <InputLabel htmlFor="email">
              Email
            </InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              label="Email"
              value={values.email}
              autoComplete="email"
              onChange={handleChange("email")}
              
            />
            {errors.email.length >0 ? <FormHelperText>{errors.email}</FormHelperText> : null}

          </FormControl>

          <FormControl error={errors.password.length > 0}
            className={classes.input}
            variant="outlined"
            required
            fullWidth
          >
            <InputLabel htmlFor="password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              label="Password"l
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }              
            />
            {errors.password.length >0 ? <FormHelperText>{errors.password}</FormHelperText> : null}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleLogin} disabled={isLoading}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to="/forgotpassword"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <GoogleButton onClick={handleGoogleLogin} disabled={isLoading}/>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.toolbar,
    padding: theme.spacing(3),
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
  image: {
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
  },
  input: {
    margin: theme.spacing(1),
  },
  alert: {
    margin: theme.spacing(1),
    
  }
}));

export default LogIn;
