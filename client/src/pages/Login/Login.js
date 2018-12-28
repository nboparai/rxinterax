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
      firstname: "",
      lastname: "",
      username: "",
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
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   }, function(){ this.canSubmit()})
  // }

  canSubmit() {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    const { firstname, lastname, username, email, password } = this.state
    // TODO: add valid email format validation in this condition
    if (firstname.length > 0 && lastname.length > 0 && username.length > 0 && email.length > 0 && password.length >= 5 && emailTest.test(email.toLowerCase())) {
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
    const { firstname, lastname, username, email, password } = this.state
    console.log(`User registration details: \n
        ${firstname} + Last Name: ${lastname} \n
        Username: ${username} \n
        Email: ${email} \n)`);

    API.saveUser({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password
    })
    // .then((res)=>{ })
    .catch(err => console.log(err));
  }


    // API.login(userObj).then((res)=>{
    //     console.log(res.data);
    //     if(res.data.length > 0){
    //       this.setState({errorMessage:"User data found!", showError:true});
    //       // this.props.history.push("/books");
    //     }else{
    //       this.setState({errorMessage:"No User Found", showError:true});
    //     }      
    //   })
    //     // .then(res => this.loadBooks())
    //     .catch(err => console.log(err));
    // }

  render() {
    return (
      <div>
        <div className="signup-form"> 
          <h1>Register</h1>
          <p>Create your account. It's free and only takes a minute.</p> 
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="firstname">First Name</Label>
              <Input
                className="form-control"
                id="firstname"
                name="firstname"
                type="text"
                value={this.state.firstname}
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                className="form-control"
                id="username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChange}
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
            <Button className="btn btn-info btn-block" disabled={this.state.isSubmitDisabled}>Sign up</Button>

          </Form>
        </div>
        <div className="text-center">Already have an account? 
            <a href=""> Login here</a>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);