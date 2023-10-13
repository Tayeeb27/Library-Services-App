const Book_Posts = require('../models/Book_Posts');

async function index(req, res) {
    try {
        const book_posts = await Book_Posts.getAll();
        res.status(200).json(book_posts);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

async function showID (req, res) {
    try {
        let id = parseInt(req.params.id);
        const book_posts = await Book_Posts.getOneByID(id);
        res.status(200).json(book_posts)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}


async function showDate (req, res) {
    try {
        let date = req.params.date;
        const book_posts = await Book_Posts.getAllByDate(date);
        res.status(200).json(book_posts)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        const newBook_Posts = await Book_Posts.create(data);
        res.status(201).json(newBook_Posts);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const book_posts = await Book_Posts.getOneByID(id);
        const result = await book_posts.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

async function destroy (req, res) {
    try {
        let id = parseInt(req.params.id);
        const book_posts = await Book_Posts.getOneByID(id);
        const result = await book_posts.destroy();
        res.status(204).json(result);
    } catch (err) {
        res.status(404).json({error: err.message})
    }
};

module.exports = { index, showID, showDate, create, update, destroy }
