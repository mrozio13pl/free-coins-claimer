# Free Coins Claimer for Tricksplit.io PATCHED [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
#### FCC claims you 20 coins on your cellz account every 2 hours if you have it activated on your computer or host. You need to get your account's JWT 

## REQUIREMENTS

[![NodeJS](https://i.imgur.com/eXGeNgq.png)](https://nodejs.org)

## INSTALL AND RUN 
Remember to install [NodeJS](https://nodejs.org)!

##### 1.Install dependencies:`install.bat`
##### 2.Run FCC: `run.bat`

## COMMANDS

#### Type `help` in the console to get all commands!

##### `help_jwt`  How to get your JWT?
##### `acc_add`  Adds account to the list
##### `acc_list`  Account list
##### `acc_delete`  Deletes account from the list
##### `checkall`  Checks all accounts manually
##### `check`  Checks specific account
##### `config_cooldown`  Account's check cooldown
##### `config_port`  App port
##### `config_bonuslogs`  Logs all checks
##### `config_settings`  Shows you all current settings
##### `clear`  Clears the console
##### `stop` / `exit`  Close app
##### `test`  Test command
## ADD YOUR ACCOUNT
##### 1.Open console
##### 2.Type `acc_add`
##### 3.Paste your **JWT**
##### 4.Call your account however you want
## HOW TO GET YOUR JWT
##### 1.Open [Tricksplit.io](http://tricksplit.io)
##### 2.Press **F12** and go to **Console**
##### 3.Paste in console `API.claimFreeCoins();`
##### 4.Go to **Network** and look for **freeCoins?jwt=...**
##### 5.Right click on it and click **Open in new tab**
##### 6.Copy link, done!
#### 
##### It should look like __[this](https://api.tricksplit.io/freeCoins/?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJpZnlOYW1lIjpudWxsLCJpc1ZlcmlmaWVkIjowLCJpc0FkbWluIjowLCJpc01vZCI6MCwiY2hhbmdlZE5hbWUiOjAsImlkIjoiMTAyMjA1MzgwNjA4MjE5MjM1NTA2IiwiZGlzY29yZElEIjpudWxsLCJuYW1lIjoiYWJjIEVmZyIsIm9sZE5hbWUiOm51bGwsImNvaW5zIjowLCJ4cCI6MCwic2Vhc29uWFAiOjAsInN1YiI6MTY4ODcyODEsInBsYXRmb3JtIjoiZ29vZ2xlIiwicmVmZmVyZXIiOiJ1bmRlZmluZWQiLCJsYXN0Q29pbkNsYWltIjowLCJsYXN0Tml0cm9DbGFpbSI6MCwiY2xhaW1lZDIwIjowLCJjbGFpbWVkNTAiOjAsImRldGFpbHMiOnsiaWQiOiIxMDIyMDUzODA2MDgyMTkyMzU1MDYiLCJsYXN0SXAiOiIxODguMTQ3LjM2LjE0MSIsImxhc3RMb2dpbiI6MTYyNjU0NDMwOTc1NCwiZW1haWwiOiJhYmNmZWdnZ0BnbWFpbC5jb20iLCJvcmlnaW4iOiJodHRwczovL3RyaWNrc3BsaXQuaW8ifSwiaXRlbXMiOltdLCJpYXQiOjE2MjY1NDQzMDl9.tYWWt7HykQTaW7x2a4xuP3ySkul2gldfLxHcSptiYa0)__
##### _[Click here](https://i.imgur.com/XdBqJRg.gif)_ to see a gif
## SETTINGS
####
##### Default Port: **[5100](http://localhost:5100)**
##### Default Check Cooldown: *`30 seconds (30000)`*
##### More logging: *`TRUE`*
####
##### To edit settings type `config_settings` for more info
## SMALL FAQ
#### Is it safe?
##### Yes, it is literally open source.
#### Can my account be hacked with JWT?
##### I don't think so, if there is I haven't found it yet and I won't.
#### Can I be banned for using it?
##### Maybe, but I used it for a long time and I didn't get banned or anything like that. Admins don't really care about this game anymore.
#### What are these JSON files?
##### They store data (settings, jwts).
#### Can I edit them?
##### There is no point. If you know how to do it you can, else just use console commands.
###
[![Github][1.1]][1]
[![Youtube][1.2]][2]
[![Discord][1.3]][3]

[1.1]: https://i.imgur.com/YbZJvEw.png
[1.2]: https://i.imgur.com/SKWM9JD.png
[1.3]: https://i.imgur.com/eZzLrxC.png
[1]: https://github.com/mrozio13pl
[2]: https://youtube.com/Mrozio
[3]: https://discord.gg/Ndf6uukEbC
