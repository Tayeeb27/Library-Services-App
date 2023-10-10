const { Router } = require('express')
const bookRouter = require('../controller/books')
const bRouter = Router();


bRouter.get("/", bookRouter.index)
bRouter.get("/:id", bookRouter.show)
bRouter.get("/title/:title", bookRouter.bookName)
bRouter.get("/category/:category", bookRouter.bookCategory)




module.exports = bRouter;
