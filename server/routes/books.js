const { Router } = require('express')
const bookRouter = ("../controllers/book")
const bRouter = Router();


bRouter.get("/", bookRouter.index)




module.exports = bRouter;
