
import './App.css';

import {Switch, Route} from 'react-router-dom';
import Login from "./components/Login"
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login}/>
       </Switch>
    </div>
  );
}

export default App;
