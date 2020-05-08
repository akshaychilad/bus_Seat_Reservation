import React, { Component } from "react";
import "../css/style.css";
import axios from "axios";
import payment from "../images/payment.jpg";
import { NavLink, Redirect } from "react-router-dom";
import saveAs from "file-saver";

export class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      readyToGo:0,
      cc_name:null,
      number:null,
      cvv:null,
      nameErr:null,
      numberErr:null,
      cvvErr:null,
    };
    console.log("id-",this.props.data._id)
  }

  sendDataToDb = () => {

    axios
      .post("http://localhost:3001/updateSeatData", {
        _id:{_id: this.props.data._id},
        update : {bookedSeats: this.props.data.bookedSeats}
      })
      .then((res) => console.log("Response from bus data-", res.data));
  };

  componentDidMount() {
    const userName = localStorage.getItem("blueName");
    this.setState({
      user: userName,
    });
  }

  // sendDataToDb = (idToUpdate, updateToApply) => {
  //   let objIdToUpdate = null;
  //   parseInt(idToUpdate);
  //   this.state.data.forEach((dat) => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat._id;
  //     }
  //   });

  //   axios.post('http://localhost:3001/api/updateData', {
  //     id: objIdToUpdate,
  //     update: { message: updateToApply },
  //   });
  // };
  nameHandler(event){
    this.setState({
      [event.target.name]:event.target.value
    })
  }


  createAndDownloadPdf = () => {
    axios
      .post("http://localhost:3001/create-pdf", {
        data: this.props.data,
      })
      .then(() =>
        axios.get("http://localhost:3001/fetch-pdf", { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  // Clears all the previous Error Messages
  resetErrors = () => {
    this.setState({
      nameErr: "",
      numberErr: "",
      cvvErr: ""
        });
  };

  validate = () => {
    this.resetErrors();

    const nameFormat = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const numberFormat = /^\d{16}$/;
    const cvvFormat =/^\d{3}$/;
    var flag = 0;

    if (!nameFormat.test(this.state.cc_name)) {
      this.setState({
        nameErr: "Enter Valid name",
      });
      flag = 1;
    }

    if (!numberFormat.test(this.state.number)) {
      this.setState({
        numberErr: " Invalid Number",
      });
      flag = 1;
    }

    if (!cvvFormat.test(this.state.cvv)) {
      this.setState({
        cvvErr: "Invalid cvv Format",
      });
      flag = 1;
    }

    if (flag == 0) {
      return true;
    } else {
      return false;
    }
  };

  message(e) {
    e.preventDefault();
    const isValid=this.validate();

    console.log("name,number,cvv",this.state.cc_name, this.state.number, this.state.cvv)
    console.log("name eror-",this.state.nameErr)
    if(isValid){
      this.setState({
        readyToGo: 1
      })
      
      this.sendDataToDb()
      this.createAndDownloadPdf();
    }
  }
  render() {
    return (
      <div className="main">
        {/* Checks if the user is logged in or not */}
        {this.state.user ? (
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <span className="anchor" id="formPayment"></span>

              <div className="card card-outline-secondary">
                <div className="card-body">
                  <h3 className="card-header text-center">Make Your Payment</h3>

                  <form className="form" role="form" autoComplete="off">
                    <div className="form-group">
                      <label>Card Holder's Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc_name"
                        pattern="\w+ \w+.*"
                        title="First and last name"
                        required="required"
                        name="cc_name"
                        onChange={(e)=>this.nameHandler(e)}
                      />
                      <div className="invalid">{this.state.nameErr}</div>
                    </div>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        maxLength="20"
                        pattern="\d*"
                        title="Credit card number"
                        required="required"
                        name="number"
                        onChange={(e)=>this.nameHandler(e)}
                      />
                      <div className="invalid"> { this.state.numberErr} </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-12">Card Exp. Date</label>
                      <div className="col-md-4">
                        <select
                          className="form-control"
                          name="cc_exp_mo"
                          size="0"
                        >
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <select
                          className="form-control"
                          name="cc_exp_yr"
                          size="0"
                        >
                          <option>2020</option>
                          <option>2021</option>
                          <option>2022</option>
                          <option>2023</option>
                          <option>2024</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="cvv"
                          maxLength="3"
                          pattern="\d{3}"
                          title="Three digits at back of your card"
                          required="required"
                          placeholder="CVC"
                        onChange={(e)=>this.nameHandler(e)}
                        />
                        <div className="invalid"> {this.state.cvvErr} </div>
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-md-12">Amount</label>
                    </div>
                    <div className="form-inline">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">₹</span>
                        </div>
                        <input
                          type="text"
                          className="form-control text-right"
                          id="exampleInputAmount"
                          value={this.props.data.totalFare}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">.00</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="form-group row">
                      <div className="col-md-6">
                        <button
                          type="reset"
                          className="btn btn-default btn-lg btn-block"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          type="submit"
                          className="bztn btn-success btn-lg btn-block"
                          onClick={(e) => this.message(e)}
                        >
                          Submit
                        </button>
                        {this.state.readyToGo ? <Redirect to={{
                        pathname:'/checkout',
                        value:{
                            data:this.props.data
                        }
                      }
                      }/>
                      : null
                    }
                      </div>
                      
            
                    
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            You are not logged in please 
            <NavLink to="/login"> click here </NavLink>
            to Login and continue
          </div>
        )}
      </div>
    );
  }
}

export default Payment;
