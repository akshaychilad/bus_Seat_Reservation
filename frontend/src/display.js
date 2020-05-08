import React, { Component } from "react";
import "./css/display.css";
import { NavLink } from "react-router-dom";

var results;
export class Display extends Component {
  constructor(props) {
    super(props);
    results = props.results;
    this.state = results;
  }

  
  render() {
    return (
      <div>
        <div class="plans">
          <h2 class="white-text mx-3 text-center">Available Routes</h2>

          <table class="table table-striped table-responsive-md btn-table">
            <thead>
              <tr>
                <th> FROM</th>
                <th> TO</th>
                <th>Date</th>
                <th>Bus type</th>
                <th>Fare</th>
                <th> </th>
              </tr>
            </thead>

            {/* Dynamically creating table for the display list */}
            {this.state.map((element) => (
              <tbody>
                <tr>
                  <td col="3">{element.from}</td>
                  <td col="3"> {element.to}</td>
                  <td col="3">{element.date}</td>
                  <td col="3">{element.busType}</td>
                  <td col="3">{element.fare}</td>

                  <td>
                    {/* Creating link as button and passing the selected bus data as props to Dynamic component */}
                    <NavLink
                      class="btn btn-primary btn-sm m-0 waves-effect"
                      to={{
                        pathname: "/dynamic",
                        state: { result: { ...element } },
                      }}
                    >
                      Choose This Plan
                    </NavLink>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default Display;
