import React, { Component } from "react";
import axios from 'axios'
import { BrowserRouter as Router, NavLink, Route,Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Display from "./display";
import img from "./images/bus.jpg";
import Dynamic from './Components/dynamic_page'
import  Navbar  from "./Route/Navbar";



const initialState = {
  from: "",
  to: "",
  startDate: new Date(),
  date: " ",
  next: 0,
  found:false,
  intervalIsSet:false,
  interval:2000,
  data:[]
};
var results=[];
var data=[];


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  

componentWillUnmount(){
  if(this.state.intervalIsSet){
    clearInterval(this.state.intervalIsSet)
    this.setState({ intervalIsSet:null})
  }
}

  getDataFromDb=()=>{
    
  // fetch("http://localhost:3001/api/getData")
  //     .then((data)=> data.json())
  //     .then((res)=> this.setState({ data:res.data})) 


console.log("results- ",results.length)

      axios.post('http://localhost:3001/api/getBusData', {
       from:this.state.from,
       to:this.state.to,
       date:this.state.date
    }).then((response)=>{
      results=response.data.data
      console.log("responnse data",response.data.data);
    })
}

  componentDidUpdate=()=>{
    console.log(this.state.data)
    this.getDataFromDb();
    const loggedUser=localStorage.getItem('blueName')
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleData(date) {
    console.log(date)
     const userDate= (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date));
     console.log(userDate)
    this.setState({
      startDate: date,
      date : userDate
    });
    
  }


  submitData=(e)=> {
    e.preventDefault();
    console.log("submit data",results)
    this.setState({
      next:1
    })
    
  }

  render() {
    return (
      <div className="main">
        <header id="header">
        </header>

        <div className="jumbotron box text-center">
          <h2 className="display-4">Welcome to BLUE BUS</h2>
          <hr />

          <div className="form-group">
            <span>
              <label className="from">From: </label>
              <input
                type="text"
                placeholder="From"
                className="form-control form-control-md w-50 mx-auto"
                name="from"
                onChange={(e) => this.handleChange(e)}
              />
            </span>
            <div>
              <label className="to">To: </label>
              <input
                type="text"
                placeholder="To"
                className="form-control form-control-md w-50 mx-auto"
                name="to"
                id="onward"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div>
              <label className="from">Onward Date: </label>
              <br />
              <DatePicker
                selected={this.state.startDate}
                onChange={(e) => this.handleData(e)}
                name="startDate"
                className="form-control form-control-md"
                minDate={new Date()}
                placeholderText="Select a day"
              />
            </div>

            <button
              className="btn-get-started animated fadeInUp"
              onClick={(e) => this.submitData(e)}
            >
              Search
            </button>
          </div>
        </div>
            {}

         {this.state.next ==1 ? 

         <Display results={results} />
           
            // <Redirect to={{ pathname: '/dynamic', state: { result: [...results] } }} />
          : null }
      </div> 
    );
  }
}

export default Home;
