import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const Dashboard = () => {
    const classes = useStyles();

    return (
        <div>
                  <div className={classes.toolbar} />
            This is dashboard component
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
export default Dashboard
