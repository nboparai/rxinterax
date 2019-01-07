import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import { Input, Label, Button, Form, FormGroup } from "reactstrap";
import "./Login.css";

// https://codepen.io/nathansebhastian/pen/pxprOq?editors=0010

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      redirectTo:null,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)  
  }

  handleChange(event) {
    this.setState({
      // Use dynamic name value to set our state object property
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login-page handleSubmit');
    console.log(this.state.username);

    let userObj = {username: this.state.username, password: this.state.password};
    API.login(userObj).then((res)=>{
      console.log('login response: ')
      console.log(res)
      if (res.status === 200) {
        // Update App.js state
        //Alex 1/6/19 - Added userid
        this.props.updateUser({
          loggedIn: true,
          username: res.data.username,
          userid: res.data.userid
        })
        // Update the state to redirect to home
        this.setState({
          redirectTo: "/console/" + res.data.userid
        })
      }
    }).catch(error => {
        // alert("Something was wrong with your username or password");
        console.log('login error: ')
        console.log(error);   
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <div className="login-form"> 
            <h1>Login</h1>
            <Form>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  className="form-control"
                  id="username"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  className="form-control"
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button 
                  className="btn btn-info btn-block" 
                  onClick={this.handleSubmit} 
                  type="submit"
              >Login</Button>
            </Form>
          </div>
          <div className="text-center">Don't have an account? 
              <a href="/signup"> Register here</a>
          </div>
        </div>
      )
    }
  }
}
export default Login