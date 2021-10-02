'use strict';

/*
 * Simple logger.
 *
 * Copyright (c) 2016 Barbosik https://github.com/Barbosik
 * License: Apache License, Version 2.0
 *
 * EDITED
 */


var logVerbosity = "";
var logFileVerbosity = "";

function print(message) {
    writeCon(colorWhite, message);
    writeLog(message);
}

function write(message) {
    writeLog(message);
}


// --- utils ---

function getDateTimeString() {
    var date = new Date();
    var dy = date.getFullYear();
    var dm = date.getMonth() + 1;
    var dd = date.getDate();
    var th = date.getHours();
    var tm = date.getMinutes();
    var ts = date.getSeconds();
    var tz = date.getMilliseconds();
    dy = ("0000" + dy).slice(-4);
    dm = ("00" + dm).slice(-2);
    dd = ("00" + dd).slice(-2);
    th = ("00" + th).slice(-2);
    tm = ("00" + tm).slice(-2);
    ts = ("00" + ts).slice(-2);
    tz = ("000" + tz).slice(-3);
    return dy + "-" + dm + "-" + dd + "T" + th + "-" + tm + "-" + ts + "-" + tz;
}

function getTimeString() {
    var date = new Date();
    var th = date.getHours();
    var tm = date.getMinutes();
    var ts = date.getSeconds();
    th = ("00" + th).slice(-2);
    tm = ("00" + tm).slice(-2);
    ts = ("00" + ts).slice(-2);
    return th + ":" + tm + ":" + ts;
}

function writeCon(color, level, message) {
    if (level > logVerbosity) return;
    message = util.format(message);
    var prefix = "";
    process.stdout.write(color + prefix + message + "\u001B[0m" + EOL);
}

function writeLog(level, message) {
    message = util.format(message);
    var prefix = "";
        prefix = "";
    prefix += "[" + getTimeString() + "] ";
    
    writeQueue.push(prefix + EOL);
    if (writeShutdown) {
        flushSync();
    } else {
        if (writeCounter == 0) {
            flushAsync();
        }
    }
}

var writeError = false;
var writeCounter = 0;
var writeShutdown = false;
var writeStarted = false;
var writeQueue = [];

function flushAsync() {
    if (writeShutdown || consoleLog == null || writeQueue.length == 0)
        return;
    writeCounter++;
    consoleLog.write(writeQueue.shift(), function () { writeCounter--; flushAsync(); });
}

function flushSync() {
    try {
        var tail = "";
        while (writeQueue.length > 0) {
            tail += writeQueue.shift();
        }
        var fileName = logFolder + "/" + logFileName + ".log";
        fs.appendFileSync(fileName, tail);
    } catch (err) {
        writeError = true;
        writeCon(colorRed + colorBright, err.message);
        writeCon(colorRed + colorBright, "Failed to append log file!");
    }
}

function start() {
    if (writeStarted)
        return;
    writeStarted = true;
    try {
        setTimeout(function(message) { print(console.log); }, 1)
        
        var timeString = getDateTimeString();
        var fileName = logFolder + "/" + logFileName + ".html";
        var fileName2 = logBackupFolder + "/" + logFileName + "-" + timeString + ".log";
        
        if (!fs.existsSync(logFolder)) {
            // Make log folder
            fs.mkdirSync(logFolder);
        } else if (fs.existsSync(fileName)) {
            if (!fs.existsSync(logBackupFolder)) {
                // Make log backup folder
                fs.mkdirSync(logBackupFolder);
            }
            // Backup previous log
            fs.renameSync(fileName, fileName2);
        }
        fs.writeFileSync(fileName, "<style>@import url('https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@200&display=swap');body{font-size:23px;font-family:'Gemunu Libre',sans-serif;};</style><link rel='icon' href='./favicon.png'><title>LOGS</title><h1 style='font-family: Arial; font-size: 40px'>Start: " + timeString + EOL+`</h1><p style='font-family: Arial; font-size: 20px'>Stats: <a href="./stats">.../stats</a></p><p style='font-family: Arial; font-size: 20px'>Accounts: <a href="./accounts">.../accounts</a></p><p style='font-family: Arial; font-size: 20px'>Settings: <a href="./settings">.../settings</a></p><p style='font-family: Arial; font-size: 20px'>Specific account: <a href="./acc/name">.../acc/(name)</a> (type acc_list in the console to see accounts)</p>`);
        var file = fs.createWriteStream(fileName, { flags: 'a' });
        file.on('open', function () {
            if (writeShutdown) {
                file.close();
                return;
            }
            consoleLog = file;
            flushAsync();
        });
        file.on('error', function (err) {
            writeError = true;
            consoleLog = null;
            writeCon(err.message);
        });
    } catch (err) {
        writeError = true;
        consoleLog = null;
        writeCon(err.message);
    }
}

function shutdown() {
    writeShutdown = true;
    if (writeError) return;
    if (consoleLog != null) {
        consoleLog.end();
        consoleLog.close();
        consoleLog.destroy();
        consoleLog = null;
    }
    writeQueue.push("=== Shutdown " + getDateTimeString() + " ===" + EOL);
    flushSync();
}


var logFolder = "../src/views";
var logBackupFolder = "./logs";
var logFileName = "log";

var consoleLog = null;
var colorRed = "\u001B[31m";
var colorWhite = "\u001B[37m";
var colorBright = "\u001B[1m";


import fs from 'fs';

import util from 'util';
import { EOL } from 'os';


export default { print, write, start, shutdown };

export const setVerbosity = function (level) {
    logVerbosity = level;
};

export const setFileVerbosity = function (level) {
    logFileVerbosity = level;
};

export const getVerbosity = function () {
    return logVerbosity;
};

export const getFileVerbosity = function () {
    return logFileVerbosity;
};