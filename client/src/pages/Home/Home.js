import React, { Component } from 'react'
import API from '../../utils/API';
import { List } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";

class Home extends Component {
  state ={
    meds: [],
    strength: "",
    dosage: ""
  }

  componentDidMount() {
    // this.loadMeds();
  }

  loadMeds = () => {
    API.getUserMeds()
      .then(res => 
        this.setState({meds: res.data, strength: "", dosage: ""}))
        .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.strength) {
      API.saveMeds({
        title: this.state.name,
        author: this.state.strength,
        synopsis: this.state.dosage
      }, "5c310aaa8ee0f1302cd92c59"//need to pass userId)
        .then(res => this.loadMeds())
        // console.log(res)
        .catch(err => console.log(err));
    }
  };
  render() {
    return (
      <div>
        <Jumbotron>
          <h1> Enter your prescriptions</h1>
        </Jumbotron>

        <form>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="name"
            placeholder="Name (required)"
          />

          <Input
            value={this.state.strength}
            onChange={this.handleInputChange}
            name="strength"
            placeholder="Strength (required)"
          />

          <Input
            value={this.state.dosage}
            onChange={this.handleInputChange}
            name="dosage"
            placeholder="Dosage (optional)"
          />
          <FormBtn
            disabled={!(this.state.name && this.state.dosage)}
            onClick={this.handleFormSubmit}
            >
            Submit Info
          </FormBtn>
        </form>
        
         {this.state.meds.length ? (
           <List>
             {this.state.meds.map(med => (
               <li>{med}</li>
             ))}
           </List>
         ):null}
        
      </div>
    )
  }
}

export default Home

