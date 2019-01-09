import React, { Component } from "react"
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import { List } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
import "./Home.css";

class Home extends Component {
  constructor() {
  super()
  this.state = {
    meds: [],
    medname: "",
    strength: "",
    dosage: "",
    submitMedId: "",
    rxcui: '',
    drugIDs: [],
    interactions: [],
    redirectTo: null,
  };
  this.routeChange = this.routeChange.bind(this)
}

  componentDidMount() {
    if(!this.props.loggedin) {
      this.routeChange();
    }
    else if (this.props.userid.length) {
      this.loadMeds(this.props.userid);
    }
  }

  routeChange(){
    this.setState({ 
      redirectTo: "/"
    })
  }

  loadMeds = (userid) => {
    API.getUserMeds(userid)
      .then(res => {
        // Push drug names into med array
        let drugArray = [];
        for (let i = 0; i < res.data[0].drugs.length; i++) {
          let drug = res.data[0].drugs[i].medname
          drugArray.push(drug);
        }
        this.setState({ meds: drugArray, strength: "", dosage: "" });
        // Push rxcui id into drugid array
        let idArray = [];
        for (let i = 0; i < res.data[0].drugs.length; i++) {
          let id = res.data[0].drugs[i].rxcui;
          // idArray.push(id);
          idArray = [...idArray, id];
        }
        this.setState({ drugIDs: idArray });
        // had to move up here because for some reason this.state.drugids only returned most recent value
        this.drugInteractionSearch(idArray);
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
    if (this.state.medname) {
      API.saveMeds({
        medname: this.state.medname,
        dosage: this.state.dosage
      }, this.props.userid) //need to pass userId - done Alex 1/9/16

        .then(res => {
          // Sets the database _id for the med just submitted
          this.setState({ submitMedId: res.data._id });
          //Initiates API for finding the rxcui for the submitted medname
          this.drugIDSearch(this.state.medname)
        })
        .catch(err => console.log(err));
    }
  }

  updateDrugdb = (id, rxcui) => {
    API.upateDrugdb(id, {
      rxcui: rxcui
    })
    .then(res => {
      this.setState({ submitMedId: "" });
      // had to move the search below up into the loadmeds method 
      // this.drugInteractionSearch(this.state.rxcui);

      //reloads the med list
      this.loadMeds(this.props.userid)
    })
  }

  drugIDSearch = (drugs) => {
    API.drugIDSearch(drugs)
      .then(res => {
        //stores rxcui in state and clears medname as we no longer need it
        this.setState({ rxcui: res.data.approximateGroup.candidate[0].rxcui, medname: "" });
        this.updateDrugdb(this.state.submitMedId, this.state.rxcui)
      })
  }

  drugInteractionSearch = (drugids) => {
    API.drugInteractionSearch(drugids)
      .then(res => {
        if (res.data.fullInteractionTypeGroup){

        let interactionArray = [];
        for (let i = 0; i < res.data.fullInteractionTypeGroup[0].fullInteractionType.length; i++) {
          let x = `${res.data.fullInteractionTypeGroup[0].fullInteractionType[i].comment}
            ${res.data.fullInteractionTypeGroup[0].fullInteractionType[i].interactionPair[0].description}`

          interactionArray = [...interactionArray, x];
        }
        this.setState({ interactions: interactionArray });
      }
      })
    }

  render() {

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
    return (      
      
<section className="console-container">

        <Jumbotron>
          <h1> Enter your prescriptions</h1>
        </Jumbotron>

        <form className="med-form"> 
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="medname"
            placeholder="Name (required)"
          />

          <Input
            value={this.state.dosage}
            onChange={this.handleInputChange}
            name="dosage"
            placeholder="Dosage (optional)"
          />
          <FormBtn
            disabled={!(this.state.medname)}
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

        {this.state.interactions.length ? (
          <List>
            {this.state.interactions.map(interaction => (
              <li>{interaction}</li>
            ))}
          </List>
        ) : null}


      </section>
    )
  }
}

export default Home

