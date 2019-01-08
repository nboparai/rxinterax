import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
// import { Row, Container } from "../../components/Grid";
import { Input, Button, Form, FormGroup } from "reactstrap";
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
        <section className="container">
          <div className="left-half"> 
            <article>
              <div classname="welcome-section">
                  <h1 className="welcome-header">Welcome</h1>
                  <h2 className="welcome-subtitle">Register for an RxInterax account here.</h2>

                  <p className="welcome-subtext">Register for a free RxInterax account here and get access to the prescription interaction member portal.</p>
                  <Button className="register-btn">Register Here</Button>
              </div>
            </article>
          </div>

          <div className="right-half">
            <article> 
            <div className="login-form"> 
                <h1>Or login to your account</h1>
                <Form>
                  <FormGroup>
                    <Input
                      className="form-control"
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Your username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      className="form-control"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button 
                      className="btn login-btn btn-light" 
                      onClick={this.handleSubmit} 
                      type="submit"
                  >Login</Button>
                </Form>
              </div>
              {/* <div className="text-center">Don't have an account? 
                  <a href="/signup"> Register here</a>
              </div> */}
              </article>  
          </div>
        </section>
      )
    }
  }
}
export default Login