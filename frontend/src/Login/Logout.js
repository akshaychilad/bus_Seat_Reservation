import React, { Component } from 'react'
import { Redirect } from 'react-router'

export class Logout extends Component {
  componentDidMount(){
    // Clears the Session and Redirects to the LOGIN page
    localStorage.removeItem("blueName")
    window.location.reload(true)
  }
  render() {
    return (
      <div>
           <Redirect to='/login' />
      </div>
    )
  }
}

export default Logout
