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
  const {isUser} = useAuth();

  return (
    <div className={classes.root}>
      <Navbar />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact>
        {  isUser() ? <Dashboard /> : <Redirect to="/login"/> }
           </Route>
        <Route path="/login" exact>
          { isUser() ?  <Redirect to="/dashboard"/> : <LogIn /> }
        </Route>
        <Route path="/signup" exact>
          {  isUser() ? <Redirect to="/dashboard"/> :<SignUp /> }
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
