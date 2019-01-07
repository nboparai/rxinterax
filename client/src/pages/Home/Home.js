import React, { Component } from 'react'
import API from '../../utils/API';
import { List } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";

class Home extends Component {
  state = {
    meds: [],
    medname: "",
    strength: "",
    dosage: ""
  }

  componentDidMount() {
    if (this.props.userid.length) {
      this.loadMeds(this.props.userid);
    }
  }

  loadMeds = (userid) => {
    API.getUserMeds(userid)
      .then(res => {
        // Alex 1/6/19 - For some reason res is giving me an object, below is forcing into an array
        let drugArray = [];
        for (let i = 0; i < res.data[0].drugs.length; i++) {
          let drug = res.data[0].drugs[i].medname
          drugArray.push(drug);
        }
        this.setState({meds: drugArray, medname: "", strength: "", dosage: ""})
      })
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
    if (this.state.medname && this.state.strength) {
      API.saveMeds({
        medname: this.state.medname,
        strength: this.state.strength,
        dosage: this.state.dosage
      }, this.props.userid) //need to pass userId - done Alex 1/9/16

        .then(res => this.loadMeds(this.props.userid))
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
            name="medname"
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
            disabled={!(this.state.medname && this.state.dosage)}
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
        ) : null}

      </div>
    )
  }
}

export default Home

