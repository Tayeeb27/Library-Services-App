const { Router } = require('express')
const orderRouter = require('../controller/orders')
const oRouter = Router();


oRouter.get("/", orderRouter.index)
oRouter.get("/id/:id", orderRouter.show)
oRouter.post("/orders", orderRouter.createOrder)
oRouter.patch("/orders", orderRouter.updateOrder)




module.exports = oRouter;