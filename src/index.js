const fetch = require('node-fetch');
var Logger = require('./modules/logger.js');

Logger.start();

// Claimer - claims coins by fetching url with JWT (every 30 seconds)

setInterval(function(){
    let unix_timestamp = Date.now() / 1000;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    /////////////////////////////////////////////////////////
    console.log("\u001B[33m"+'TIME - '+formattedTime);
    console.log('========================================================================');
    fetch(`https://api.tricksplit.io/freeCoins?jwt=${acc}`)
    .then(res => res.text())
    .then(text => console.log('Account 10: '+text));
    }, 30000
)

////////////////////

var chalk = require('chalk');
var figlet = require('figlet');
var clear = require('console-clear');

clear();
console.log(
    chalk.green(
      figlet.textSync('FREE COINS CLAIMER', { 
      horizontalLayout: 10,
      verticalLayout: 10,
      width: 'full',
      whitespaceBreak: true })
    )
  );
console.log(' - Created by Mrozio');
console.log(' - Logs on port 5000');
console.log(' ');

/////////////////////

// JWTs

var acc = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJpZnlOYW1lIjpudWxsLCJpc1ZlcmlmaWVkIjowLCJpc0FkbWluIjowLCJpc01vZCI6MCwiY2hhbmdlZE5hbWUiOjAsImlkIjoiMTAyMjA1MzgwNjA4MjE5MjM1NTA2IiwiZGlzY29yZElEIjpudWxsLCJuYW1lIjoiYWJjIEVmZyIsIm9sZE5hbWUiOm51bGwsImNvaW5zIjowLCJ4cCI6MCwic2Vhc29uWFAiOjAsInN1YiI6MTY4ODcyODEsInBsYXRmb3JtIjoiZ29vZ2xlIiwicmVmZmVyZXIiOiJ1bmRlZmluZWQiLCJsYXN0Q29pbkNsYWltIjowLCJsYXN0Tml0cm9DbGFpbSI6MCwiY2xhaW1lZDIwIjowLCJjbGFpbWVkNTAiOjAsImRldGFpbHMiOnsiaWQiOiIxMDIyMDUzODA2MDgyMTkyMzU1MDYiLCJsYXN0SXAiOiIxODguMTQ3LjM2LjE0MSIsImxhc3RMb2dpbiI6MTYyNjU0NDMwOTc1NCwiZW1haWwiOiJhYmNmZWdnZ0BnbWFpbC5jb20iLCJvcmlnaW4iOiJodHRwczovL3RyaWNrc3BsaXQuaW8ifSwiaXRlbXMiOltdLCJpYXQiOjE2MjY1NDQzMDl9.tYWWt7HykQTaW7x2a4xuP3ySkul2gldfLxHcSptiYa0'

/////////////////////

const express = require('express')
const app = express()
var path = require('path');

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('log');
});
app.listen(5000);

//more docs here - https://github.com/npm/npmlog#basic-usage

process.on('exit', function (code) {
  Logger.debug("process.exit(" + code + ")");
  Logger.shutdown();
});