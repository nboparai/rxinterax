import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import "./App.css";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
     
      </Switch>
    </div>
  </Router>
);

export default App;