import fs from 'fs';
import express from "express";

const app = express();

export default function accountsJSON(){
fs.readFile('./accounts/accounts.json', (err, data) => {
    if (err) throw err;
  Object.values(JSON.parse(data).accountList).forEach(i => {
    app.get('/account/'+i.name, function (req, res) {
        res.json(JSON.parse(i))
      })
})
})
}