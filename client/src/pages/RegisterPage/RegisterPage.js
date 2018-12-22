// The fetch() function is a Promise-based mechanism for programmatically making web 
// requests in the browser. This project is a polyfill that implements a subset of 
// the standard Fetch specification, enough to make fetch a viable replacement for 
// most uses of XMLHttpRequest in traditional web applications.
// Polyfills allow web developers to use an API regardless of whether or not it 
// is supported by a browser, and usually with minimal overhead. Typically they 
// first check if a browser supports an API, and use it if available, otherwise 
// using their own implementation.
// In computer programming, a shim is a library that transparently intercepts API calls 
// and changes the arguments passed, handles the operation itself or redirects the 
// operation elsewhere. Shims can be used to support an old API in a newer environment, 
// or a new API in an older environment. Shims can also be used for running programs 
// on different software platforms than they were developed for.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API'
// import { Col, Row, Container } from "../../components/Grid";
import { Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";

import 'whatwg-fetch';

// import { getFromStorage,
//   // setInStorage,
// } from '../../utils/storage';

// In the constructor, add a key and default value to the state for 
// sign up error (message to the user if something goes wrong), 
// sign up email, and sign up password. At this time, we will also 
// add the log in error, log in email, and log in password. 
// You will also need a isLoading boolean value in the state for 
// whenever a request to the server is being made.

class RegisterPage extends Component {
   constructor(props) {
    super(props);
      this.state = {
        users: [],
        // isLoading: true,
        // token: '',
        signUpUsername: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpError: ''
      };
      // this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
      // this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
      // this.onSignUp = this.onSignUp.bind(this);
      // this.logout = this.logout.bind(this);
   };

  //  componentDidMount() {
  //   const obj = getFromStorage('rxinterax');
  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     // Verify token
  //     fetch('/api/account/verify?token=' + token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.success) {
  //           this.setState({
  //             token,
  //             isLoading: false
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false,
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.email && this.state.password) {
      API.saveNewUser({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
        // .then(res => this.needMethod())
        .catch(err => console.log(err));
    }
  };


  // congruent to handleInputChange
  //  onTextboxChangeSignUpUsername(event) {
  //     this.setState({
  //       signUpUsername: event.target.value,
  //     });
  //  }

  //  onTextboxChangeSignUpEmail(event) {
  //     this.setState({
  //       signUpEmail: event.target.value,
  //     });
  //  }
  
  //   onTextboxChangeSignUpPassword(event) {
  //     this.setState({
  //       signUpPassword: event.target.value,
  //     });
  //  }

  //  onSignUp() {
  //     // Grab state
  //     const {
  //       signUpUsername,
  //       signUpEmail,
  //       signUpPassword,
  //     } = this.state;
  
  //     this.setState({
  //       isLoading: true,
  //     });
  
  //     // Post request to backend
  //     fetch('/api/account/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         username: signUpUsername,
  //         email: signUpEmail,
  //         password: signUpPassword,
  //       }),
  //     }).then(res => res.json())
  //       .then(json => {
  //         console.log('json', json);
  //         if (json.success) {
  //           this.setState({
  //             signUpError: json.message,
  //             isLoading: false,
  //             signUpUsername: '',
  //             signUpEmail: '',
  //             signUpPassword: '',
  //           });
  //         } else {
  //           this.setState({
  //             signUpError: json.message,
  //             isLoading: false,
  //           });
  //         }
  //       });
  //   }
  
  //   logout() {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     const obj = getFromStorage('the_main_app');
  //     if (obj && obj.token) {
  //       const { token } = obj;
  //       // Verify token
  //       fetch('/api/account/logout?token=' + token)
  //         .then(res => res.json())
  //         .then(json => {
  //           if (json.success) {
  //             this.setState({
  //               token: '',
  //               isLoading: false
  //             });
  //           } else {
  //             this.setState({
  //               isLoading: false,
  //             });
  //           }
  //         });
  //     } else {
  //       this.setState({
  //         isLoading: false,
  //       });
  //     }
  //   }
  

   render() {
      // const {
      //    isLoading,
      //    token,
      //    signUpUsername,
      //    signUpEmail,
      //    signUpPassword,
      //    signUpError,
      //  } = this.state;
   
      //  if (isLoading) {
      //     return (<div><p>Loading...</p></div>);
      //  }

      //  if (!token) {
         return (
            <Container fluid>
               <form>
                  {/* {
                     (signUpError) ? (
                        <p>{signUpError}</p>
                     ) : (null)
                  } */}
                  <h1>Sign Up</h1>
                  <Input
                     name='username'
                     placeholder='Username'
                     value={this.state.username}
                     onChange={this.handleInputChange}
                  />
                  <Input
                     name='email'
                     placeholder='Email'
                     value={this.state.email}
                     onChange={this.handleInputChange}
                  />
                  <Input
                     name='password'
                     placeholder='Password'
                     value={this.state.password}
                     onChange={this.handleInputChange}
                  />
                  <FormBtn
                    disabled={!(this.state.username && this.state.email && this.state.password)}
                    onClick={this.handleFormSubmit} 
                  >
                    Sign Up
                  </FormBtn>
               </form>
            </Container>
         );
  }
      
      // return (
      //    <div>
      //       <p>Account</p>
      //       <FormBtn 
      //          onClick={this.logout}>Logout</FormBtn>
      //    </div>
      // );
}

export default RegisterPage;
