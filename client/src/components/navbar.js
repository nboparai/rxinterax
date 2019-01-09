import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../utils/API";
import "../App.css";

class Navbar extends Component {
    constructor() { 
        super()
        this.logout = this.logout.bind(this)
    }

   logout = () => {
      // event.preventDefault()
      console.log('logging out')
      
      API.logout().then((res)=>{
         console.log(res.data)
         if (res.status === 200) {
            this.props.updateUser({
               loggedIn: false,
               username: null
            })
         }
      }).catch(error => {
         console.log('Logout error')
      })   
   }


    // sav 01/08 --- removed ternary operator & login/signup option. only logout necessary
    render() {
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>
                <header className="navbar App-header" id="nav-container">
                    <section className="navbar-section">
                        <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                            <span className="text-secondary">logout</span>
                        </Link>
                    </section>
                </header>
            </div>
        )
    }
};

export default Navbar;