"use strict";

import Logger from './modules/logger.js';
import accounts from './modules/connect.js';
import fs from 'fs';

Logger.start();

// Claimer - claims coins by fetching url with JWT (every 30 seconds)

setInterval(function(){
  let unix_timestamp = Date.now() / 1000;
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  console.log("\u001B[33m"+'TIME - '+formattedTime+"\x1b[37m");
  accounts.accounts.check();
}, JSON.parse(fs.readFileSync('./settings/settings.json').toString()).Cooldown || 30000);

////////////////////

import chalk from 'chalk';

import figlet from 'figlet';
import clear from 'console-clear';
clear();
function logStart(name) {
  console.log(
    chalk.green(
      figlet.textSync(name, { 
      horizontalLayout: 10,
      verticalLayout: 10,
      width: 'full',
      whitespaceBreak: true })
    )
  );
  console.log(' - Created by Mrozio');
  console.log(` - Listening on port ${PORT || '-'}`);
  console.log(' - Type\x1b[36m help\x1b[37m for help')
  console.log(' ');
}

export default logStart

/////////////////////

import express from "express";
import ejs from 'ejs';
import monitor from 'express-status-monitor';
 
const app = express();
 
var PORT = JSON.parse(fs.readFileSync("./settings/settings.json")).hostPort;
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
import favicon from 'express-favicon'
app.use(favicon('./public/favicon.png'));
app.use(monitor({title: "FCC Status", path: "/stats"}))
app.get('/', function(req, res){
  res.render('log');
  console.log(`A user connected to :${PORT}`)
});
app.get('/accounts', function (req, res) {
  res.json(JSON.parse(fs.readFileSync("./accounts/accounts.json")))
})
app.get('/settings', function (req, res) {
  res.json(JSON.parse(fs.readFileSync("./settings/settings.json")))
})
app.listen(PORT);

fs.readFile('./accounts/accounts.json', (err, data) => {
Object.values(JSON.parse(data).accountList).forEach(i => {
  app.get(`/acc/${i.name}`, function (req, res) {
      res.json(i)
    })
})
})

process.on('exit', function (code) {
  Logger.write("process.exit(" + code + ")");
  Logger.shutdown();
});

// Commands

import Commands from './modules/commandlist.js';
import readline from 'readline';

var in_ = readline.createInterface({
      input: process.stdin,
      output: process.stdout
});
setTimeout(prompt, 100);

// Console functions

logStart('FREE COINS CLAIMER V2');

function prompt() {
  in_.question("", function (str) {
      try {
          parseCommands(str);
      } catch (err) {
      } finally {
          setTimeout(prompt, 0);
      }
  });
}

function parseCommands(str) {
  Logger.write(""+str);
  if (str === '')
      return;
  var split = str.split(" ");
  var first = split[0].toLowerCase();
  var execute = Commands.list[first];
  if (typeof execute != 'undefined') {
      execute();
  } else {
    //console.log('\x1b[31mInvalid command!\x1b[0m')
  }
}
