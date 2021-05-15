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
const DocDashboard = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [userDocs, setUserDocs] = useState([]);
  const [uploadDocs, setUploadDocs] = useState([]);
  useEffect(() => {
    const getDocs = async () => {
      try {
        var docs = [];
        Database.DOCSDEPO.where("user", "==", currentUser.uid).onSnapshot(
          (snapshot) => {
            docs = [];
            snapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            setUserDocs(docs);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    getDocs();
  }, [currentUser.uid]);
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
    } catch (err) {
      console.log(err);
    }
  };
  const removeDocsForUpload = (DocName) => {
    setUploadDocs((docs) => docs.filter((doc) => doc.name !== DocName));
  };

  const allFileNames = userDocs.map((doc) => doc.name);
  const showUploadDocs = uploadDocs.map((file) => (
    <UploadDocs
      key={file.name}
      file={file}
      uploadDocDetails={uploadDocDetails}
    />
  ));
  const showUserDocs = userDocs.map((file) => (
      <Docs key={file.name} fileDetails={file} />
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
          <UploadFileContainer
            addDocsForUpload={addDocsForUpload}
            allFileNames={allFileNames}
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        {uploadDocs.length > 0 && showUploadDocs}
        {userDocs.length > 0 && showUserDocs}
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
