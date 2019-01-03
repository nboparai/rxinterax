import React, { Component } from "react";
import axios from 'axios'
// import API from "../../utils/API";
import { Input, Label, Button, Form, FormGroup } from "reactstrap";
import "./Register.css";

// https://codepen.io/nathansebhastian/pen/pxprOq?editors=0010

class Register extends Component {
  constructor() {
    super()
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      // Use dynamic name value to set our state object property
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    console.log('sign-up handleSubmit, user email: ')
		console.log(this.state.email)
		event.preventDefault()

		// Request to server to add a new email/password
		axios.post('/user/', {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('email already exists in database')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)
			})
  }

  render() {
    return (
      <div>
        <div className="signup-form"> 
          <h1>Register</h1>
          <p>Create your account. It's free and only takes a minute.</p> 
          <Form>
            <FormGroup>
              <Label htmlFor="firstname">First Name</Label>
              <Input
                className="form-control"
                id="firstname"
                name="firstname"
                type="text"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                className="form-control"
                id="lastname"
                name="lastname"
                type="text"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                className="form-control"
                id="email"
                name="email"
                type="email"
                value={this.state.email}
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
            >Sign up</Button>
          </Form>
        </div>
        <div className="text-center">Already have an account? 
            <a href="/login"> Login here</a>
        </div>
      </div>
    )
  }
}
export default Register