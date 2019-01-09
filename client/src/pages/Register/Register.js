import React, { Component } from "react";
import {withRouter, Redirect} from "react-router-dom";
import API from "../../utils/API";
import Footer from "../../components/Footer";
import { Input, Button, Form, FormGroup } from "reactstrap";

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
        // this.props.history.push("/");
        this.setState({
          redirectTo: "/console/:id"
        })
      
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
          <h1 className="char1">R</h1>
          <h1 className="char2">x</h1>

          <article>
            <div className="welcome-section">
                  <h1 className="welcome-header">Register</h1>
                  <h2 className="welcome-subtitle">A single account for your peace of mind.</h2>

                  <p className="welcome-subtext">Register for a free RxInterax account here and get access to the prescription interaction member portal.</p>
                  <Button className="switch-btn" onClick={this.routeChange}>I already have an account</Button>
            
            </div>
          </article>
        </div>  

        <div className="right-half">
          <article> 
            <div>
              <h2 className="form-header">Create account</h2>
              <Form>
                <FormGroup>
                  <Input
                    className="form-control"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
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
                    className="login-signup-btn" 
                    onClick={this.handleSubmit} 
                    type="submit"
                >Register</Button>
              </Form>
            </div>
          </article>
        </div>
        <Footer
            appName="RxInterax"
            gitHub="GitHub Repo"
            gitHubLink="https://github.com/savannahcarr/rxinterax.git"
        />
      </section>
    )}
  }
}

export default withRouter(Register)