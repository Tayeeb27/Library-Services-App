const { Router } = require('express')
const userRouter = require('../controller/users')
const uRouter = Router();

uRouter.get("/", userRouter.index)

uRouter.get("/:user_id", userRouter.showId)
uRouter.post("/", userRouter.createUser)
uRouter.patch("/:user_id", userRouter.updateUser)
uRouter.delete("/:user_id", userRouter.destroy)



module.exports = uRouter