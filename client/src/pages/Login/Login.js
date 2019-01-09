import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import Footer from "../../components/Footer";
import { Input, Button, Form, FormGroup } from "reactstrap";
import "./Login.css";
import swal from "sweetalert2";

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
        swal("Something was wrong with your username or password");
        console.log('login error: ')
        console.log(error);   
    })
  }

  routeChange(){
    this.setState({ 
      redirectTo: "/signup"
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
                <h1 className="welcome-header">Welcome</h1>
                <h2 className="welcome-subtitle">Register for an RxInterax account here.</h2>

                <p className="welcome-subtext">Register for a free RxInterax account here and get access to the prescription interaction member portal.</p>
                <Button className="switch-btn" onClick={this.routeChange}>Register Here</Button>

            </div>
          </article>
        </div>

        <div className="right-half">
          <article> 
          <div>
              <h2 className="form-header">Or login to your account</h2>
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
                    className="login-signup-btn" 
                    onClick={this.handleSubmit} 
                    type="submit"
                >Login</Button>
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
export default Login