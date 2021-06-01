import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import Link from "@material-ui/core/Link";
const Home = () => {
  const classes = useStyles();
  const [fadeIn, setFadeIn] = useState();
  useEffect(() => {
    setFadeIn(true);
  },[]);
  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <Grid container>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            container
            justify="center"
            alignItems="center"
            className={classes.image}
          ></Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            xs={12}
            md={6}
            item
          >
            <Fade in={fadeIn} style={{ transitionDelay: "500ms" }}>
              <Typography
                variant="h3"
                component="h2"
                className={classes.margin}
                align="center"
              >
                Send Files From Any Platform to Any Platform
              </Typography>
            </Fade>
            <Button
              variant="contained"
              size="large"
              color="primary"
              component={RouterLink}
              to="/login"
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.margin}>
          <Typography variant="h5" align="center">Write Notes &#x26; save files* and see instantly across every platform for Free</Typography>
          </Grid>
        <Grid>
            <Typography variant="h6" align="center">Made By TusharYaar</Typography>
            <Grid>
                <Typography variant="h6" align="left">
                    Follow Me: 
                </Typography>
                <Grid   container
  direction="column"
  justify="flex-start"
  alignItems="flex-start">
                <Link href="https://github.com/TusharYaar">Github</Link>
                <Link varient="body1" href="https://twitter.com/tushar_yaar" >Twitter</Link>
                <Link varient="body1" href="https://www.instagram.com/tushar_yaar/">Instagram</Link>
                <Link varient="body1" href="https://tusharyaar.netlify.app" >Know More about me</Link>
                <Typography variant="overline">*File size Limit is set to 50MB</Typography>
                </Grid>

            </Grid>
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
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(6,0),
  },
  image: {
    backgroundImage: "url(./homePage.png)",
    backgroundRepeat: "no-repeat",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    backgroundSize: "contain",
    backgroundPosition: "center",
    minHeight: 300,
  },
}));
export default Home;
