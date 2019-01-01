// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import NoMatch from "./components/NoMatch";
// import "./App.css";

// const App = () => (
//    <Router>
//      <div>
//        <Switch>
//          <Route exact path="/" component={Register} />
//          <Route exact path="/login" component={Login} />
//          <Route exact path="/home" component={Home} />
//          {/* <Route exact path="/books/:id" component={Detail} /> */}
//          <Route component={NoMatch} />
//        </Switch>
//      </div>
//    </Router>
//  );

// export default App;


import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
// Components
import Register from './pages/Register'

import Login from "./pages/Login";
import Home from "./pages/Home";
// import NoMatch from "./components/NoMatch";
import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          email: response.data.user.email
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          email: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
   
        {/* <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        greet user if logged in:
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        } */}

        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Register/>}
        />

      </div>
    );
  }
}

export default App;
