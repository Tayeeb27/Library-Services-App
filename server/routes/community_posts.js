const { Router } = require('express');
const cpController = require('../controller/community_posts')

const cpRouter = Router();

cpRouter.get("/", cpController.index);
cpRouter.get("/:id", cpController.showID);
cpRouter.get("/date/:date", cpController.showDate);
cpRouter.post("/", cpController.create);
//cpRouter.patch("/:id", cpController.update);
cpRouter.delete("/:id", cpController.destroy);

module.exports = cpRouter;