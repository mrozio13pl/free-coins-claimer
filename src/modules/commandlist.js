import logStart from '../index.js'
import clear from 'console-clear'
import accounts from './connect.js'
import fs from 'fs'
import readline from 'readline'
import got from 'got'
import express from "express";
const app = express();

function Commands() {
    this.list = {};
}
export default Commands;
process.setMaxListeners(10000);
// Commands
Commands.list = {
    help_jwt: function () {
        var l = console.log
        l('')
        l('\x1b[32mHow to get your JWT:\x1b[0m')
        l('')
        l('1.Open Tricksplit.io');
        l('2.Press F12 and go to Console')
        l('3.Paste in console API.claimFreeCoins();')
        l('4.Go to Network and look for "freeCoins?jwt=..."')
        l('5.Right click on it and click "Open in new tab"')
        l('6.Copy the link, done')
        l('')
    },
    help: function () {
        var l = console.log
        l('')
        l('\x1b[32mCommands:\x1b[0m')
        l('')
        l('help_jwt || How to get your JWT?')
        l('acc_add || Adds account to the list')
        l('acc_list || Account list')
        l('acc_delete || Deletes account from the list')
        l('checkall || Checks all accounts manually')
        l('check || Checks specific account')
        l("config_cooldown || Account's check cooldown")
        l('config_port || App port')
        l('config_bonuslogs || Logs all checks')
        l('config_settings || Shows you all current settings')
        l('clear || Clears the console')
        l('stop / exit || Close app')
        l('test || Test command c:')
        l('')
        l(`Listening on localhost:${JSON.parse(fs.readFileSync("./settings/settings.json")).hostPort}`)
        l('')
    },
    clear: function (){
        clear();
        logStart('FREE COINS CLAIMER V2');
        fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+' --- Console was cleared ---');
    },
    checkall: function (){
        let unix_timestamp = Date.now() / 1000;
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log(`\u001B[33mTIME - ${formattedTime} \x1b[37m(\x1b[4mMANUAL CHECK\x1b[0m)`);
        fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+' --- Manually check ---');
        accounts.accounts.check();
    },
    check: function (){
        var rl = readline.createInterface({
            input: process.stdin,
        });
        rl.question('', (answer) => {
            if(answer=='-'){console.log('\x1b[32mCancelled\x1b[0m');return}
            fs.readFile('./accounts/accounts.json', 'utf8', function (err, data) {
                if (err) throw err;
                var name = answer.replace(/\s/g, '_')
                var filtr = Object.values(JSON.parse(data).accountList).filter(account => account.name === name)
                if(filtr.length < 1){console.log('Could find account: \x1b[31m'+name+'\x1b[0m');return}

                let unix_timestamp = Date.now() / 1000;
                var date = new Date(unix_timestamp * 1000);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                let port = JSON.parse(fs.readFileSync("./settings/settings.json")).hostPort;
                (async () => {
                    try {
                        const acc = await got(`http://localhost:${port}/acc/${name}`);
                        try {
                            const getJWT = await got(encodeURI('https://api.tricksplit.io/freeCoins?jwt='+JSON.parse(acc.body).jwt));
                            if(getJWT.body=='Succesfully claimed 20 coins!'){console.log(`\u001B[33m[${formattedTime}]\u001B[0m ${name}: \x1b[32m${getJWT.body}\x1b[0m`)}else if(getJWT.body=='Invalid JWT'){console.log(`\u001B[33m[${formattedTime}]\u001B[0m ${name}: \x1b[31m${getJWT.body}\x1b[0m`)}else{console.log(`\u001B[33m[${formattedTime}]\u001B[0m ${name}: ${getJWT.body}\x1b[0m`)}
                        } catch (error) {
                            console.log(error);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })();
            });
        })
        fs.readFile('./accounts/accounts.json', 'utf8', function (err, data){
            if (err) throw err;
            console.log('\x1b[32m--- Accounts ---\x1b[0m');
            Object.values(JSON.parse(data).accountList).forEach(i => { 
                    console.log(i.name);
          });
          console.log('\x1b[32m----------------\x1b[0m');
          console.log('Type - to cancel')
          console.log('Account Name: ')
        })
        console.log('Account name:')
    },
    //Test command
    test: function (){
        console.log('Hello world!');
    },
    config_cooldown: function (){
        var rl = readline.createInterface({
            input: process.stdin,
        });
        console.log(`Current value: ${JSON.parse(fs.readFileSync("./settings/settings.json")).Cooldown/1000} seconds`);
        console.log('Type - to cancel')
        setTimeout(function(){
            rl.question('Account check cooldown (in seconds):', (answer) => {
                if(answer=='-'){console.log('\x1b[32mCancelled\x1b[0m');return}
                else if (typeof answer ===! 'number' && answer ===! '-') {
                    console.log('\x1b[31mGiven value is not a valid number!\x1b[0m'); return;
                  }
                let port = JSON.parse(fs.readFileSync("./settings/settings.json")).hostPort;
                let bonus = JSON.parse(fs.readFileSync("./settings/settings.json")).bonusLogs;
                console.log(`Cooldown: \x1b[33m${answer}\x1b[0m seconds`);
                const setts = {
                    Cooldown: answer*1e3,
                    hostPort: port,
                    bonusLogs: bonus
                }
                const settsJSON = JSON.stringify(setts, null, 2);
                fs.writeFileSync('./settings/settings.json', settsJSON);
                fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+` --- Cooldown was changed to ${answer} seconds ---`);
                console.log('To apply changes restart your app.')
                ;})
        console.log('Account check cooldown (in seconds):')}, 100)
    },
    config_port: function (){
        var rl = readline.createInterface({
            input: process.stdin,
        });
        console.log(`Current value: ${JSON.parse(fs.readFileSync("./settings/settings.json")).hostPort}`);
        console.log('Type - to cancel')
        setTimeout(function(){
            rl.question('Port (1 - 65535):', (answer) => {
                if(answer=='-'){console.log('\x1b[32mCancelled\x1b[0m');return}
                else if(65535 < answer){console.log('\x1b[31mNumber is too big! Choose number beetwen 1 to 65535!\x1b[0m');return}
                else if(1 > answer){console.log('\x1b[31mNumber is too small! Choose number beetwen 1 to 65535!\x1b[0m');return}
                else if (typeof answer ===! 'number' && answer ===! '-') {
                    console.log('\x1b[31mGiven value is not a valid number!\x1b[0m'); return;
                  }
                let cooldown = JSON.parse(fs.readFileSync("./settings/settings.json")).Cooldown;
                let bonus = JSON.parse(fs.readFileSync("./settings/settings.json")).bonusLogs;
                console.log(`Port: \x1b[33m${answer}\x1b[0m`);
                const setts = {
                    Cooldown: cooldown,
                    hostPort: answer,
                    bonusLogs: bonus
                }
                const settsJSON = JSON.stringify(setts, null, 2);
                fs.writeFileSync('./settings/settings.json', settsJSON);
                fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+` --- Port was changed to ${answer} ---`);
                console.log('To apply changes restart your app.')
                ;})
        console.log('Port (1 - 65535):')}, 100)
    },
    config_bonuslogs: function (){
        var rl = readline.createInterface({
            input: process.stdin,
        });
        if(JSON.parse(fs.readFileSync("./settings/settings.json")).bonusLogs===1){console.log(`Bonus logs: \x1b[32mOn\x1b[0m`);}else{{console.log(`Bonus logs: \x1b[31mOff\x1b[0m`);}}
        console.log('Type - to cancel')
        setTimeout(function(){
            rl.question('', (answer) => {
                if(answer=='-'){console.log('\x1b[32mCancelled\x1b[0m');return}
                let cooldown = JSON.parse(fs.readFileSync("./settings/settings.json")).Cooldown;
                let port = JSON.parse(fs.readFileSync("./settings/settings.json")).hostPort;
                if(answer.toUpperCase()=='ON'){
                console.log(`Bonus logs: \x1b[32mOn\x1b[0m`);
                const setts = {
                    Cooldown: cooldown,
                    hostPort: port,
                    bonusLogs: 1
                }
                const settsJSON = JSON.stringify(setts, null, 2);
                fs.writeFileSync('./settings/settings.json', settsJSON);
                fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+` --- Bonus logs were turned ${answer.toLocaleLowerCase} ---`);
                }else if(answer.toUpperCase()=='OFF'){
                    console.log(`Bonus logs: \x1b[31mOff\x1b[0m`);
                    const setts = {
                        Cooldown: cooldown,
                        hostPort: port,
                        bonusLogs: 0
                    }
                    const settsJSON = JSON.stringify(setts, null, 2);
                    fs.writeFileSync('./settings/settings.json', settsJSON);
                    fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+` --- Bonus logs were turned ${answer.toLocaleLowerCase} ---`);
                    }else{console.log('\x1b[31mType "on" or "off"!\x1b[0m');}
                    
                ;})
        console.log('Toggle On/Off:')}, 100)
    },
    config_settings: function(){
        console.log(' ');
        console.log("config_cooldown || Account's check cooldown")
        console.log('config_port || App port')
        console.log('config_bonuslogs || Logs all checks')
        console.log(' ')
        console.log(`Cooldown: \x1b[33m${JSON.parse(fs.readFileSync("./settings/settings.json")).Cooldown/1000}\x1b[0m seconds`);
        console.log(`PORT: \x1b[33m${JSON.parse(fs.readFileSync("./settings/settings.json")).hostPort}\x1b[0m`);
        console.log(' ')
        if(JSON.parse(fs.readFileSync("./settings/settings.json")).bonusLogs===1){console.log(`Bonus logs: \x1b[32mOn\x1b[0m`);}else{{console.log(`Bonus logs: \x1b[31mOff\x1b[0m`);}}
    },
    acc_add: function (){
        var rl = readline.createInterface({
            input: process.stdin,
        });
        setTimeout(function(){
            rl.question('', (jwtlink) => {
                var jwt = jwtlink.replace('https://api.tricksplit.io/freeCoins?jwt=','')
                if(jwt=='-'){console.log('\x1b[32mCancelled\x1b[0m');return};
                (async () => {
                    try {
                        const getJWT = await got(encodeURI('https://api.tricksplit.io/freeCoins?jwt='+jwt));
                        if(getJWT.body==='Invalid JWT'){console.log('Status: \x1b[31m'+getJWT.body+'\x1b[0m');console.log('\x1b[31mThe JWT is not valid!\x1b[0m');}else{
                            console.log('Status: \x1b[32m'+getJWT.body+'\x1b[0m');setTimeout(function(){console.log(`Name (any spaces will be replaced with "_"):`);}, 800)
                rl.question('', (name) => {
                            fs.readFile('./accounts/accounts.json', (err, data) => {
                            if (err) throw err;
                            let list = JSON.parse(data).accountList;
                            var val = name.replace(/\s/g, '_')
                            var accList = {
                                accountList: []
                            }
                            accList.accountList.push(...list, {name: val, jwt: jwt})
                            var json = JSON.stringify(accList, null, 2);
                            fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+` --- Added account: ${name} ---`);
                        fs.writeFile('./accounts/accounts.json', json, 'utf8', (error) => {
                            if (error) {
                              console.log(error);
                            } else {
                                console.log(`Succesfully added account: \x1b[35m\x1b[1m${val}\x1b[0m`);
                                fs.readFile('./accounts/accounts.json', (err, data) => {
                                    Object.values(JSON.parse(data).accountList).forEach(i => {
                                      app.get(`/acc/${i.name}`, function (req, res) {
                                          res.json(i)
                                        })
                                    })
                                    })
                            }
                        })
                    });
                  })};
                    } catch (error) {
                        console.log(error.getJWT.body);
                    }
                })();
          });
          console.log('Type - to cancel')
          console.log('Account JWT (right click to paste):')}, 100)
    },
    acc_list: function (){
        fs.readFile('./accounts/accounts.json', 'utf8', function (err, data){
            if (err) throw err;
            console.log('\x1b[32m--- Accounts ---\x1b[0m');
            Object.values(JSON.parse(data).accountList).forEach(i => { 
                    console.log(i.name);
          });
          console.log('\x1b[32m----------------\x1b[0m');})
    },
    acc_delete: function (){
        var rl = readline.createInterface({
            input: process.stdin,
        });
        fs.readFile('./accounts/accounts.json', 'utf8', function (err, data){
            if (err) throw err;
            console.log('\x1b[32m--- Accounts ---\x1b[0m');
            Object.values(JSON.parse(data).accountList).forEach(i => { 
                    console.log(i.name);
          });
          console.log('\x1b[32m----------------\x1b[0m');
          console.log('Type - to cancel')
          console.log('Account Name: ')
        })
            rl.question('', (name) => {
                if(name=='-'){console.log('\x1b[32mCancelled\x1b[0m');return};
                fs.readFile('./accounts/accounts.json', 'utf8', function (err, data) {
                    if (err) throw err;
                    var filtr = Object.values(JSON.parse(data).accountList).filter(account => account.name === name)
                    var index = JSON.parse(data).accountList.findIndex(account=> account.name === name);
                    console.log(index)
                    if(filtr.length < 1){console.log('Could find account: \x1b[31m'+name+'\x1b[0m');return}

                    let list = JSON.parse(data).accountList;
                    var accList = {
                        accountList: [...list]
                    }
                    accList.accountList.splice(index, 1);
                    var json = JSON.stringify(accList, null, 2);
                    fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+` --- Removed account: ${name} ---`);
                    fs.writeFile('./accounts/accounts.json', json, 'utf8', (error) => {
                        if (error) {
                          console.log(error);
                        } else {
                            console.log(`Succesfully removed account: \x1b[35m\x1b[1m${name}\x1b[0m`)
                        }
                    })
                });
          });
    },
    stop: function(){
        process.stdout.write('\x1b[31m')
        process.exit();
    },
    exit: function(){
        process.stdout.write('\x1b[31m')
        process.exit();
    }
};





