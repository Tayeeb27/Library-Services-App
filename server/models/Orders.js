const db = require('../database/connect')

class Orders {
    constructor ({order_id, user_id, book_id, collection_date, order_reference}) {
        this.order_id = order_id
        this.user_id = user_id
        this.book_id = book_id
        this.collection_date = collection_date
        this.order_reference = order_reference
    }

    static async getAll () {
        const response = await db.query("SELECT * FROM orders;")
        if (response.rows.length === 0) {
            throw new Error("No Orders Found")
        }
        return response.rows.map(order => new Orders(order))
    }

    static async getById (id) {
        const response = await db.query("SELECT * FROM orders WHERE order_id = $1;", [id])
        if (response.rows.length === 0) {
            throw new Error("No Orders Found")
        }
        return new Orders(response.rows[0])
    }

    static async createOrder(order_id, user_id, book_id, collection_date, order_reference){
        const response = await db.query("INSERT INTO orders (order_id, user_id, book_id, collection_date, order_reference) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [order_id, user_id, book_id, collection_date, order_reference])
        return new Orders(response.rows[0])
    }

    static async updateOrder(order_id, user_id, book_id, collection_date, order_reference){
        const response = await db.query("UPDATE orders SET user_id = $1, book_id = $2, collection_date = $3, order_reference = $4 WHERE order_id = $5 RETURNING *;", [user_id, book_id, collection_date, order_reference, order_id])
        return new Orders(response.rows[0])
    }

    }


module.exports = Orders