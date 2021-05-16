import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const Home = () => {
    const classes = useStyles();

    return (
        <div>
                  <div className={classes.toolbar} />
            This is home component
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }
}));
export default Home
