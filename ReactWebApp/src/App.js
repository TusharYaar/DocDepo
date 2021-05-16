import React, {useEffect,useState} from 'react';
import {useAuth} from "./context/AuthContext";
import { makeStyles } from '@material-ui/core/styles';

import {Switch, Route,Redirect} from 'react-router-dom';

import { Database } from "./firebase";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import DocDashboard from "./components/DocDashboard";

function App() {
  const classes = useStyles();
  const {isUser,currentUser} = useAuth();
  const [userNotes, setUserNotes] = useState([]);

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
    if(isUser()) getNotes();
  }, [currentUser,isUser]);


  return (
    <div className={classes.root}>
      <Navbar />
        <Switch>
        <Route path="/" exact component={Home} />
        
        <Route path="/dashboard/doc" exact>
          {isUser() ? <DocDashboard /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/dashboard" exact>
        {  isUser() ? <Dashboard userNotes={userNotes} /> : <Redirect to="/login"/> }
           </Route>
        <Route path="/login" exact>
          { isUser() ?  <Redirect to="/dashboard"/> : <LogIn /> }
        </Route>
        <Route path="/signup" exact>
          {  isUser() ? <Redirect to="/dashboard"/> :<SignUp /> }
        </Route>
       </Switch>
    </div>
  );
}
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

export default App;
