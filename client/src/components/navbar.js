import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
// import logo from '../logo.svg';
import '../App.css';
import API from '../utils/API'

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

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    {/* Alex 1/6/19 - Changed route of main page and added user id */}
                                    {/* <Link to={"/console/" + this.props.userid} className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                        </Link> */}
                                    <Link to="/" className="btn btn-link text-secondary">
                                    <span className="text-secondary">Login</span>
				</Link>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary">Sign Up</span>
				</Link>
                                </section>
                            )}
                    </div>                
                </header>
            </div>

        );

    }
}

export default Navbar