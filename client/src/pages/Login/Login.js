import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import { Input, Label, Button, Form, FormGroup } from "reactstrap";
import "./Login.css";

// https://codepen.io/nathansebhastian/pen/pxprOq?editors=0010

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      isSubmitDisabled:true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      // use dynamic name value to set our state object property
      [event.target.name]: event.target.value
    }, function(){ this.canSubmit()})
  }

  canSubmit() {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    const { email, password } = this.state
    // TODO: add valid email format validation in this condition
    if (email.length > 0 && password.length >= 5 && emailTest.test(email.toLowerCase())) {
      this.setState({
        isSubmitDisabled:false
      })
    }
    else {
      this.setState({
        isSubmitDisabled:true
      })
    }
  }

  // Triggered on submit
  handleSubmit = (event) => {
    event.preventDefault();
    // Get const values by destructuring state
    const { email, password } = this.state

    API.getUser({
      email: email,
      password: password
    })
    .then((res)=>{ 
      if(res.data.length > 0){
        this.props.history.push("/home");
      }else{
        console.log("No user found");
      }
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div>
        <div className="login-form"> 
          <h1>Login</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                className="form-control"
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <Button className="btn btn-info btn-block" disabled={this.state.isSubmitDisabled}>Login</Button>

          </Form>
        </div>
        <div className="text-center">Don't have an account? 
            <a href="/"> Register here</a>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);