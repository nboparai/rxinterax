import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Alert } from "reactstrap";
import "./Login.css";


class Login extends Component {
  state = {
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

  onSubmit = () =>{
    let userObj = {username: this.state.username, password: this.state.password};
    API.login(userObj).then((res)=>{
      if (res.data.length > 0) {
        this.props.history.push("/meds");
      } else {
        this.setState({errorMessage:"No User Found", showError:true});
      }
    })
  }

  render() {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
          <Input name="username" value={this.state.username} onChange={this.handleInputChange} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Password&nbsp;</InputGroupAddon>
          <Input name="password" value={this.state.password} onChange={this.handleInputChange}/>
        </InputGroup>
        <Button color="success" onClick={this.onSubmit}>
          Login
        </Button>
        {this.state.showError?<Alert color="danger">{this.state.errorMessage}</Alert>:null}
      </div>
    )
  }
}

export default withRouter(Login);