import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Zoom from '@material-ui/core/Zoom';
import FileTypeIcon from "./FileTypeIcon";
const File = (props) => {
  const classes = useStyles();
  const handleDownload = () => {
  props.downloadDoc(props.fileDetails.url,props.fileDetails.name)
  };
  const handleDelete = () => {
    props.deleteDoc(props.fileDetails.id,props.fileDetails.path)
  };
  return (
        <Zoom in={true} style={{ transitionDelay: props.delay ? props.delay : "200ms" }}>
            <Paper elevation={3} className={classes.paper}>
      <Grid container justify="flex-start" direction="row" wrap="wrap">
        <Grid item xs={1}>
        <FileTypeIcon fileType={props.fileDetails.type}/>
        </Grid>
        <Grid item  zeroMinWidth xs={9} className={classes.textContainer}>
          <Typography variant="caption">
            {props.fileDetails.createdAt
              ? props.fileDetails.createdAt.toDate().toDateString()
              : "NoDate"}
          </Typography>
          <Typography variant="body1" className={classes.fileName}  noWrap >
            {props.fileDetails.name.slice(0,30)}
          </Typography>
        </Grid>
        <Grid container item  xs={12} sm={2} justify="flex-end" direction="row" alignItems="center">
 
         <IconButton
            color="primary"
            aria-label="Download Doc"
            component="span"
            onClick={handleDownload}
          >
            <GetAppRoundedIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Delete Doc"
            component="span"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
        </Zoom>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    // height: theme.spacing(9),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    display: "flex",
    // overflowX: "hidden"
  },
  fileName: {
    margin: theme.spacing(1),
  },
  textContainer: {
    maxWidth: "100%"
  }
}));
export default File;
