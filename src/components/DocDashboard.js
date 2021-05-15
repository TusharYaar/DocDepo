import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import UploadFileContainer from "./UploadFileContainer";
// import File from "./File";
import UploadFile from "./UploadDocs";
const DocDashboard = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  // const [userDocs,setUserDocs] = useState([]);
  const [uploadDocs, setUploadDocs] = useState([]);
  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };
  const handleSeachValueChange = (event) => {
    setSearchValue(event.target.value);
  };
  const addDocsForUpload = (newDocs) => {
    setUploadDocs((docs) => [...docs, ...newDocs]);
  };
  const removeDocsForUpload = (DocName) => {
    setUploadDocs((docs) => docs.filter((doc)=>  doc.name !== DocName))
  }
  const showUploadFiles = uploadDocs.map((file) => (
    <UploadFile key={file.name} file={file} removeDocsForUpload={removeDocsForUpload}/>
  ));
  return (
    <div className={classes.pageDiv}>
      <div className={classes.toolbar} />
      <Grid
        container
        justify="space-between"
        className={classes.searchGridContainer}
      >
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            value={searchValue}
            onChange={handleSeachValueChange}
            className={classes.margin}
            variant="filled"
            id="search"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <ToggleButtonGroup
          value={filter}
          exclusive
          className={classes.margin}
          onChange={handleFilter}
          aria-label="text alignment"
        >
          <ToggleButton value="All" aria-label="All Files">
            All
          </ToggleButton>
          <ToggleButton value="Images" aria-label="Images">
            Images
          </ToggleButton>
          <ToggleButton value="PDF" aria-label="PDF">
            PDF
          </ToggleButton>
          <ToggleButton value="Video" aria-label="Video">
            Video
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12}>
          <UploadFileContainer addDocsForUpload={addDocsForUpload} />
        </Grid>
      </Grid>
      <Grid container justify="center">
        {uploadDocs.length > 0 && showUploadFiles}
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

  searchGridContainer: { padding: theme.spacing(2) },
  inputCard: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  margin: { margin: theme.spacing(1, 0) },
  pageDiv: { flexGrow: 1 },
}));
export default DocDashboard;
