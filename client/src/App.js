import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NoMatch from "./components/NoMatch";

const App = () => (
   <Router>
     <div>
       <Switch>
         <Route exact path="/" component={Login} />
         <Route exact path="/home" component={Home} />
         {/* <Route exact path="/login" component={Login} />
         <Route exact path="/books/:id" component={Detail} /> */}
         <Route component={NoMatch} />
       </Switch>
     </div>
   </Router>
 );

export default App;