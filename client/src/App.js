import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// Components
import Register from './pages/Register'
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/navbar";

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

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(res => {
      console.log('Get user response: ')
      console.log(res.data)
      if (res.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          email: res.data.user.email
        })
      } else {
        console.log('Get User: no user found');
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

        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.email}!</p>
        }

        {/* Routes to different pages/components */}
        <Route exact path="/" component={Home} />
        <Route path="/login" render={() => 
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
