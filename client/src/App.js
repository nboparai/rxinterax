import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// Components
import Register from './pages/Register'
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import API from "./utils/API"

import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      //Alex 1/6/19 - Added userid
      userid: ''
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
          username: res.data.user.username
        })
      } else {
        console.log('Get User: no user found');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        {/* Alex 1/6/19 - Added userid */}
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} userid={this.state.userid} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }

        {/* Routes to different pages/components */}
        <Route exact path="/console/:id" render={({match}) =>
          <Home
            userid={match.params.id}
          />}
        />
        <Route exact path="/" render={() =>
          <Login
            updateUser={this.updateUser}
          />}
        />
        <Route exact path="/signup" component={Register} />

      </div>
    );
  }
}

export default App;
