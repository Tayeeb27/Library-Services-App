const db = require('../database/connect')

class Books {
    constructor({book_id, title, author, description, category, rating, release_year, image_url}) {
        this.book_id = book_id
        this.title = title
        this.author = author
        this.description = description
        this.category = category
        this.rating = rating
        this.release_year = release_year
        this.image_url = image_url
    }

    static async getAll () {
        const response = await db.query("SELECT * FROM books;")
        if (response.rows.length === 0) {
            throw new Error("No Books available")
        }
        return response.rows.map(bk => new Books(bk))
    }

    static async getOneByBookName(title) {
        const response = await db.query("SELECT * FROM books WHERE LOWER(title) = $1;", [title])
        if (response.rows.length != 1) {
            throw new Error("unable to find that book")
        }
        return new Books(response.rows[0])
    }
    static async getOneByID(id) {
        const response = await db.query("SELECT * FROM books WHERE book_id = $1;", [id])
        if (response.rows.length != 1) {
            throw new Error("unable to find that book")
        }
        return new Books(response.rows[0])
    }

    static async getBookByCategory(category) {
        const response = await db.query("SELECT * FROM books WHERE LOWER(category) = $1;", [category]);
        if (response.rows.length === 0) {
            throw new Error("No Books available")
        }
        return response.rows.map(bc => new Books(bc))
    }
     
    //create
//update 
//delete
}

module.exports = Books