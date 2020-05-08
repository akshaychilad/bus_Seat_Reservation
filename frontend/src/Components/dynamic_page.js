import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import Display from "../display";
import Seat from "./seat";
import Payment from "../payment/Payment";

var data;
var result;
var toPayment;
var passengers;
export default class Dynamic extends Component {
  constructor(props) {
    super(props);
    // props data from NavLink
    result = this.props.location.state.result;
    this.state = {
      activeTab: "1",
      results: result,
    };
  }
  componentDidMount() {
    console.log("results dynamic-", result);
    console.log("state", this.state.results);
  }
// shift tabs
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  // props callback function from child component (Seat)
  changeTab = (tab, element) => {
    this.toggle(tab);
    console.log("Dynamic-", element);
    toPayment = element;
  };

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem className="justify-content-center">
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Select Seats
            </NavLink>
          </NavItem>

          <NavItem className="text-center">
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Payment
            </NavLink>
          </NavItem>

          <NavItem className="text-center">
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Checkout
            </NavLink>
          </NavItem>
        </Nav>


{/* Components Rendering */}
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Seat
              seatData={this.props.location.state.result}
              parentCallback={this.changeTab}
            />
          </TabPane>

          {/* parentCallback={this.changeTab} is the call back function which is defined in child component and data is recieved from the child component */}

          <TabPane tabId="2">
            {/* Condition is kept in order to prevent Payment component rendering immediately after this(Dynamic) component renders  */}
            {this.state.activeTab == 2 ? <Payment data={toPayment} /> : null}
          </TabPane>

          <TabPane tabId="3"> Checkout </TabPane>
        </TabContent>
      </div>
    );
  }
}
