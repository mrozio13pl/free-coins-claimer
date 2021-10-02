
How to start:

1.Click install.bat
2.Click run.bat

How to add your own account:

1.Get your JWT
2.In src/index.js go to the end of section "JWTs", press ENTER and write anything you want (no spaces), for example: main = 'YOUR JWT'
3.In Claimer section paste 
	fetch(`https://api.tricksplit.io/freeCoins?jwt=${main}`)
    .then(res => res.text())
    .then(text => console.log('Main: '+text)); 
4.Safe

How to get your JWT:

1.Open Tricksplit.io
2.Press F12 and go to Console
3.Paste in console API.claimFreeCoins();
4.Go to Network and look for "freeCoins?jwt=..."
5.Right click on it and click "Open in new tab"
6.Copy link and delete "https://api.tricksplit.io/freeCoins?jwt=", done
