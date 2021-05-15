import React from "react";
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
import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import {withRouter,Link as RouterLink } from "react-router-dom"

const drawerWidth =200;
const TabRoutes = ["/dashboard","/dashboard/doc","/dashboard/forum"]

const Sidebar = ({openDrawer,handleDrawerClose,location}) => {
  const classes = useStyles();
  const theme = useTheme();
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
        value={TabRoutes.includes(location.pathname) ? location.pathname : false}
        className={classes.tabs}
      >
          <Tab label={<Grid container justify="flex-start" wrap="nowrap" alignItems="center" className={classes.tabGrid} > <TextFieldsRoundedIcon className={classes.tabIcon} /><Typography varient="h6" className={classes.tabText} > Text </Typography></Grid>} value="/dashboard" component={RouterLink} to="/dashboard" />
          <Tab label={<Grid container justify="flex-start" wrap="nowrap" alignItems="center" className={classes.tabGrid} > <InsertDriveFileOutlinedIcon className={classes.tabIcon} /><Typography varient="h6"className={classes.tabText} > Documents </Typography></Grid>} value="/dashboard/doc" component={RouterLink} to="/dashboard/doc"/>
          <Tab label={<Grid container justify="flex-start" wrap="nowrap" alignItems="center" className={classes.tabGrid} > <ForumOutlinedIcon className={classes.tabIcon} /><Typography varient="h6"className={classes.tabText} > Forum </Typography></Grid>} value="/dashboard/forum" component={RouterLink} to="/dashboard/forum"/>
            
      </Tabs>
      <Divider />


      <List> 
      <ListItem button key={"Text"}>
            <ListItemIcon>
              <ReportProblemOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Report problem"} />
      </ListItem>
      </List>

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
  padding: theme.spacing(1,0,1,1)
  },
  tabs: {
    flexGrow: 1
  }
}));

export default withRouter(Sidebar);
