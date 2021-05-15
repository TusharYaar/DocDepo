import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
const UploadFileContainer = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const classes = useStyles();
  return (
    <Box
      borderColor="grey.500"
      border={1}
      borderRadius="borderRadius"
      className={classes.paper}
      {...getRootProps()}
    >
        <input {...getInputProps()} />
        {
        isDragActive ?
          <p>Drop the files here ...</p> :
         
      <Grid container justify="center" alignItems="center">
        Upload File Container
      </Grid>}
    </Box>
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

  searchGridContainer: { padding: theme.spacing(2) },
  inputCard: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  margin: { margin: theme.spacing(1, 0) },
  paper: {
    minHeight: 100,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));
export default UploadFileContainer;
