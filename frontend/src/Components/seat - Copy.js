import React, { Component } from 'react';
import '../css/seat.css'
import seat1 from '../images/empty_seat.png'
var seat=[];
export default class Seat extends Component{

constructor(){
  super();
  this. state={
    seats:[]
  }
  
}
handleInput=(e)=> {
    let seatNum=e.target.name
  if(e.target.checked){
    console.log("Checked",e.target.id)
    this.setState({
        seats:[...this.state.seats,seatNum]
    })  
    
}else{
    let data=[...this.state.seats]
    let index=data.indexOf(seatNum)
    data.splice(index,1)
    this.setState({
      seats: data
  })
}
console.log(this.state.seats)
}


submitHandler(e){
    e.preventDefault();
    console.log("Button Clicked")
    console.log(seat)
    this.setState({
        seats:seat
    })
    
}


    render(){
        return(
            <div className="bus">
                <div className="card">
  <div className="card-header">
    <h3>Please select a seat</h3>
    <div>
    {this.state.seats}
  </div>
  </div>
  <ol className="cabin fuselage">
    <li className="row row--1">
      <ol className="seats" type="A">
        <li className="seat">
          <input onClick={this.handleInput} type="checkbox" id="01A" name="1A"/>
          <label htmlFor="01A"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat">
          <input onClick={this.handleInput} type="checkbox" id="01B" name="1B" />
          <label htmlFor="01B"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat">
          <input onClick={this.handleInput} type="checkbox" id="01C" name="1C" />
          <label htmlFor="01C"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        
      </ol>
    </li>
    <li className="row row--2">
      <ol className="seats" type="A">
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="02A" name="2A"/>
          <label htmlFor="02A"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="02B" name="2B" />
          <label htmlFor="02B"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat"> 
          <input type="checkbox" onClick={this.handleInput} id="02C" name="2C"/>
          <label htmlFor="02C"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        
      </ol>
    </li>
    <li className="row row--3">
      <ol className="seats" type="A">
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="03A" name="3A" />
          <label htmlFor="03A"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="03B" name="3B" />
          <label htmlFor="03B"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="03C" name="3C" />
          <label htmlFor="03C"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
      
      </ol>
    </li>
    <li className="row row--4">
      <ol className="seats" type="A">
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="04A" name="4A" />
          <label htmlFor="04A"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat"> 
          <input type="checkbox" onClick={this.handleInput} id="04B" name="4B" />
          <label htmlFor="04B"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="04C" name="4C" />
          <label htmlFor="04C"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        
      </ol>
    </li>
    <li className="row row--5">
      <ol className="seats" type="A">
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="05A" name="5A" />
          <label htmlFor="05A"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="05B" name="5B" />
          <label htmlFor="05B"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        <li className="seat">
          <input type="checkbox" onClick={this.handleInput} id="05C" name="5C" />
          <label htmlFor="05C"><img class="seat_img" src={seat1} alt="chair" /></label>
        </li>
        
      </ol>
    </li>
  </ol>
  <div >
  <button type="submit" className="btn btn-success btn-lg btn-block" onClick={(e)=>this.submitHandler(e)}>Proceed</button>
  </div>
  </div>
  
</div>

        )
    }
}