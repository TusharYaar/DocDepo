import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { withRouter,Link as RouterLink } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import {useAuth } from "../context/AuthContext"
import Sidebar from "./Sidebar";

const drawerWidth = 200;

const Navbar= (props) => {
  const classes = useStyles();
  const {currentUser,logOut, isUser} = useAuth();
  const [openDrawer, setOpenDrawer]= useState(false);
  const [openMenu, setOpenMenu]= useState(false);
  const [menuOpen, setMenuOpen] =useState(null);
  if(["/login","/signup","/forgotpassword"].includes(props.location.pathname)) {return <div></div>}
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handleMenu = (event) => {
  setMenuOpen(event.currentTarget);
  setOpenMenu(true)
  };

  const handleClose = () => {
    setMenuOpen(null);
    setOpenMenu(false)
  };

  return (
    <div >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
        {   isUser() ?       <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton> : null}
          <Link variant="h6" noWrap className={classes.title} underline="none" color="inherit" component={RouterLink} to="/">
           DocDepo
          </Link>
          {isUser() ?  <Link component={RouterLink} to="/dashboard" color="inherit" underline="none"> <Hidden only="xs"> Go to</Hidden> Dashboard</Link> :<Link underline="none" component={RouterLink} to="/login" color="inherit"> Login</Link> }
          {/* <Typography variant="p" noWrap >{isUser() ? "Go to Dashboard": "Login"}</Typography> */}
          {isUser() && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={menuOpen}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem disabled><Typography>{currentUser.email}</Typography></MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={RouterLink} to="/setting">Setting</MenuItem>
                <MenuItem onClick={logOut}>LogOut</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isUser() ? <Sidebar  openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} handleDrawerClose={handleDrawerClose} /> : null}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    
  }
}));


export default withRouter(Navbar);