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

}

module.exports = Orders