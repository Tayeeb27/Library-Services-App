const { Router } = require('express')
const bookRouter = require('../controller/books')
const bRouter = Router();


bRouter.get("/", bookRouter.index)
bRouter.get("/title/:title", bookRouter.bookName)
bRouter.get("/category/:category", bookRouter.bookCategory)




module.exports = bRouter;
