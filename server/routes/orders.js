const { Router } = require('express')
const orderRouter = require('../controller/orders')
const oRouter = Router();


oRouter.get("/", orderRouter.index)
oRouter.get("/:id", orderRouter.show)
oRouter.post("/", orderRouter.createOrder)
oRouter.patch("/:id", orderRouter.updateOrder)




module.exports = oRouter;