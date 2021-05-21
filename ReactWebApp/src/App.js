import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

import { Switch, Route, Redirect } from "react-router-dom";

import { Database } from "./firebase";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import DocDashboard from "./components/DocDashboard";
import GiveDetails from "./components/GiveDetails";
function App() {
  const classes = useStyles();
  const { isUser, currentUser } = useAuth();
  const [userNotes, setUserNotes] = useState([]);
  const [userDocs, setUserDocs] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        var notes = [];
        Database.NOTESDEPO.where("user", "==", currentUser.uid).onSnapshot(
          (snapshot) => {
            notes = [];
            snapshot.forEach((doc) => {
              notes.push({ ...doc.data(), id: doc.id });
            });
            setUserNotes(notes);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
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

    if (currentUser && currentUser !== "NoUser") {
      getNotes();
      getDocs();
    }
  }, [currentUser]);

  return (
    <div className={classes.root}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard/doc" exact>
          {isUser() && currentUser.detailsGiven ? (
            <DocDashboard userDocs={userDocs} />
          ) : isUser() ? <Redirect to="/givedetails" /> : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/givedetails" exact>
          <GiveDetails/>
        </Route>
        <Route path="/dashboard" exact>
          {isUser() && currentUser.detailsGiven ?  
            <Dashboard userNotes={userNotes} />
           :  isUser() ? <Redirect to="/givedetails" /> :
            <Redirect to="/login" />
          }
        </Route>
        <Route path="/login" exact>
          
            {isUser() && currentUser.detailsGiven ?  <Redirect to="/dashboard" /> : isUser() ?  <Redirect to="/givedetails" /> :  <LogIn />}
          
        </Route>
        <Route path="/signup" exact>
          {isUser()  && currentUser.detailsGiven ? <Redirect to="/dashboard" /> : isUser() ?  <Redirect to="/givedetails" /> : <SignUp />}
        </Route>
        {/* <Route path="/"><Redirect to="/dashboard"/></Route> */}
      </Switch>
    </div>
  );
}
const useStyles = makeStyles({
  root: {
    display: "flex",
  },
});

export default App;
