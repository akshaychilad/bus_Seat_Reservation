import React, { Component } from "react";
import "../css/seat.css";
import seat1 from "../images/seat1.png";
import data from "../data/data.json";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import drive from "../images/drive.png";
var seat = [];
var clone;
var Passengers = {};
var count = 1;
var newName = "name0";
var disabled = "disabled";

// seatNumbers array to create seats dynamically
const seatNumbers = [
  "1a",
  "1b",
  "1c",
  "2a",
  "2b",
  "2c",
  "3a",
  "3b",
  "3c",
  "4a",
  "4b",
  "4c",
  "5a",
  "5b",
  "5c",
];

export default class Seat extends Component {
  constructor(props) {
    super(props);
    clone = Object.assign({}, props.seatData);
    this.state = {
      seats: [],
      entries: 0,
      user: null,
      totalFare: null,
      Passengers: null,
      phoneno : null,
      email : null,
      phoneErr: null,
      emailErr: null
    };
  }

  componentDidMount() {
    const userName = localStorage.getItem("blueName");

    this.setState({
      user: userName,
    });
  }

  // Handle Names of passengers list
  handleName = (e) => {
    Passengers = {
      ...Passengers,
      [e.target.name]: e.target.value,
    };
    console.log("Passengers list is ", Passengers);
  };


  handleContact(e){
      this.setState({
        [e.target.name]:e.target.value
      })
  }

  // checkbox data handling
  handleInput = (e) => {
    let seatNum = e.target.name;
    if (e.target.checked) {
      this.setState({
        seats: [...this.state.seats, seatNum],
        entries: this.state.entries + 1,
      });
    } else {
      let data = [...this.state.seats];
      let index = data.indexOf(seatNum);
      // Delete the seat number after uncheck of a seat
      data.splice(index, 1);
      this.setState({
        seats: data,
        entries: this.state.entries - 1,
      });
    }
    clone.totalFare =clone.fare * (this.state.entries+1);
  };

  resetErrors = () => {
    this.setState({
      emailErr: null,
      phoneErr: null
        });
  };
  validate = () => {
    this.resetErrors();

    const nameFormat = /^\w+/;
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phonenoFormat = /^\d{10}$/;
    var flag = 0;

    // if (!nameFormat.test(this.state.name)) {
    //   this.setState({
    //     validName: "Enter Valid name",
    //   });
    //   flag = 1;
    // }

    if (!mailformat.test(this.state.email)) {
      this.setState({
        emailErr: " Invalid Email",
      });
      flag = 1;
    }

    
    if (!phonenoFormat.test(this.state.phoneno)) {
      this.setState({
        phoneErr: "Invalid Phone number",
      });
    }
    if (flag == 0) {
      return true;
    } else {
      return false;
    }
  };

  // onClick Handler
  submitHandler(e) {
    e.preventDefault();
    const isValid=this.validate()
    // Copying passengers data to clone.passengers
    clone.Passengers = {
      ...Passengers,
    };
    console.log("Passengers in seat-",clone.Passengers)
    // Changing Tab onClick
    if(isValid){
      this.props.parentCallback("2", clone);
    }
    // Adding the selected seats to booked seats
    const str = clone.bookedSeats + "," + this.state.seats.toString();
    clone.bookedSeats = str;
  }



  render() {
    return (
      <div>
        {/* Display if the user is Logged in */}
        {this.state.user != null ? (
          <div>
            <div className="bus">
              <div className="card layout float-left">
                <div className="card-header">
                  <h3>Please select a seat</h3>
                  <div></div>
                </div>
                <img src={drive} className="driver" />
                <ol className="cabin fuselage">
                  {/* Dynamically creating bus seats  */}
                  {seatNumbers.map((ele) => {
                    return (
                      <li className="row d-inline-flex p-2">
                        <ol className="seats " type="A">
                          <li className="seat">
                            <input
                              type="checkbox"
                              id={ele}
                              name={ele}
                              disabled={
                                clone.bookedSeats.includes(ele) ? true : false
                              }
                              onClick={this.handleInput}
                            />
                            <label htmlFor={ele}>
                              <img className="seat_img" src={seat1} alt="chair" />
                            </label>
                          </li>
                        </ol>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
            <div className="card d-inline travel">
              <label>source </label>
              <input type="text" name="source" value={clone.from} />

              <label>Destination </label>
              <input type="text" name="destination" value={clone.to} />

              <label>Date </label>
              <input type="text" name="date" value={clone.date} />
            </div>

            <div className="card float-right user-box">
              {this.state.entries > 0 ? (
                <div className="card-header">Passenger Informations</div>
              ) : null}

              {/* Get passenger names as they select seats */}
              {this.state.seats.map((ele) => (
                <span>
                  <label>Passenger Name: </label>
                  <input
                    type="text"
                    name={ele}
                    required
                    onChange={(e) => this.handleName(e)}
                  />

                  <label>Seat Number: </label>
                  <input type="text" name="seatNum" value={ele} />
                  <hr />
                </span>
              ))}
            {/* Disply on selecting atleast one seat from the layout */}
              {this.state.entries > 0 ? (
                <div>
                  <div className="card-header">Contact Informations</div>
                  <label> Phone Number: </label>
                  <input type="text" name="phoneno" onChange={(e)=>this.handleContact(e)} required />
                  <label className="invalid"> {this.state.phoneErr} </label>
                  <label> Email: </label>
                  <input type="email" name="email" onChange={(e)=>this.handleContact(e)} required/>
                  <label className="invalid"> {this.state.emailErr} </label>
                  <label>Total fare: </label>
                  <input
                    type="number"
                    name="totalFare"
                    value={clone.fare * this.state.entries}
                  />
                  <button
                    type="submit"
                    className="btn btn-success btn-lg btn-block"
                    onClick={(e) => this.submitHandler(e)}
                  >
                    Proceed
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            You are not logged in please
            <NavLink to="/login">click here</NavLink>
            to Login
          </div>
        )}
      </div>
    );
  }
}
