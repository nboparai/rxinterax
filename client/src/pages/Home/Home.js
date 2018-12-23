import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

// import API from "../../utils/API";
// import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Alert } from "reactstrap";


class Home extends Component {

   render() {
      return (
        <Container fluid>
          <Jumbotron>
              <h1>
                Welcome
              </h1>
            </Jumbotron>
        </Container>
      ) 
   }
}

export default withRouter(Home);