import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import TextFieldsRoundedIcon from "@material-ui/icons/TextFieldsRounded";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { withRouter, Link as RouterLink } from "react-router-dom";
import { Database } from "../firebase";

import MessageSnackBar from "./MessageSnackBar";
import FeedbackDialog from "./FeedbackDialog";
const drawerWidth = 200;
const TabRoutes = ["/dashboard", "/dashboard/doc", "/dashboard/globalchat"];

const Sidebar = ({
  openDrawer,
  handleDrawerClose,
  location,
  userEmail,
  userId,
}) => {
  const  Filter = require('bad-words');
  const  filter = new Filter();
  const classes = useStyles();
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogResponse = async (response) => {
    setDialogOpen(false);
    if (response && response.length > 3 && response.length < 150) {
      try {
        await Database.FEEDBACKS.add({
          user: userId,
          email: userEmail,
          feedback: filter.clean(response),
        });
        setSnackbarValues({ open: true, message: "Feedback sent successfully. Thank You", severity: "success" });

      } catch (err) {
        setSnackbarValues({ open: true, message: err.message, severity: "error" });
      }
    }
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarValues({ open: false, message: "", severity: "success" });
  };
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openDrawer,
        [classes.drawerClose]: !openDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <Tabs
        orientation="vertical"
        value={
          TabRoutes.includes(location.pathname) ? location.pathname : false
        }
        className={classes.tabs}
      >
        <Tab
          label={
            <Grid
              container
              justify="flex-start"
              wrap="nowrap"
              alignItems="center"
              className={classes.tabGrid}
            >
              {" "}
              <TextFieldsRoundedIcon className={classes.tabIcon} />
              <Typography varient="h6" className={classes.tabText}>
                {" "}
                Text{" "}
              </Typography>
            </Grid>
          }
          value="/dashboard"
          component={RouterLink}
          to="/dashboard"
        />
        <Tab
          label={
            <Grid
              container
              justify="flex-start"
              wrap="nowrap"
              alignItems="center"
              className={classes.tabGrid}
            >
              {" "}
              <InsertDriveFileOutlinedIcon className={classes.tabIcon} />
              <Typography varient="h6" className={classes.tabText}>
                {" "}
                Documents{" "}
              </Typography>
            </Grid>
          }
          value="/dashboard/doc"
          component={RouterLink}
          to="/dashboard/doc"
        />
       
      </Tabs>
      <Divider />

      <List >
        <ListItem button key={"Text"} onClick={handleDialogOpen} className={classes.list}>
          <ListItemIcon>
            <ReportProblemOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Report problem"} />
        </ListItem>
      </List>
      <FeedbackDialog open={dialogOpen} dialogResponse={handleDialogResponse} />
      <MessageSnackBar handleClose={snackbarClose} details={snackbarValues} />
    </Drawer>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  tabIcon: {
    marginRight: theme.spacing(4),
  },
  tabGrid: {
    padding: theme.spacing(1, 0, 1, 1),
  },
  tabs: {
    flexGrow: 1
  },
  list: {
    marginBottom: theme.spacing(3),
  }
}));

export default withRouter(Sidebar);
