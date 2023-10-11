const Books = require('../models/Books')

const index = async (req, res) => {
    try {
        const books = await Books.getAll()
        res.status(200).json(books)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const bookName = async (req, res) => {
    try {
        const name = req.params.title.toLowerCase();
        const book = await Books.getOneByBookName(name);
        res.status(200).json(book)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Books.getOneByID(id);
        res.status(200).json(book)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}


const bookCategory = async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const bookCategory = await Books.getBookByCategory(category);
        res.status(200).json(bookCategory)

    } catch (err) {
        res.status(404).json({error: err.message})
    }
        
}
const createBook = async (req, res) => {
    try {
        const book = await Books.createBook(req.body);
        res.status(200).json(book)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

const updateBook = async (req, res) => {
    try {
        const id = req.params.id;        
        const book = await Books.updateBook(id, req.body);
        res.status(200).json(book)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id; 
        const book = await Books.deleteBook(id);
        res.status(200).json(book)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}





module.exports = { index, bookName, show, bookCategory, createBook, updateBook, deleteBook }