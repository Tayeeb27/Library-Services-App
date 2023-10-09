const express = require("express")
const cors = require("cors")
const logger = require('./middleware/logger')
const bookRouter = require("./routes/books")
const orderRouter = require("./routes/orders")
const app = express()


app.use(express.json())
app.use(cors())
app.use(logger)

app.use("/books", bookRouter)
app.use("/orders", orderRouter)



module.exports = app;