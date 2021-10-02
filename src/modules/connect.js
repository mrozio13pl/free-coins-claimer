export default all;
import got from 'got';
import fs from 'fs';

function all() {
  this.accounts = {};
}
all.accounts = {
    check: function(){
            fs.readFile('./accounts/accounts.json', (err, data) => {
              if (err) throw err;
            Object.values(JSON.parse(data).accountList).forEach(i => {
              (async () => {
                try {
                  const connect = await got('https://api.tricksplit.io/freeCoins?jwt='+i.jwt);  
                  fs.writeFileSync('./views/log.html', fs.readFileSync("./views/log.html")+i.name+': '+connect.body);
                  if(JSON.parse(fs.readFileSync("./settings/settings.json")).bonusLogs==1){
                    console.log(i.name+': '+connect.body)
                  }else{
                    if(connect.body==="Succesfully claimed 20 coins!"){
                      console.log(i.name+': \x1b[32mClaimed 20 coins!\x1b[0m')
                    }
                  }
                  //console.log('test, see? c:')
                } catch (error) {console.log(i.name+': \x1b[31mNo internet connection!\x1b[0m');}
          })();
        })
    })
    }
}

