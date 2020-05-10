
const express = require('express'); //commonJS pattern
const chalk = require('chalk'); //colorize our log messages
const path = require('path'); //built-in module

const port = process.env.PORT || 3000;
const app = express();

//setup public directory for static contents
app.use(express.static(path.join(__dirname, 'public')));


//routing
app.get('/', function(req, res){
       res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, function(){
    console.log(`server is listening on port: ${chalk.green(port)}`);
});

