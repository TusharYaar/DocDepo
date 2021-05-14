import {useAuth} from "./context/AuthContext";
import { makeStyles } from '@material-ui/core/styles';

import {Switch, Route,Redirect} from 'react-router-dom';


import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";


function App() {
  const classes = useStyles();
  const {currentUser } = useAuth();
  const isUserLoggedIn = () => {
    if(currentUser !=="NoUser" && currentUser !== null)
      return true;
    return false;
  }
  return (
    <div className={classes.root}>
      <Navbar />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact>
        {  isUserLoggedIn() ? <Dashboard /> : <Redirect to="/login"/> }
           </Route>
        <Route path="/login" exact>
          {<LogIn /> }
        </Route>
        <Route path="/signup" exact>
          {/* {  isUserLoggedIn() ? <Redirect to="/"/> :<SignUp /> } */}
          <SignUp />
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
