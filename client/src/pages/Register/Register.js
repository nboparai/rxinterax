import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import { Input, Label, Button, Form, FormGroup } from "reactstrap"
import "./Register.css"

// https://medium.com/@brendt_bly/simple-mern-passport-app-tutorial-4aec2105e367

class Register extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		// Request to server to add a new user data
		axios.post('/user/', {
      username: this.state.username,
			email: this.state.email,
			password: this.state.password
		})
			.then(res => {
				console.log(res)
				if (!res.data.errmsg) {
					console.log('successful signup')
          // If user successfully added to database, redirect to login page
          this.props.history.push("/login");
				} else {
					console.log('username already exists')
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
export default withRouter(Register)