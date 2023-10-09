require("dotenv").config()
const fs = require("fs")
const db = require("./connect")


const sql = fs.readFileSync(__dirname+ '/setup.sql').toString()
db.query(sql)
  .then((data) =>{
    db.end();
    console.log("Library DB connected")
  })
  .catch(error => console.log(error))
  