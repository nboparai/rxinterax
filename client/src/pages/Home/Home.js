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
    dosage: "",
    submitMedId: "",
    rxcui: '',
    drugIDs: [],
    interactions: []
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
        this.setState({ meds: drugArray, strength: "", dosage: "" });
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

        .then(res => {
          // Sets the database _id for the med just submitted
          this.setState({ submitMedId: res.data._id });
          //Initiates API for finding the rxcui for the submitted medname
          this.drugIDSearch(this.state.medname)
          //reloads the med list
          this.loadMeds(this.props.userid)
        }
        )
        .catch(err => console.log(err));
    }
  };

  updateDrugdb = (id, rxcui) => {
    API.upateDrugdb(id, {
      rxcui: rxcui
    })
      .then(res => {
        this.setState({ submitMedId: ""});
      })
  }

  drugIDSearch = (drugs) => {
    API.drugIDSearch(drugs)
      .then(res => {
        console.log(res.data.approximateGroup.candidate[0].rxcui);
        //stores rxcui in state and clears medname as we no longer need it
        this.setState({ rxcui: res.data.approximateGroup.candidate[0].rxcui, medname: "" });
        console.log('rxcui ' + this.state.rxcui)
        this.updateDrugdb(this.state.submitMedId, this.state.rxcui)
      }
      );
  }


  drugInteractionSearch = (drugids) => {
    if (this.state.drugids.length > 1) {
      API.drugInteractionSearch(drugids)
        .then()
    }
  }

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

