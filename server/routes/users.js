const { Router } = require('express')
const userRouter = require('../controller/users')
const uRouter = Router();

uRouter.get("/", userRouter.index)

uRouter.get("/:id", userRouter.showId)
uRouter.post("/", userRouter.createUser)
uRouter.patch("/:id", userRouter.updateUser)
uRouter.delete("/:id", userRouter.destroy)
uRouter.post("/register", userRouter.register)
uRouter.post("/login", userRouter.login)



module.exports = uRouter