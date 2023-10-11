const db = require('../database/connect');

class Book_Posts {
    constructor({book_post_id, title, content, date, time}) {
        this.book_post_id = book_post_id
        this.title = title
        this.content = content
        this.date = date
        this.time = time
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM book_posts ORDER BY date, time DESC;");
        if (response.rows.length === 0) {
            throw new Error("No book_posts entries available.")
        }
        return response.rows.map(d => new Book_Posts(d));
    }

    static async getOneByID(id) {
        const response = await db.query("SELECT * FROM book_posts WHERE book_posts_id = $1;", [id]);
        if(response.rows.length != 1) {
            throw new Error("Unable to locate book_posts.")
        }

        return new Book_Posts(response.rows[0]);
    }

    static async getAllByDate(date) {
        const response = await db.query("SELECT * FROM book_posts WHERE TO_CHAR(Date, 'YYYY-MM-DD') = $1;", [date]);
        if(response.rows.length === 0) {
            throw new Error("Unable to locate book_posts.")
        }

        return response.rows.map(d => new Book_Posts(d));
    }


    static async create(data) {
        try{
        const { title, content } = data;
        const response = await db.query("INSERT INTO book_posts (title, content) VALUES ($1, $2) RETURNING *;", [title, content]);
        return new Book_Posts(response.rows);
        }catch (err) {
            throw new Error(err.message)
        }
    }

    // async update(data) {
    //     const { words } = data
    //     const response = await db.query("UPDATE book_posts SET words = $1, date = CURRENT_DATE, time = CURRENT_TIME WHERE Book_PostsID = $2 RETURNING *;",
    //         [ words, this.book_post_id ]);
    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to update Book_Posts.")
    //     }
    //     return new Book_Posts(response.rows[0]);
    // }

    async destroy() {
        const response = await db.query("DELETE FROM book_posts WHERE book_posts_id = $1 RETURNING *;", [this.book_post_id]);
        return new Book_Posts(response.rows[0]);
    }
}

module.exports = Book_Posts;
