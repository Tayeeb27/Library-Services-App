const { Router } = require('express');
const bpController = require('../controller/book_posts')

const bpRouter = Router();

bpRouter.get("/", bpController.index);
bpRouter.get("/:id", bpController.showID);
bpRouter.get("/date/:date", bpController.showDate);
bpRouter.post("/", bpController.create);
//bpRouter.patch("/:id", bpController.update);
bpRouter.delete("/:id", bpController.destroy);

module.exports = bpRouter;