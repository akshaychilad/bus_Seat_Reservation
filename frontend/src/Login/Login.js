import React, { Component } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Redirect,
} from "react-router-dom";
import "../css/login.css";
import Navbar from "../Route/Navbar";
import Register from "./Register";
import axios from 'axios'

var results;
export class Login extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelte: null,
    deleteMessage: null,
    idToUpdate: null,
    ObjectToUpdate: null,
    email: "",
    password: "",
    validUser: false,
    user: null,
    update:0
  };
  componentWillMount() {
  }


  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getDataFromDb = () => {
      // GET request data through port-3001
    // fetch("http://localhost:3001/api/getData")
    //   .then((data) => data.json())
    //   .then((res) => this.setState({ data: res.data }));

      axios.post('http://localhost:3001/api/getData', {
       email:this.state.email,
       password:this.state.password
    }).then((response)=>{
      // this.setState({data : [...response.data.data]})
      results=response.data.data
      if(results.length>0){
        console.log("Valid user",results[0].name)
         localStorage.setItem("blueName", results[0].name);
         this.setState({
                validUser: true,
                user: results[0].name,
                update:1
              });
              window.location.reload(false);
      }
      else{
        console.log("Invalid user")
      }
      

      
    })
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.getDataFromDb();
  };

  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin">
                <div className="card-body">
                  <h2 className="text-center"> Login </h2>
                  <form className="form-signin p-4">
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        name="email"
                        placeholder="Email address"
                        onChange={(e  ) => this.changeHandler(e)}
                        required
                        autoFocus
                      />
                      <label>Email address</label>
                    </div>
<br />
                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        className="form-control"
                        onChange={(e) => this.changeHandler(e)}
                        placeholder="Password"
                        required
                      />
                      <label>Password</label>
                    </div>

                    
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      onClick={(e) => this.submitHandler(e)}
                    >
                      Sign in
                    </button>
                    <hr className="my-4" />
                    <h3> New User?</h3>
                    <NavLink
                      className="btn btn-lg btn-google btn-block text-uppercase"
                      to="/register"
                    >
                      {" "}
                      Register
                    </NavLink>
                    {this.state.validUser ? <Redirect to="/" /> : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
