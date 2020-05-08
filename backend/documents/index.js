module.exports=({from,to,busType,date,fare,totalFare,name,bookedSeats,Passengers})=>{
    
    const passengerNames=Object.values(Passengers)
    const seatNumbers=Object.keys(Passengers)
    var count=1;
    console.log("Array-",passengerNames)

    const today=new Date();
    const sgst=Number(totalFare)*0.09;
    const igst=Number(totalFare)*0.09;
    const total=Number(totalFare)+50+sgst+igst;

   
    

    return `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
    <table cellspacing="0" cellpadding="0" width="100%" style="border: 1px solid #000; max-width: 80%; margin: 0 auto; font-family: 'Montserrat', sans-serif; padding: 0 20px;">
      <thead>
        <tr>
          <th style="padding: 20px 0 20px 15px; text-align: left; font-weight: 400; border-bottom: 1px solid #ccc;">
            <h1 style="color: #3bb2e6; margin:  0 0 5px; text-transform: uppercase; font-size: 35px;">Blue Bus</h1>
            <p style="margin: 0; font-size: 18px;">Booking date:${today} </p>
          </th>
         
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2" style="padding:15px 15px 20px;font-size:16px;">
                <p style="font-size:20px; margin: 0 0 5px;">Dear <strong>${passengerNames[0]}</strong>,</p><p style="font-size:16px; margin: 0;">Congratulations, Your ticket has been booked successfully.</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <h4 style="font-size: 16px; background-color: #3bb2e6; text-align: center; padding: 5px 15px; color: #fff; font-weight: 400; margin: 10px 0 0px; letter-spacing: 1px;">DEPARTURE on |${date}  | ${from} to ${to}</h4>
          </td>
        </tr>
        <tr>
          <td style="padding-right: 15px; padding-top: 15px;" colspan="2">
            <h3 style="text-transform: uppercase; margin: 0 0 5px;">Bus Details:</h3>
          </td>
        </tr>
        <tr>
          <td style="font-weight: 400; background-color: #3bb2e6; color: #fff; padding: 10px 15px; width: 30%; border: 1px solid #ccc; border-right: 0; border-bottom: 0; text-align: center; font-size: 18px;">Bus Type</td>
          <td style="padding: 0 15px; width: 20%; border: 1px solid #ccc; width: 70%;  border-bottom: 0;">
            <p style="font-size: 18px;">${busType}</p>
          </td>
        </tr>
       
    <!--     <tr>
          <td style="font-weight: 400; background-color: #3bb2e6; color: #fff; padding: 10px 15px; width: 30%; border: 1px solid #ccc; border-right: 0;text-align: center; font-size: 18px;">Seat(s)</td>
          <td style="padding: 0 15px; width: 20%; border: 1px solid #ccc; width: 70%;">
            <p style="font-size: 18px;">18, 23, 24, 19, 14, 9</p>
          </td>
        </tr> -->
        
        <!--Passenger Details Start-->
        <tr>
          <td style="padding-right: 15px; padding-top: 35px;" colspan="2">
            <h3 style="text-transform: uppercase; margin: 0 0 5px;">Passenger Details:</h3>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table cellspacing="0" cellpadding="0" width="100%" style="border: 1px solid #ccc; margin: 0 0 25px;">
              <thead>
                <tr>
                  <th style="font-weight: 400; background-color: #3bb2e6; color: #fff; padding: 10px 15px; width: 10%">
                    S No.
                  </th>
                  <th style="font-weight: 400; background-color: #3bb2e6; color: #fff; padding: 10px 15px; border-left: 1px solid #fff; width: 50%;">
                    Name
                  
                  <th style="font-weight: 400; background-color: #3bb2e6; color: #fff; padding: 10px 15px; border-left: 1px solid #fff; width: 15%;">
                    Seat No.
                  </th>
                </tr>
              </thead>
              <tbody>

              <tr>
        <td style="font-size: 17px; padding: 15px; text-align: center; width: 10%;">
         1.
        </td>
        <td style="font-size: 17px; padding: 15px; text-align: center; border-left: 1px solid #ccc; width: 50%;">
          ${passengerNames}
        </td>
        
        <td style="font-size: 17px; padding: 15px; text-align: center; border-left: 1px solid #ccc; width: 15%;">
         ${seatNumbers}
        </td>
        </tr>
              
                
                
              </tbody>
            </table>
          </td>
        </tr>
        <!--Passenger Details End-->
        
        <!--Departure Bus Details End-->
        
        <!--Return Flight Details Start-->
        
        <!--Price Table Start-->
        <tr>
          <td style="padding-right: 15px; padding-top: 25px;" colspan="2">
            <h3 style="text-transform: uppercase; margin: 0 0 5px;">Price Summary:</h3>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table cellspacing="0" cellpadding="0" width="100%" style="border: 1px solid #ccc; margin: 0 0 5px;">
              <thead>
                <tr>
                  <th style="font-weight: 400; background-color: #3bb2e6; color: #fff; padding: 10px 15px; width: 70%;">
                    Particulars
                  </th>
                  <th style="font-weight: 400; background-color: #3bb2e6; color: #fff; padding: 10px 15px; border-left: 1px solid #fff; width: 30%">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-size: 17px; padding: 10px 15px; width: 70%;">
                    Bus booking fee
                  </td>
                  <td style="font-size: 17px; padding: 10px 15px; border-left: 1px solid #ccc; width: 30%;">
                    Rs. ${totalFare}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 17px; padding: 10px 15px; width: 70%; border-top: 1px solid #ccc;">
                    Tax and Surcharges
                  </td>
                  <td style="font-size: 17px; padding: 10px 15px; border-left: 1px solid #ccc; width: 30%; border-top: 1px solid #ccc;">
                    Rs. 0
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 17px; padding: 10px 15px; width: 70%; border-top: 1px solid #ccc;">
                    Tripdesire Service Charge/ Convenience Fee
                  </td>
                  <td style="font-size: 17px; padding: 10px 15px; border-left: 1px solid #ccc; width: 30%; border-top: 1px solid #ccc;">
                    Rs. 99
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 17px; padding: 10px 15px; width: 70%; border-top: 1px solid #ccc;">
                    CGST(@9%)
                  </td>
                  <td style="font-size: 17px; padding: 10px 15px; border-left: 1px solid #ccc; width: 30%; border-top: 1px solid #ccc;">
                    ${sgst}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 17px; padding: 10px 15px; width: 70%; border-top: 1px solid #ccc;">
                    SGST/IGST/UTGST (@9%)
                  </td>
                  <td style="font-size: 17px; padding: 10px 15px; border-left: 1px solid #ccc; width: 30%; border-top: 1px solid #ccc;">
                    ${igst}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 17px; padding: 10px 15px; width: 70%; border-top: 1px solid #ccc;">
                    <strong>GRAND TOTAL</strong>
                  </td>
                  <td style="font-size: 17px; padding: 10px 15px; border-left: 1px solid #ccc; width: 30%; border-top: 1px solid #ccc;">
                    ${total}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="font-size: 14px; padding: 0px 0 25px;">
            * The credit for GST charged by the Bus vendor would be available against a separate GST invoice/e-ticket issued by the Bus vendor.
          </td>
        </tr>
        <!--Price Table End-->
        
        <tr>
          <td colspan="2" style="font-size: 13px; padding: 25px 0;">
            Note: This is a computer generated invoice and does not require a signature/stamp. Please do not reply to this email. It has been sent from an email account that is not monitored.
          </td>  
        </tr>
        <!--Support Footer End-->
      </tbody>
    </table>
    </body>
    </html>
    `
}