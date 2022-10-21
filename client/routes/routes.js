const apiRouter = require("express").Router();

const getCommentRouter = require("./routing");
apiRouter.use("/getComment", getCommentRouter);

const getAllCommentsRouter = require("./routing");
apiRouter.use("/getComments", getAllCommentsRouter);

const createCommentRouter = require("./routing");
apiRouter.use("/createComment", createCommentRouter);

const deleteCommentRouter = require("./routing");
apiRouter.use("/deleteComments", deleteCommentRouter);

const getAllUserRouter = require("./routing");
apiRouter.use("/users", getAllUserRouter);

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    message: "API is healthy!",
  });
});

module.exports = apiRouter;
