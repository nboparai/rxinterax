import React, { Component } from "react";
import {withRouter, Redirect} from "react-router-dom";
import API from "../../utils/API";
import { Input, Button, Form, FormGroup } from "reactstrap";
import "./Register.css";

// https://medium.com/@brendt_bly/simple-mern-passport-app-tutorial-4aec2105e367

// --------------------------------------------------------------
//     SAV - REDO REGISTER PAGE TO MATCH LOGIN
// --------------------------------------------------------------

class Register extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      redirectTo:null,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.routeChange = this.routeChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      // Use dynamic name value to set our state object property
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('sign-up handleSubmit, username: ');
    console.log(this.state.username);

    let userObj = {username: this.state.username, email: this.state.email, password: this.state.password};
    API.registerUser(userObj).then((res)=>{
      console.log(res)
      if (!res.data.errmsg) {
        console.log('successful signup')
        // If user successfully added to database, redirect to login page
        this.props.history.push("/");
      
      } else {
        console.log('username already exists')
      }
    }).catch(error => {
      console.log('signup error: ')
      console.log(error)
    })
  }

  routeChange(){ 
    this.setState({ 
      redirectTo: "/"
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
            <div className="welcome-section">
                  <h1 className="welcome-header">Welcome</h1>
                  <h2 className="welcome-subtitle">Already an RxInterax member?</h2>

                  <p className="welcome-subtext">Login to your RxInterax account here and get access to the prescription interaction member portal.</p>
                  <Button className="login-btn" onClick={this.routeChange}>Login Here</Button>
            
            </div>
          </article>
        </div>  

        <div className="right-half">
          <article> 
            <div className="signup-form">
              <h1>Register</h1>
              <Form>
                <FormGroup>
                  <Input
                    className="form-control"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Create your username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={this.state.email}
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
                >Sign up</Button>
              </Form>
            </div>
          </article>
        </div>
      </section>
    )
    }
  }
}
export default withRouter(Register)