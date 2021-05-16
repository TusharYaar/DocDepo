import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { useAuth } from "../context/AuthContext";
import { Database } from "../firebase";

import UploadFileContainer from "./UploadFileContainer";
import Docs from "./Docs";
import UploadDocs from "./UploadDocs";
import MessageSnackBar from "./MessageSnackBar";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const DocDashboard = ({ userDocs }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [uploadDocs, setUploadDocs] = useState([]);
  const [snackbarValues, setSnackbarValues] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dialogValues, setDialogValues] = useState({
    open: false,
    type: "",
    elementId: "",
  });
  useEffect(() => {}, [currentUser.uid]);
  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };
  const handleSeachValueChange = (event) => {
    setSearchValue(event.target.value);
  };
  const addDocsForUpload = (newDocs) => {
    setUploadDocs((docs) => [...docs, ...newDocs]);
  };
  const uploadDocDetails = async (docDetails) => {
    console.log(docDetails);
    removeDocsForUpload(docDetails.name);
    try {
      await Database.DOCSDEPO.add(docDetails);
      setSnackbarValues({
        open: true,
        message: "Doc Uploaded to your depo",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setSnackbarValues({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };
  const removeDocsForUpload = (DocName) => {
    setUploadDocs((docs) => docs.filter((doc) => doc.name !== DocName));
  };
  const handleDeleteDoc = (id, path) => {
    setDialogValues({
      open: true,
      type: "Doc",
      elementId: { id: id, path: path },
    });
  };
  const deleteDoc = async (id, path) => {
    try {
      await Database.DOCSDEPO.doc(id).delete();
      await Database.STORAGE.ref().child(path).delete();
      console.log(id, path);
      setSnackbarValues({
        open: true,
        message: "Deleted Successfully",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setSnackbarValues({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarValues({ open: false, message: "", severity: "success" });
  };
  const dialogClose = (value, elementId) => {
    if (value) deleteDoc(elementId.id, elementId.path);
    setDialogValues({
      open: false,
      type: "Doc",
      elementId: { id: "", path: "" },
    });
  };
  const allFileNames = userDocs.map((doc) => doc.name);
  const showUploadDocs = uploadDocs.map((file) => (
    <UploadDocs
      key={file.name}
      file={file}
      uploadDocDetails={uploadDocDetails}
    />
  ));
  const handleDocDownload = (url) => {
    var win = window.open(url, "_blank");
    win.focus();
    setSnackbarValues({
      open: true,
      message: "Starting Download",
      severity: "info",
    });
  };
  const showUserDocs = () => {
    let filteredList = [...userDocs];
    if (filter !== "all")
      filteredList = filteredList.filter((docs) => docs.type.includes(filter));
    if (searchValue.length > 0)
      filteredList = filteredList.filter((docs) =>
        docs.name.includes(searchValue)
      );
    return filteredList.map((file, index) => (
      <Docs
        key={file.name}
        fileDetails={file}
        delay={`${index * 150}ms`}
        deleteDoc={handleDeleteDoc}
        downloadDoc={handleDocDownload}
      />
    ));
  };
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
          <ToggleButton value="all" aria-label="All Files">
            All
          </ToggleButton>
          <ToggleButton value="image" aria-label="Images">
            Images
          </ToggleButton>
          <ToggleButton value="pdf" aria-label="PDF">
            PDF
          </ToggleButton>
          <ToggleButton value="video" aria-label="Video">
            Video
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12}>
          <UploadFileContainer
            addDocsForUpload={addDocsForUpload}
            allFileNames={allFileNames}
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        {uploadDocs.length > 0 && showUploadDocs}
        {userDocs.length > 0 && showUserDocs()}
      </Grid>
      <MessageSnackBar handleClose={snackbarClose} details={snackbarValues} />
      <ConfirmDeleteDialog handleClose={dialogClose} details={dialogValues} />
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
