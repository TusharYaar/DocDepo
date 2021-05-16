import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

  const BorderLinearSuccess = withStyles((theme) => ({
    root: {
      height: 10,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      backgroundColor: '#4caf50',
    },
  }))(LinearProgress);

  const BorderLinearError = withStyles((theme) => ({
    root: {
      height: 10,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      backgroundColor: '#ff3d00',
    },
  }))(LinearProgress);

const ProgressBar = ({value,url,error}) => {
    if (error && error === true) return <BorderLinearError variant="determinate" value={100}  />
    if (value && value > 0 && value !== 100 )
    return <BorderLinearProgress variant="determinate" value={value} />
    else if(value === 100 && !url) return <BorderLinearSuccess variant="determinate" value={100} />
    else if (value === 100 && url) return <BorderLinearSuccess />
    else return <BorderLinearProgress />
}

export default ProgressBar
