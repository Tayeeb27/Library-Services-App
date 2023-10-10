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
        const {name, email, password} = data;
        const response = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;', [name, email, password])
        return new Users(response.rows[0])
    }

    static async updateUser(id, data) {
        const { name, email, password } = data;
        const response = await db.query(
          "UPDATE users SET name = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *;",
          [name, email, password, id]
        );
        if (response.rows.length !== 1) {
          throw new Error('No user found with that id');
        }
        return new Users(response.rows[0]);
      }
      

      static async destroy(userId) {
        const response = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *;", [userId]);
      
        if (response.rows.length === 0) {
          throw new Error("Unable to delete user.");
        }
      
        // Return the deleted user
        return new Users(response.rows[0]);
      }
    }

   



module.exports = Users
