import React, { Component } from "react";
import "../css/register.css";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  phoneno: "",
  password: "",
  password2: " ",
  validName: "",
  validEmail: "",
  validPhoneno: "",
  validPassword: "",
  passMatch: "",
  readyToGo: false,
  data: [],
  id: 0,
  message: null,
  intervalIsSet: false,
};

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
// Register Data to DB
  putDataToDB = () => {
    // id is calculated to give a user id
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    // POST method with values passed
    axios
      .post("http://localhost:3001/api/putData", {
        id: idToBeAdded,
        name: this.state.name,
        email: this.state.email,
        phoneno: this.state.phoneno,
        password: this.state.password,
      })
      .then(
        (res) => {
          console.log("Registration Response-", res);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // input value
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Clears all the previous Error Messages
  resetErrors = () => {
    this.setState({
      validEmail: "",
      validName: "",
      validPassword: "",
      passMatch: "",
    });
  };


// Validation of the registration page
  validate = () => {
    this.resetErrors();

    const nameFormat = /^\w+/;
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passFormat = /^(?=.*\d)(?=.*[a-z])[a-z\d]{2,}$/i;
    const phonenoFormat = /^\d{10}$/;
    var flag = 0;

    if (!nameFormat.test(this.state.name)) {
      this.setState({
        validName: "Enter Valid name",
      });
      flag = 1;
    }

    if (!mailformat.test(this.state.email)) {
      this.setState({
        validEmail: " Invalid Email",
      });
      flag = 1;
    }

    if (!passFormat.test(this.state.password)) {
      this.setState({
        validPassword: "Invalid Password Format",
      });
      flag = 1;
    }

    if (
      this.state.password !== this.state.password2 &&
      this.state.password2 === " "
    ) {
      this.setState({
        passMatch: "Password does not Match",
      });
      flag = 1;
    }
    if (!phonenoFormat.test(this.state.phoneno)) {
      this.setState({
        validPhoneno: "Invalid Phone number",
      });
    }
    if (flag == 0) {
      return true;
    } else {
      return false;
    }
  };

  // OnClick Handler
  submitData = (e) => {
    e.preventDefault();
    const isVallid = this.validate();
    if (isVallid) {
      this.putDataToDB();
      this.setState({
        readyToGo: true,
      });
    } else {
      console.log("Enter the complete Data");
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="card bg-light">
            <article className="card-body mx-auto">
              <form>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fa fa-user"></i>{" "}
                    </span>
                  </div>
                  <input
                    name="name"
                    className="form-control"
                    placeholder="Full name"
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                  />
                </div>
                <div className="invalid">{this.state.validName}</div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fa fa-envelope"></i>{" "}
                    </span>
                  </div>
                  <input
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    onChange={(e) => this.handleChange(e)}
                    type="email"
                  />
                </div>
                <div className="invalid">{this.state.validEmail}</div>

                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fa fa-phone"></i>{" "}
                    </span>
                  </div>
                  <select className="custom-select">
                    <option selected="">+91</option>
                  </select>
                  <input
                    name="phoneno"
                    className="form-control  phno"
                    placeholder="Phone number"
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                  />
                </div>
                
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fa fa-lock"></i>{" "}
                    </span>
                  </div>
                  <input
                    className="form-control"
                    name="password"
                    placeholder="Create password"
                    onChange={(e) => this.handleChange(e)}
                    type="password"
                  />
                </div>
                <div className="invalid"> {this.state.validPassword} </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fa fa-lock"></i>{" "}
                    </span>
                  </div>
                  <input
                    className="form-control"
                    name="password2"
                    placeholder="Repeat password"
                    onChange={(e) => this.handleChange(e)}
                    type="password"
                  />
                </div>
                <div className="invalid"> {this.state.passMatch} </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={(e) => this.submitData(e)}
                  >
                    {" "}
                    Create Account{" "}
                  </button>
                </div>
                <p className="text-center">
                  Have an account? <NavLink to="/login">Log In</NavLink>{" "}
                </p>
              </form>
            </article>
          </div>
        </div>
        {/* Redirects to the Login page once the registration is successfull */}
        {this.state.readyToGo ? <Redirect to="/login" /> : null}

        <br />
        <br />
      </div>
    );
  }
}

export default Register;
