const db = require('../database/connect')

class Users {
    constructor({user_id, name, email, password, access_lvl}) {
        this.user_id = user_id
        this.name = name
        this.email = email
        this.password = password
        this.access_lvl = access_lvl
    } 


    static async getAll () {
        const response = await db.query("SELECT * FROM users;")
        if (response.rows.length === 0) {
            throw new Error("No Users available")
        }
        return response.rows.map(user => new Users(user))
    }
    
    static async getById (id) {
        const response = await db.query("SELECT * FROM users WHERE user_id = $1;", [id])
        if (response.rows.length === 0) {
            throw new Error("No User Found")
        }
        return new Users(response.rows[0])
    }
    static async createUser(data){
        const {user_id, name, email, password, access_lvl} = data;
        const response = await db.query('INSERT INTO users (user_id, name, email, password, access_lvl) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [user_id, name, email, password, access_lvl])
        return new Users(response.rows[0])
    }

    static async updateUser(data) {
        const {name, email, password, access_lvl} = data
        const response = await db.query("UPDATE users SET name = $1, email = $2, password = $3, access_lvl = $4 WHERE user_id = $5 RETURNING *;", [name, email, password, access_lvl, this.user_id])
        if(response.rows.length !=1){
            throw new Error('No users found with that id')
        }
        return new Users(response.rows[0])
    }

    async destroy () {
        const response = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *;", [this.user_id])
        if (response.rows.length !== 1) {
            throw new Error ("Unable to delete user.")
        }
        return new Users(response.rows[0])
    }
    
    }

   



module.exports = Users
