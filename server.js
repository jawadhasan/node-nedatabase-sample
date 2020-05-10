
const express = require('express'); //commonJS pattern
const chalk = require('chalk'); //colorize our log messages
const path = require('path'); //built-in module
const bodyParser = require('body-parser');

const db = require('./dbservice');
const shortid = require('shortid');


const port = process.env.PORT || 3000;
const app = express();

let surveyList = []; //in-memory store

//setup public directory for static contents
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//routing
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post("/api/survey/save", function (req, res) {
  console.log('Post a Survey: ' + JSON.stringify(req.body));
  var survey = {};
  survey.emailAddress = req.body.email;
  survey.surveyAnswer = req.body.surveyAnswer;
  survey.timestamp = new Date();

  surveyList.push(survey);

  // Add a survey
  db.get('surveyList')
    .push(
      {
        id: shortid.generate(),
        timestamp: survey.timestamp,
        emailAddress: survey.emailAddress,
        surveyAnswer: survey.surveyAnswer
      }
    )
    .write()

  return res.send(survey);
});


app.get("/api/survey/all", function (req, res) {
  console.log("Get All Survey");
  return res.send(surveyList);
});

app.get("/api/survey/allLowdb", function (req, res) {
  const docs = db.get('surveyList')   
    .value();
  console.log(docs);
  return res.send(docs);
});


app.listen(port, function () {
  console.log(`server is listening on port: ${chalk.green(port)}`);
});

