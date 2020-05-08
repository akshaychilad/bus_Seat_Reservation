import React, { Component } from 'react'
// const arr=Object.values(Passengers)
    var count=1;

    const today=new Date();
    const sgst=Number(totalFare)*0.09;
    const igst=Number(totalFare)*0.09;
    const total=Number(totalFare)+50+sgst+igst;
    var passengerNames,passengerSeats,userName;
    var from,to,busType,date,fare,totalFare,name,bookedSeats,Passengers={},results;
export class Checkout extends Component {
    constructor(props){
        super(props)
        results=props.location.value.data
        from=props.location.value.data.from
        to=props.location.value.data.to
        date=props.location.value.data.date
        busType=props.location.value.data.busType
        totalFare=props.location.value.data.totalFare
        Passengers=Object.assign({},props.location.value.data.Passengers)
        bookedSeats=props.location.value.data.bookedSeats
        console.log("checkout props-",results)
        console.log("From-",from)
        passengerNames=Object.values(Passengers);
        passengerSeats=Object.keys(Passengers);
        console.log("Seat array-",passengerSeats)
        console.log("seat 1st value-",passengerSeats[0])
    }
    componentDidMount(){
         userName = localStorage.getItem("blueName");
            this.setState({
            user: userName,
            });
    }
   
    render() {
        return (
            <div>
                <div className="jumbotron box text-center">
          <h2 className="display-4">Booking Successful</h2>
          <hr />
                 Dear <h2> {userName} </h2>
                 Your Booking for Routation 
                  <h2>{from} ---- {to} </h2>
                   on : <h2>{date} </h2> is confirmed
                   <br />
                 The Passengers List is:
                 <table class="table table-striped table-responsive-md btn-table">
            <thead>
              <tr>
                <th> Names</th>
                <th> Seats</th>
                <th> </th>
              </tr>
            </thead>
          
                    
              <tbody>
                    {passengerNames.map((names,index)=>(
                        <tr>
                            {console.log("index-",index)}
                            {console.log("Passenger seat in jsx-",passengerSeats[index])}
                            <td>{names}</td>
                            <td>{passengerSeats[index]}</td>

                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        </tr>    
                
               </tbody>
                 
            </table>

                 Please find the Downloaded attachment and print it as Your Confirmation ticket
                 
            </div>
         
      </div>
        )
    }
}

export default Checkout
