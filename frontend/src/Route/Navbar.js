import React, { Component } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../Login/Login";
import Home from "../home";
import Register from "../Login/Register";
import Admin from "../Admin/Admin";
import logo from "../images/bus.png";
import Payment from "../payment/Payment";
import ContactUs from "../Login/ContactUs";
import Seat from "../Components/seat";
import Dynamic from "../Components/dynamic_page";
import Logout from "../Login/Logout";
import Checkout from "../Components/Checkout";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const username = localStorage.getItem("blueName");
    this.setState({
      user: username,
    });
  }


  render() {
    return (
      <div cals="header">
        <Router>
          <nav className="navbar navbar-expand-sm navbar-light nav-bar fixed-top">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <NavLink className="navbar-brand" to="/">
              <img className="logo" src={logo} alt="logo" />
            </NavLink>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav ml-auto ml-2">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home{" "}
                  </NavLink>
                </li>

                {console.log("nav-", this.state.user)}
                {this.state.user == null ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink className="nav-link" to="/contactUs">
                    Contact US
                  </NavLink>

                  
                </li>
              </ul>
            </div>
          </nav>

          <Route exact strict path="/login" component={Login} />
          <Route exact strict path="/" component={Home} />
          <Route exact strict path="/register" component={Register} />
          <Route exact strict path="/admin" component={Admin} />
          <Route exact strict path="/payment" component={Payment} />
          <Route exact strict path="/contactUs" component={ContactUs} />
          <Route exact strict path="/seat" component={Seat} />
          <Route exact strict path="/dynamic" component={Dynamic} />
          <Route exact strict path="/logout" component={Logout} />
          <Route exact strict path="/checkout" component={Checkout} />


        </Router>

        <hr />
      </div>
    );
  }
}

export default Navbar;
