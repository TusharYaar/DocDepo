import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";



const UploadFileContainer = (props) => {
  const classes = useStyles();
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    props.addDocsForUpload(acceptedFiles);
  }, [props]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box
      borderColor="grey.500"
      border={1}
      borderRadius="borderRadius"
      className={classes.paper}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
          <Grid container justify="center" alignItems="center">
               <Typography variant="h5" color="primary">Drop the files here ...</Typography>
          </Grid>
      ) : (
        <Grid container justify="center" alignItems="center">
            <Typography variant="h5" color="primary">Drop Files or Click the Box</Typography>
        </Grid>
      )}
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: 100,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}));
export default UploadFileContainer;
