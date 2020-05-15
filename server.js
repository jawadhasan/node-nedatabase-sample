
const express = require('express'); //commonJS pattern
const chalk = require('chalk'); //colorize our log messages
const path = require('path'); //built-in module
const bodyParser = require('body-parser');

const shortid = require('shortid');

// Import the class 
// import Customer from './path/to/Customer'; 
// or
// const Customer = require('./path/to/Customer')const surveyManager = require('./surveyManager');
const Survey = require('./survey');
const surveyManager = require('./surveyManager'); // this is new up inside its class

const port = process.env.PORT || 3000;
const app = express();

//setup public directory for static contents
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//routing
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/api/survey/save", function (req, res) {
  console.log('Post a Survey: ' + JSON.stringify(req.body));
  const newSurvey = new Survey(shortid.generate(),req.body.email, req.body.surveyAnswer);
  let savedSurvey = surveyManager.save(newSurvey);
  return res.send(savedSurvey);
});

app.get("/api/survey/getInMemory", function (req, res) { 
  const data = surveyManager.getAllInMemory();
  return res.send(data);
});

app.get("/api/survey/getAll", function (req, res) {
  const docs = surveyManager.getAll();
  return res.send(docs);
});

//Server activated:  Listening on port
app.listen(port, function () {
  console.log(`server is listening on port: ${chalk.green(port)}`);
});

