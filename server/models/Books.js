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
    static async createBook(data){
        const {title, author, description, category, rating, release_year, image_url} = data;
        const response = await db.query('INSERT INTO books (title, author, description, category, rating, release_year, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [title, author, description, category, rating, release_year, image_url])
        return new Books(response.rows[0])
    }

    //update
    static async updateBook(id, data){
        const {description, category, rating, image_url}= data;
        const response = await db.query('UPDATE books SET  description = $1, category = $2, rating = $3, image_url = $4 WHERE book_id = $5 RETURNING *;', [description, category, rating, image_url, id])
        return new Books(response.rows[0])
    }
    //delete
    static async deleteBook(id){
        const response = await db.query('DELETE FROM books WHERE book_id = $1 RETURNING *;', [id]);
        if (response.rows.length === 0) {
            throw new Error("Unable to delete book.");
        }
        return new Books(response.rows[0])
    }
}

module.exports = Books