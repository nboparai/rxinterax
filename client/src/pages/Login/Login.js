import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import { InputGroup, InputGroupAddon, Input, Button, Alert, FormText, FormFeedback} from "reactstrap";
import "./Login.css";


class Login extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    errorMessage: "",
    showError: false
  }

  componentDidMount() {
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault();
    let userObj = {firstname: this.state.firstname, lastname: this.state.lastname, username: this.state.username, email: this.state.email, password: this.state.password};
    API.login(userObj).then((res)=>{
      if(res.data.length > 0){
        this.props.history.push("/home");
      }else{
        this.setState({errorMessage:"All fields required", showError:true})
      }
    })
  }

  validateEmail = event => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(event.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
  };


  render() {
    return (
      <div className="signupForm"> 
        <h2>Sign Up</h2>
        <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
            <Input
              type="text"
              name="firstname"
              id="exampleFirstName"
              placeholder="Joe"
              value={this.state.firstname}
              onChange={this.handleInputChange}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
            <Input
              type="text"
              name="lastname"
              id="exampleLastName"
              placeholder="Blow"
              value={this.state.lastname}
              onChange={this.handleInputChange}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
            <Input
              type="text"
              name="username"
              id="exampleUsername"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <InputGroupAddon addonType="append">@example.com</InputGroupAddon>
          </InputGroup>
          <FormFeedback valid={ this.state.validate.emailState === 'has-success' }>
              That's a tasty looking email you've got there.
          </FormFeedback>
          <FormFeedback invalid={ this.state.validate.emailState === 'has-danger' }>
              Uh oh! Looks like there is an issue with your email. Please input a correct email.
          </FormFeedback>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </InputGroup>
          <br />
          <Button color="primary" onClick={this.handleOnSubmit}>Sign Up</Button>
          <br />
          {this.state.showError?<Alert color="danger">{this.state.errorMessage}</Alert>:null}

    </div>
    )
  }
}

export default withRouter(Login);