const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const Bus =require('./bus')
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();
// PDF
const pdfTemplate= require('./documents/index')
const pdf=require('html-pdf')
// this is our MongoDB database
const dbRoute =
  'mongodb://localhost:27017/bluebus';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());   
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.use('/getData', (req, res) => {
  const {email:email,password:password} = req.body
  Data.find({email,password},(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});





// this is our create methid
// this method adds new data in our database
router.post('/putData',(req, res) => {
  let data = new Data();
  // console.log(req.body)

  const { id, name ,email, phoneno, password } = req.body;

  if ((!id && id !== 0)) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.id=id;
  data.name=name;
  data.email=email;
  data.phoneno=phoneno;
  data.password=password;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// Yet to write query to update the existing database 
app.post('/updateSeatData', (req, res) => {
  let data = new Data();
  // console.log(req.body)
  const { _id, update } = req.body;

  console.log("Updating data-",update)
  Bus.findByIdAndUpdate(_id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


// Pdf
app.post('/create-pdf',(req,res)=>{
 
  pdf.create(pdfTemplate(req.body.data),{}).toFile('result.pdf',(err)=>{
      if(err){
          res.send (Promise.reject());
      }
      res.send(Promise.resolve());
  });
});

app.get('/fetch-pdf',(req,res)=>{
  res.sendFile(`${__dirname}/result.pdf`)
})


var obj;



router.use('/getBusData', (req, res) => {
  const {from,to,date} = req.body
  
   Bus.find({from:from,to:to,date:date},(err, data) => {
    if (err) return res.json({ success: false, error: err });
      res.json({ success: true, data: data });
  });
});

// append /api for our http requests
app.use('/api', router);

// launches backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));