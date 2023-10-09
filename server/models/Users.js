const db = require('../database/connect')

class Users {
    constructor({user_id, name, email, password, access_lvl}) {
        this.user_id = user_id
        this.name = name
        this.email = email
        this.password = password
        this.access_lvl = access_lvl
    } 
    
    
    }

   



module.exports = Users
