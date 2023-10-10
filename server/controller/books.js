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


const bookCategory = async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const bookCategory = await Books.getBookByCategory(category);
        res.status(200).json(bookCategory)

    } catch (err) {
        res.status(404).json({error: err.message})
    }
        
}





module.exports = { index, bookName, bookCategory }